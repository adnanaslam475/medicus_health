import React, { useEffect } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import MessageLayout from "./MessageLayout";
import MessageConversationSider from "./MessageConversationSider";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import { MessageContextProvider } from "./MessageContext";

// scss
import _classes from "./Message-detail.module.scss";
import { useRouter } from "next/router";

type Props = {};

function Messages({}: Props) {
  const [removeCurrentChat, setRemoveCurrentChat] =
    React.useState<boolean>(false);
  const { query } = useRouter();

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("id") as any);
    if (query?.chat && localData) {
      history.pushState(
        {},
        "",
        `${Object.keys(localData)
          .map(function (key) {
            return key + "=" + localData[key];
          })
          .join("&")}`
      );
    }
  }, [query]);

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
