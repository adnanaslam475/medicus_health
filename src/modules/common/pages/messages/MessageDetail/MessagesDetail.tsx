import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import MessageLayout from "./MessageLayout";
import MessageConversationSider from "./MessageConversationSider";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import { MessageContextProvider } from "./MessageContext";

// scss
import _classes from "./Message-detail.module.scss";

type Props = {};

function Messages({}: Props) {
  const [removeCurrentChat, setRemoveCurrentChat] =
    React.useState<boolean>(false);
  return (
    <AppLayout>
      <MessageContextProvider>
        <MessageLayout>
          <MessageHeader
            removeCurrentChat={removeCurrentChat}
            setRemoveCurrentChat={setRemoveCurrentChat}
          />
          <MessageConversationSider
            setRemoveCurrentChat={setRemoveCurrentChat}
          />
          <MessageContent removeCurrentChat={removeCurrentChat} />
        </MessageLayout>
      </MessageContextProvider>
    </AppLayout>
  );
}
export default Messages;
