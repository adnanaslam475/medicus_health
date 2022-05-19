import React from "react";
import ChatBar from "../ChatBar/ChatBar";
import MessageInput from "../MessageInput/MessageInput";
import _classes from "./Message-detail.module.scss";

type Props = {};

function MessageContent({}: Props) {
  return (
    <div className="border border-gray-4 ">
      <div className={`${_classes["custom-height"]}`}>
        <div className="bg-gray-4 h-0.5 mt-6 relative mx-4">
          <span className="bg-white absolute -top-50 left-1/2 -bottom-3">
            March 1,2022
          </span>
        </div>
        <ChatBar className="justify-start" bgColor="bg-gray-4" />
        <ChatBar className="justify-end " bgColor="bg-gray-9" />
        <div className="bg-gray-4 h-0.5 mt-6 relative mx-4">
          <span className="bg-white absolute -top-50 left-1/2 -bottom-3">
            March 1,2022
          </span>
        </div>
        <ChatBar className="justify-start" bgColor="bg-gray-4" />
        <ChatBar className="justify-end " bgColor="bg-gray-9" />
      </div>
      <MessageInput />
    </div>
  );
}

export default MessageContent;
