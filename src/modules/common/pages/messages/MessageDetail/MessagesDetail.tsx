import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import MessageLayout from "./MessageLayout";

// scss
import _classes from "./Message-detail.module.scss";  
import MessageConversationSider from "./MessageConversationSider";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";

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
