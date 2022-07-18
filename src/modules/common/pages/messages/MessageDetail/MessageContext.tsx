import { notification } from "antd";
import { getUserData } from "common/utils/userData";
import {
  ChatChannels,
  RtcTokenResponse,
  useCreateChatChannelMutation,
  useCreateChatMessageMutation,
  useGenerateRtcTokenMutation,
  useGetAllChatChannelsQuery,
  useGetChannelMessagesQuery,
} from "generated/graphql";

import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Client from "./client";

type state = {
  messageInfo: MessageInfo;
  onLoginJoinChannel?: ({
    channelName,
  }: {
    channelName: string;
  }) => Promise<void>;
  onJoinChannel?: (channelName: string) => Promise<void>;
  loginToRtm?: () => Promise<void>;
  onMessage: (text: string, messageType?: string) => void;
  setCurrentChannel: (channel: ChatChannels) => void;
  createChatFetching?: boolean | undefined | null;
};

type MessageInfo = {
  allChannels: ChatChannels[] | undefined;
  messagesWithChannel: any;
  currentChannel: ChatChannels | undefined;
};

const initialState: state = {
  onMessage: () => null,
  setCurrentChannel: () => null,
  messageInfo: {
    allChannels: [],
    messagesWithChannel: {},
    currentChannel: undefined,
  },
  createChatFetching: null,
};

const MessageContext = createContext(initialState);

export function useMessageContext() {
  return useContext(MessageContext);
}

export const MessageConsumer = MessageContext.Consumer;

export function MessageContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [messageInfo, setMessageInfo] = useState<MessageInfo>({
    allChannels: [],
    messagesWithChannel: {},
    currentChannel: undefined,
  });
  const [createChatFetching, setCreateChatFetching] = useState(false);
  const { query } = useRouter();
  const messageInfoRef = useRef<MessageInfo>(messageInfo);
  messageInfoRef.current = messageInfo;
  const rtmRef = useRef<Client>();
  const [searchString, setSearchString] = React.useState<string>("");
  const [, executeCreateChatChannelMutation] = useCreateChatChannelMutation();
  const [{ data }, executeGetAllChatChannelsMutation] =
    useGetAllChatChannelsQuery({ variables: { filter: { searchString } } });
  const { getAllChatChannels } = data || {};

  const [{ data: channelMessageData }, executeGetChannelMessagesQuery] =
    useGetChannelMessagesQuery({
      variables: {
        channelId: messageInfo.currentChannel?.id as number,
      },
      pause: !messageInfo.currentChannel,
    });
  const { getChannelMessages } = channelMessageData || {};

  useEffect(() => {
    if (getChannelMessages) {
      const info = { ...messageInfoRef.current };
      const messages = { ...info.messagesWithChannel };
      messages[messageInfo.currentChannel?.channelName || ""] = [
        ...getChannelMessages,
        ...(messages[messageInfo.currentChannel?.channelName || ""]
          ? messages[messageInfo.currentChannel?.channelName || ""]
          : []),
      ];

      info.messagesWithChannel = messages;
      setMessageInfo(info);
    }
  }, [getChannelMessages?.[0]?.channelId]);

  async function createOrJoinChannel() {
    if (query?.chat && query.doctorId && query.patientId) {
      await executeCreateChatChannelMutation({
        createChatChannelInput: {
          doctorId: Number(query.doctorId),
          patientId: Number(query.patientId),
          isAdminChat: query.chat === "admin",
        },
      });
      executeGetAllChatChannelsMutation({
        requestPolicy: "network-only",
      });
      console.log(query?.chat);
    } else if (query?.chat && query.doctorId) {
      // for admin to doctor
      await executeCreateChatChannelMutation({
        createChatChannelInput: {
          doctorId: Number(query.doctorId),
          isAdminChat: query.chat === "admin",
        },
      });
      executeGetAllChatChannelsMutation({
        requestPolicy: "network-only",
      });
    } else if (query?.chat && query.patientId) {
      // for admin to patient
      await executeCreateChatChannelMutation({
        createChatChannelInput: {
          patientId: Number(query.patientId),
          isAdminChat: query.chat === "admin",
        },
      });
      executeGetAllChatChannelsMutation({
        requestPolicy: "network-only",
      });
    }
  }

  useEffect(() => {
    createOrJoinChannel();
  }, [query?.chat]);

  const [, executeGenerateRtcTokenMutation] = useGenerateRtcTokenMutation();
  const [{ fetching }, executeCreateChatMessageMutation] =
    useCreateChatMessageMutation();

  useEffect(() => {
    setCreateChatFetching(fetching);
  }, [fetching]);

  const { user } = getUserData();

  async function getRtmToken(
    channelName: string,
    uId: string
  ): Promise<RtcTokenResponse | undefined> {
    return new Promise((resolve, reject) => {
      executeGenerateRtcTokenMutation({
        generateRTCTokenInput: {
          channelName,
          uId,
          role: "audience",
          tokenType: "uid",
        },
      })
        .then(({ data, error }) => {
          if (error) {
            reject(error);
          } else {
            const { generateRTCToken } = data || {};
            resolve(generateRTCToken);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function loginToRtm() {
    const res = await getRtmToken("channelName", String(user?.id));
    const { rtmAccessToken } = res || {};
    let rtmLocal = rtmRef.current;
    if (!rtmLocal) {
      rtmLocal = new Client();
      rtmRef.current = rtmLocal;
      try {
        await rtmLocal.login(String(user?.id), rtmAccessToken || "");
        // notification.success({
        //   message: "user logged in successfully",
        // });
        rtmLocal?.on("MemberLeft", ({ channelName, args }) => {
          const memberId = args[0];
          console.log(`%c${memberId} left the ${channelName}`, "color:red");
        });

        rtmLocal?.on("MemberJoined", ({ channelName, args }) => {
          const memberId = args[0];
          console.log(`%c${memberId} joined the ${channelName}`, "color:green");
        });

        rtmLocal?.on("ChannelMessage", async ({ channelName, args }) => {
          const [message, memberId] = args;
          console.log(`%c${memberId}---> ${message.text}`, "color:orange");
          const info = { ...messageInfoRef.current };
          const messages = { ...info.messagesWithChannel };
          messages[channelName || ""] = [
            ...(messages[channelName || ""] ? messages[channelName || ""] : []),
            {
              senderId: memberId,
              message: message.text,
              messageType: "text",
              createdAt: new Date().getTime(),
            },
          ];
          info.messagesWithChannel = messages;
          setMessageInfo(info);
        });
      } catch (error) {
        console.log(error);
        notification.error({
          message: "login failed",
        });
      }
    }
  }

  async function onJoinChannel(channelName: string) {
    const channelToBeJoined = rtmRef.current?.channels[channelName];
    if (channelToBeJoined?.joined) {
      // cannot join an already joined channel
      return;
    }
    try {
      await rtmRef.current?.joinChannel(channelName);
      if (rtmRef.current) {
        rtmRef.current.channels[channelName].joined = true;
      }
      notification.success({
        message: "joined successfully",
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "joined failed",
      });
    }
  }

  async function onLoginJoinChannel({ channelName }: { channelName: string }) {
    const { data } = await executeGenerateRtcTokenMutation({
      generateRTCTokenInput: {
        channelName,
        uId: String(user?.id),
        role: "audience",
        tokenType: "uid",
      },
    });
    const { rtmAccessToken } = data?.generateRTCToken || {};

    let rtmLocal = rtmRef.current;
    if (!rtmLocal) {
      rtmLocal = new Client();
      rtmRef.current = rtmLocal;
      try {
        await rtmLocal.login(String(user?.id), rtmAccessToken || "");
        notification.success({
          message: "user logged in successfully",
        });

        await rtmLocal?.joinChannel(channelName);
        if (rtmLocal) {
          rtmLocal.channels[channelName].joined = true;
        }
        notification.success({
          message: "joined successfully",
        });
        rtmLocal?.on("MemberLeft", ({ channelName, args }) => {
          const memberId = args[0];
          console.log(`%c${memberId} left the ${channelName}`, "color:red");
        });

        rtmLocal?.on("MemberJoined", ({ channelName, args }) => {
          const memberId = args[0];
          console.log(`%c${memberId} joined the ${channelName}`, "color:green");
        });
        rtmLocal?.on("ChannelMessage", async ({ channelName, args }) => {
          const [message, memberId] = args;
          console.log(`%c${memberId}---> ${message.text}`, "color:orange");
          const info = { ...messageInfoRef.current };
          const messages = { ...info.messagesWithChannel };
          messages[info?.currentChannel?.channelName || ""] = [
            ...(messages[info?.currentChannel?.channelName || ""]
              ? messages[info?.currentChannel?.channelName || ""]
              : []),
            {
              senderId: memberId,
              message: message.text,
              messageType: "text",
              createdAt: new Date().getTime(),
            },
          ];
          info.messagesWithChannel = messages;
          setMessageInfo(info);
        });
      } catch (error) {
        console.log(error);
        notification.error({
          message: "login failed",
        });
      }
    }
  }

  async function onMessage(text: string, messageType: string = "Text") {
    executeCreateChatMessageMutation({
      createChatMessageInput: {
        channelId: messageInfo.currentChannel?.id as number,
        senderId: user?.id as number,
        receiverId: messageInfo.currentChannel?.id as number,
        message: text,
        messageType,
        isRead: false,
      },
    });
    await rtmRef.current?.sendChannelMessage(
      text,
      messageInfo.currentChannel?.channelName || ""
    );
    const info = { ...messageInfoRef.current };
    const messages = { ...info.messagesWithChannel };
    messages[messageInfo.currentChannel?.channelName || ""] = [
      ...(messages[messageInfo.currentChannel?.channelName || ""]
        ? messages[messageInfo.currentChannel?.channelName || ""]
        : []),
      {
        senderId: user?.id,
        message: text,
        // messageType: "text",
        messageType,
        createdAt: new Date().getTime(),
      },
    ];
    info.messagesWithChannel = messages;

    setMessageInfo(info);
  }

  async function setCurrentChannel(channel: ChatChannels) {
    if (channel.channelName === messageInfo.currentChannel?.channelName) return; // channel is already switched, must not switch again
    const info = { ...messageInfo };
    info.currentChannel = channel;
    setMessageInfo(info);
  }

  return (
    <MessageContext.Provider
      value={{
        messageInfo: {
          ...messageInfo,
          allChannels: getAllChatChannels as ChatChannels[],
        },
        createChatFetching,
        onLoginJoinChannel,
        onJoinChannel,
        loginToRtm,
        setCurrentChannel,
        onMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
