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
  const isMobile = screen.width < 767;
  const [removeCurrentChat, setRemoveCurrentChat] =
    React.useState<boolean>(false);
  const [showConversation, setShowConversation] = React.useState<boolean>(true);
  const [showContent, setShowContent] = React.useState<boolean>(!isMobile);
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

  const showLayout = (
    showConversationList: boolean,
    showChatContent: boolean
  ) => {
    if (isMobile) {
      setShowConversation(showConversationList);
      setShowContent(showChatContent);
    }
  };

  return (
    <AppLayout>
      <MessageContextProvider>
        <MessageLayout>
          <MessageHeader
            removeCurrentChat={removeCurrentChat}
            setRemoveCurrentChat={setRemoveCurrentChat}
            onBackThread={(
              showConversationList: boolean,
              showChatContent: boolean
            ) => {
              showLayout(showConversationList, showChatContent);
              setRemoveCurrentChat(true);
            }}
          />
          {showConversation ? (
            <MessageConversationSider
              setRemoveCurrentChat={setRemoveCurrentChat}
              updateLayout={(
                showConversationList: boolean,
                showChatContent: boolean
              ) => {
                showLayout(showConversationList, showChatContent);
              }}
            />
          ) : (
            <div />
          )}
          {showContent ? (
            <MessageContent removeCurrentChat={removeCurrentChat} />
          ) : (
            <div />
          )}
        </MessageLayout>
      </MessageContextProvider>
    </AppLayout>
  );
}
export default Messages;
