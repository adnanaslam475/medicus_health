import { notification } from "antd";
import { getUserData } from "common/utils/userData";
import {
  ChatChannels,
  RtcTokenResponse,
  useGenerateRtcTokenMutation,
  useGetAllChatChannelsQuery,
} from "generated/graphql";
import React, { createContext, useContext, useRef, useState } from "react";
import Client from "./client";

type state = {
  messageInfo: MessageInfo;
  onLoginJoinChannel?: ({
    channelName,
  }: {
    channelName: string;
  }) => Promise<void>;
  onJoinChannel?: (channelName: string) => Promise<void>;
  loginToRtm?: ({ channelName }: { channelName: string }) => Promise<void>;
  onMessage: (text: string) => void;
  setCurrentChannel: (channel: ChatChannels) => void;
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
  const messageInfoRef = useRef<MessageInfo>(messageInfo);
  messageInfoRef.current = messageInfo;
  const rtmRef = useRef<Client>();
  const [{ data }] = useGetAllChatChannelsQuery();
  const { getAllChatChannels } = data || {};

  const [, executeGenerateRtcTokenMutation] = useGenerateRtcTokenMutation();
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

  async function loginToRtm({ channelName }: { channelName: string }) {
    const res = await getRtmToken("channelName", String(user?.id));
    const { rtmAccessToken } = res || {};
    let rtmLocal = rtmRef.current;
    if (!rtmLocal) {
      rtmLocal = new Client();
      rtmRef.current = rtmLocal;
      try {
        await rtmLocal.login(String(user?.id), rtmAccessToken || "");
        notification.success({
          message: "user logged in successfully",
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
          messages[channelName || ""] = [
            ...(messages[channelName || ""] ? messages[channelName || ""] : []),
            {
              senderId: memberId,
              message: message.text,
              messageType: "text",
              createdAt: new Date().getTime(),
              isMyMessage: false,
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
    console.log("rtmRef.current?.channels", rtmRef.current?.channels);
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
              isMyMessage: false,
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

  async function onMessage(text: string) {
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
        messageType: "text",
        createdAt: new Date().getTime(),
        isMyMessage: true,
      },
    ];
    info.messagesWithChannel = messages;

    setMessageInfo(info);
  }

  function setCurrentChannel(channel: ChatChannels) {
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
