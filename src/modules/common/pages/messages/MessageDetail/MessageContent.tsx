import React from "react";
import ChatBar from "./ChatBar";
import MessageInput from "../MessageInput/MessageInput";
import _classes from "./Message-detail.module.scss";
import { useMessageContext } from "./MessageContext";

type Props = {};

function MessageContent({}: Props) {
  const { messageInfo } = useMessageContext();
  const { messagesWithChannel, currentChannel } = messageInfo || {};
  const currentChannelMessages =
    messagesWithChannel?.[currentChannel?.channelName || ""];

  return (
    <div className="border border-gray-4 w-full">
      <div className={`${_classes["custom-height"]}`}>
        {currentChannelMessages?.map((message: any) => {
          return <ChatBar data={message} />;
        })}
      </div>
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
