import React from "react";
import _classes from "./Message-detail.module.scss";
import UserProfile from "../UserProfile/UserProfile";

type Props = {};

function MessageConversationSider({}: Props) {
  return (
    <div
      style={{
        height: "calc(100vh - 225px)",
        overflowY: "auto",
      }}
    >
      <UserProfile bgcolor="bg-gray-4" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
    </div>
  );
}

export default MessageConversationSider;
