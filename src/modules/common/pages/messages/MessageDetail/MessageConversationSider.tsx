import React from "react";
import _classes from "./Message-detail.module.scss";
import UserProfile from "../UserProfile/UserProfile";
import { useMessageContext } from "./MessageContext";

type Props = {};

function MessageConversationSider({}: Props) {
  const { getAllChatChannels } = useMessageContext();
  console.log(getAllChatChannels);

  return (
    <div
      style={{
        height: "calc(100vh - 225px)",
        overflowY: "auto",
      }}
    >
      {getAllChatChannels?.map((thread) => {
        return <UserProfile thread={thread} />;
      })}
    </div>
  );
}

export default MessageConversationSider;
