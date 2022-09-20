import React, { useEffect, useRef } from "react";
import ChatBar from "./ChatBar";
import MessageInput from "../MessageInput/MessageInput";
import _classes from "./Message-detail.module.scss";
import { useMessageContext } from "./MessageContext";
import { LockOutlined } from "@ant-design/icons";

type Props = {
  removeCurrentChat?: boolean | undefined;
};

function MessageContent({ removeCurrentChat }: Props) {
  const messagesEndRef: any = useRef<null | HTMLElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const { messageInfo } = useMessageContext();
  const { messagesWithChannel, currentChannel, allChannels } =
    messageInfo || {};
  const currentChannelMessages =
    messagesWithChannel?.[currentChannel?.channelName || ""];

  useEffect(() => {
    scrollToBottom();
  }, [currentChannelMessages]);

  return (
    <div className="border border-gray-4 w-full chatremove">
      <div className="w-full px-4 hippa client message flex justify-center bg-gray-4 py-2 text-xs text-gray-2 mb-0">
        <div className="flex items-center justify-center">
          <LockOutlined className="mr-1" />
          Messages are HIPPA compliant
        </div>
      </div>
      {currentChannelMessages && !removeCurrentChat ? (
        <div className={`${_classes["custom-height"]}`}>
          {currentChannelMessages?.map((message: any) => {
            return <ChatBar data={message} />;
          })}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div
          className={`flex justify-center items-center ${_classes["custom-height"]}`}
        >
          {currentChannel?.lastMessage !== null ? (
            allChannels && allChannels?.length > 0 ? (
              <div className="text-gray">
                Click on the chat thread to continue chat.
              </div>
            ) : null
          ) : null}
        </div>
      )}
      {!removeCurrentChat && <MessageInput />}
    </div>
  );
}

export default MessageContent;

function TimeDivider() {
  return (
    <div className="bg-gray-4 h-0.5 mt-6 relative mx-4">
      <span className="bg-white absolute -top-50 left-1/2 -bottom-3">
        March 1,2022
      </span>
    </div>
  );
}
