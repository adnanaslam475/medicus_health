import React, { useEffect, useRef } from "react";
import ChatBar from "./ChatBar";
import MessageInput from "../MessageInput/MessageInput";
import _classes from "./Message-detail.module.scss";
import { useMessageContext } from "./MessageContext";

type Props = { removeCurrentChatHeader?: boolean | undefined };

function MessageContent({ removeCurrentChatHeader }: Props) {
  const messagesEndRef: any = useRef<null | HTMLElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const { messageInfo } = useMessageContext();
  const { messagesWithChannel, currentChannel } = messageInfo || {};
  const currentChannelMessages =
    messagesWithChannel?.[currentChannel?.channelName || ""];

  useEffect(() => {
    scrollToBottom();
  }, [currentChannelMessages]);

  useEffect(() => {
    if (removeCurrentChatHeader) {
      document.getElementsByClassName("chatremove")[0].remove();
    }
  }, [removeCurrentChatHeader]);

  return (
    <div className="border border-gray-4 w-full chatremove">
      {currentChannelMessages ? (
        <div className={`${_classes["custom-height"]}`}>
          {currentChannelMessages?.map((message: any) => {
            return <ChatBar data={message} />;
          })}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="flex justify-center items-center mt-80">
          <div className="text-gray">
            Click on the chat thread to continue chat.
          </div>
        </div>
      )}
      <MessageInput />
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
