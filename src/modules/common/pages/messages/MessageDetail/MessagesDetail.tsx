import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import MessageLayout from "./MessageLayout";
import MessageConversationSider from "./MessageConversationSider";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";

// scss
import _classes from "./Message-detail.module.scss";

function Messages() {
  return (
    <AppLayout>
      <MessageLayout>
        <MessageHeader />
        <MessageConversationSider />
        <MessageContent />
      </MessageLayout>
    </AppLayout>
  );
}
export default Messages;
