import React from "react";
import _classes from "./Message-detail.module.scss";
import UserProfile from "../UserProfile/UserProfile";
import { useMessageContext } from "./MessageContext";

type Props = {};

function MessageConversationSider({}: Props) {
  const { messageInfo } = useMessageContext();
  const { allChannels } = messageInfo || {};

  return (
    <div
      style={{
        height: "calc(100vh - 225px)",
        overflowY: "auto",
      }}
      className={`${_classes["custom-height"]}`}
    >
      {allChannels?.map((thread) => {
        return <UserProfile thread={thread} />;
      })}
    </div>
  );
}

export default MessageConversationSider;
