import { notification } from "antd";
import { getUserData } from "common/utils/userData";
import {
  ChatChannels,
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
  onMessage: (text: string) => void;
  setCurrentChannelName: (name: string) => void;
};

type MessageInfo = {
  currentChannelName: string;
  allChannels: ChatChannels[] | undefined;
  messagesWithChannel: any;
};

const initialState: state = {
  onMessage: () => null,
  setCurrentChannelName: () => null,
  messageInfo: {
    allChannels: [],
    currentChannelName: "",
    messagesWithChannel: {},
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
    currentChannelName: "",
    messagesWithChannel: {},
  });
  const rtmRef = useRef<Client>();
  const [{ data }] = useGetAllChatChannelsQuery();
  const { getAllChatChannels } = data || {};

  const [, executeGenerateRtcTokenMutation] = useGenerateRtcTokenMutation();
  const { user } = getUserData();

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
          // setMessageHistory([
          //   ...messageHistoryRef.current,
          //   {
          //     name: memberId as string,
          //     text: message.text as string,
          //     type: "text",
          //   },
          // ]);
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
      messageInfo.currentChannelName
    );
    const info = { ...messageInfo };
    const messages = { ...info.messagesWithChannel };
    messages[info?.currentChannelName] = [
      ...(messages[info.currentChannelName]
        ? messages[info.currentChannelName]
        : []),
      {
        name: user?.id,
        text,
        time: new Date().getTime(),
      },
    ];
    info.messagesWithChannel = messages;

    setMessageInfo(info);
  }

  function setCurrentChannelName(name: string) {
    const info = { ...messageInfo };
    info.currentChannelName = name;
    setMessageInfo(info);
  }

  return (
    <MessageContext.Provider
      value={{
        messageInfo: {
          ...messageInfo,
          allChannels: getAllChatChannels,
        },
        onLoginJoinChannel,
        setCurrentChannelName,
        onMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
