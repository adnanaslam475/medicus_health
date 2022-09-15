import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { message, notification } from "antd";
import { getUserData } from "common/utils/userData";
import {
  ChatChannels,
  RtcTokenResponse,
  useCreateChatChannelMutation,
  useCreateChatMessageMutation,
  useGenerateRtcTokenMutation,
  useGetAllChatChannelsQuery,
  useGetChannelMessagesQuery,
  useMarkMessagesAsReadMutationMutation,
} from "generated/graphql";

import { useRouter } from "next/router";
import Client from "./client";

type state = {
  messageInfo: MessageInfo;
  onLoginJoinChannel?: ({
    channelName,
  }: {
    channelName: string;
  }) => Promise<void>;
  onJoinChannel?: (channelName: string) => Promise<void>;
  createOrJoinChannel?: (channelName: string) => Promise<void>;
  loginToRtm?: () => Promise<void>;
  markMessageAsReadHandler?: (id: number) => Promise<void>;
  onMessage: (text: string, messageType?: string) => void;
  setCurrentChannel: (channel: ChatChannels) => void;
  setChatSearch: (value: string) => void;
  createChatFetching?: boolean | undefined | null;
  backButton?: boolean | undefined | null;
  setBackButton?: Dispatch<SetStateAction<boolean>>;
};

type MessageInfo = {
  allChannels: ChatChannels[] | undefined;
  messagesWithChannel: any;
  currentChannel: ChatChannels | undefined;
};

const initialState: state = {
  onMessage: () => null,
  setChatSearch: () => null,
  setCurrentChannel: () => null,
  messageInfo: {
    allChannels: [],
    messagesWithChannel: {},
    currentChannel: undefined,
  },
  createChatFetching: null,
  backButton: null,
  setBackButton: () => null,
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
  const [againFetchAllChannel, setAgainFetchAllChannel] =
    useState<boolean>(false);
  const [createChatFetching, setCreateChatFetching] = useState<boolean>(false);
  const [backButton, setBackButton] = React.useState<boolean>(false);
  const [searchString, setChatSearch] = React.useState<string>("");
  const { query } = useRouter();
  const messageInfoRef = useRef<MessageInfo>(messageInfo);
  messageInfoRef.current = messageInfo;
  const rtmRef = useRef<Client>();

  const [{}, markAsReadMutation] = useMarkMessagesAsReadMutationMutation();

  const [, executeCreateChatChannelMutation] = useCreateChatChannelMutation();
  const [{ data }, executeGetAllChatChannelsMutation] =
    useGetAllChatChannelsQuery({
      variables: { filter: { searchString } },
    });
  const { getAllChatChannels } = data || {};

  const [{ data: channelMessageData }, executeGetChannelMessagesQuery] =
    useGetChannelMessagesQuery({
      variables: {
        channelId: messageInfo.currentChannel?.id as number,
      },
      pause: !messageInfo.currentChannel,
    });
  const { getChannelMessages } = channelMessageData || {};
  console.log("getChannelMessages", getChannelMessages);

  useEffect(() => {
    if (getChannelMessages) {
      executeGetChannelMessagesQuery({
        requestPolicy: "network-only",
      });
      const info = { ...messageInfoRef.current };
      const messages = { ...info.messagesWithChannel };
      // messages[messageInfo.currentChannel?.channelName || ""] = [
      //   ...getChannelMessages,
      //   ...(messages[messageInfo.currentChannel?.channelName || ""]
      //     ? messages[messageInfo.currentChannel?.channelName || ""]
      //     : []),
      // ];
      messages[messageInfo.currentChannel?.channelName || ""] = [
        ...getChannelMessages,
      ];

      info.messagesWithChannel = messages;
      setMessageInfo(info);
    }
  }, [
    getChannelMessages?.[0]?.channelId,
    messageInfo.currentChannel?.channelName,
  ]);

  async function createOrJoinChannel() {
    try {
      if (query?.chat && query.doctorId && query.patientId) {
        await executeCreateChatChannelMutation({
          createChatChannelInput: {
            doctorId: Number(query.doctorId),
            patientId: Number(query.patientId),
            isAdminChat: query.chat === "admin",
          },
        });
      } else if (query?.chat && query.doctorId) {
        // for admin to doctor
        await executeCreateChatChannelMutation({
          createChatChannelInput: {
            doctorId: Number(query.doctorId),
            isAdminChat: query.chat === "admin",
          },
        });
      } else if (query?.chat && query.patientId) {
        // for admin to patient
        await executeCreateChatChannelMutation({
          createChatChannelInput: {
            patientId: Number(query.patientId),
            isAdminChat: query.chat === "admin",
          },
        });
      }
      setAgainFetchAllChannel(true);
      // executeGetAllChatChannelsMutation({
      //   requestPolicy: "network-only",
      // });
    } catch (error) {
      console.log("error to carete", error);
    }
  }

  useEffect(() => {
    if (againFetchAllChannel) {
      executeGetAllChatChannelsMutation({
        requestPolicy: "network-only",
      });
    }
  }, [againFetchAllChannel]);

  useEffect(() => {
    createOrJoinChannel();
  }, []);

  const [, executeGenerateRtcTokenMutation] = useGenerateRtcTokenMutation();
  const [{ fetching }, executeCreateChatMessageMutation] =
    useCreateChatMessageMutation();

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
    setBackButton(false);
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
          console.log(" ...messageInfoRef.current ", {
            ...messageInfoRef.current,
          });

          const messages = { ...info.messagesWithChannel };
          const { text, messageType } = JSON.parse(message.text);
          messages[channelName || ""] = [
            ...(messages[channelName || ""] ? messages[channelName || ""] : []),
            {
              senderId: memberId,
              message: text,
              messageType,
              createdAt: new Date().getTime(),
            },
          ];
          info.messagesWithChannel = messages;
          setMessageInfo(info);
        });
      } catch (error) {
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

      // notification.success({
      //   message: "joined successfully",
      // });
    } catch (error: any) {
      // Error Code 202 - A channel of the same channel ID has already joined. Cannot rejoin.
      if (error?.code === 202) {
        return;
      }
      // else {
      //   notification.error({
      //     message: "joined failed",
      //   });
      // }
    }
  }

  // async function onLoginJoinChannel({ channelName }: { channelName: string }) {
  //   const { data } = await executeGenerateRtcTokenMutation({
  //     generateRTCTokenInput: {
  //       channelName,
  //       uId: String(user?.id),
  //       role: "audience",
  //       tokenType: "uid",
  //     },
  //   });
  //   const { rtmAccessToken } = data?.generateRTCToken || {};

  //   let rtmLocal = rtmRef.current;
  //   if (!rtmLocal) {
  //     rtmLocal = new Client();
  //     rtmRef.current = rtmLocal;
  //     try {
  //       await rtmLocal.login(String(user?.id), rtmAccessToken || "");
  //       notification.success({
  //         message: "user logged in successfully",
  //       });

  //       await rtmLocal?.joinChannel(channelName);
  //       if (rtmLocal) {
  //         rtmLocal.channels[channelName].joined = true;
  //       }
  //       notification.success({
  //         message: "joined successfully",
  //       });
  //       rtmLocal?.on("MemberLeft", ({ channelName, args }) => {
  //         const memberId = args[0];
  //         console.log(`%c${memberId} left the ${channelName}`, "color:red");
  //       });

  //       rtmLocal?.on("MemberJoined", ({ channelName, args }) => {
  //         const memberId = args[0];
  //         console.log(`%c${memberId} joined the ${channelName}`, "color:green");
  //       });
  //       rtmLocal?.on("ChannelMessage", async ({ channelName, args }) => {
  //         console.log("args2", { args });

  //         const [message, memberId, messageType] = args;
  //         console.log(`%c${memberId}---> ${message.text}`, "color:orange");
  //         const info = { ...messageInfoRef.current };
  //         const messages = { ...info.messagesWithChannel };
  //         messages[info?.currentChannel?.channelName || ""] = [
  //           ...(messages[info?.currentChannel?.channelName || ""]
  //             ? messages[info?.currentChannel?.channelName || ""]
  //             : []),
  //           {
  //             senderId: memberId,
  //             message: message.text,
  //             messageType: message?.messageType,
  //             createdAt: new Date().getTime(),
  //           },
  //         ];
  //         info.messagesWithChannel = messages;
  //         setMessageInfo(info);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       notification.error({
  //         message: "login failed",
  //       });
  //     }
  //   }
  // }
  async function markMessageAsReadHandler(id: number) {
    try {
      await markAsReadMutation({
        id,
      });
      // localStorage.removeItem("id");
    } catch (error) {
      console.log("something went wrong");
    }
  }
  async function onMessage(text: string, messageType: string = "Text") {
    setCreateChatFetching(true);
    executeCreateChatMessageMutation({
      createChatMessageInput: {
        channelId: messageInfo.currentChannel?.id as number,
        senderId: user?.id as number,
        receiverId: messageInfo.currentChannel?.receiverDetail?.id as number,
        message: text,
        messageType,
        isRead: false,
      },
    });
    await rtmRef.current?.sendChannelMessage(
      JSON.stringify({ text, messageType }),
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
    setCreateChatFetching(false);
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
        backButton,
        setBackButton,
        // onLoginJoinChannel,
        onJoinChannel,
        setChatSearch,
        loginToRtm,
        markMessageAsReadHandler,
        setCurrentChannel,
        createOrJoinChannel,
        onMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
