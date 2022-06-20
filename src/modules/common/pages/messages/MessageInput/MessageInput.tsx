import { Input } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import _classes from "./MessageInput.module.scss";
import attachIcon from "./../../../../../../public/assets/images/attach.svg";
import smile from "./../../../../../../public/assets/images/smile.svg";
import send from "./../../../../../../public/assets/images/send.svg";
import { useMessageContext } from "../MessageDetail/MessageContext";

function MessageInput() {
  const [messageText, setMessageText] = useState<string>("");
  const { messageInfo, onMessage } = useMessageContext();

  function onMessageTextChange(text: string) {
    setMessageText(text);
  }

  function onSendMessage() {
    onMessage?.(messageText);
    setMessageText("");
  }
  const isShowInput = !!messageInfo.currentChannel?.channelName;

  return (
    <div className={`${_classes["message-input"]} relative`}>
      {isShowInput && (
        <>
          <Input
            placeholder="Type a new message"
            onChange={({ target }) => onMessageTextChange(target.value)}
            onPressEnter={onSendMessage}
            value={messageText}
          />
          <span className="absolute top-3 right-14">
            <Image
              priority={true}
              alt=""
              width={25}
              height={25}
              src={attachIcon}
            />
          </span>
          {/* <span className="absolute top-3 right-14">
            <Image priority={true} alt="" width={25} height={25} src={smile} />
          </span> */}
          <span
            className="absolute top-3 right-4 cursor-pointer"
            onClick={onSendMessage}
          >
            <Image priority={true} alt="" width={25} height={25} src={send} />
          </span>
        </>
      )}
    </div>
  );
}

export default MessageInput;
