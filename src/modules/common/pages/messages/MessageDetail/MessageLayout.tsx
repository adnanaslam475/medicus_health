import React from "react";
import ChatBar from "../ChatBar/ChatBar";
import MessageInput from "../MessageInput/MessageInput";
import _classes from "./Message-detail.module.scss";

type Props = {
  children: React.ReactChild[];
};

function MessageLayout({ children }: Props) {
  return (
    <div className="w-full">
      <div className="w-full border border-gray-4">
        <div>{children[0]}</div>
        <div className="flex">
          <div className="max-w-[340px] w-full">{children[1]}</div>
          {children[2]}
        </div>
      </div>
    </div>
  );
}

export default MessageLayout;
