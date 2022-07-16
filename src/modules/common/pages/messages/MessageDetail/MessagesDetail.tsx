import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import MessageLayout from "./MessageLayout";
import MessageConversationSider from "./MessageConversationSider";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import { MessageContextProvider } from "./MessageContext";

// scss
import _classes from "./Message-detail.module.scss";
import ConfirmationModal from "common/components/ConfirmationModal/ConfirmationModal";

type Props = { modalHandler: any };

function Messages({}: Props) {
  const [open, setOpen] = React.useState<string>("");
  const modalHandler = (id: string) => setOpen(id);

  const deleteChatChannelHandler = async () => {
    try {
    } catch (error) {
      console.log("e", error);
    }
  };

  return (
    <AppLayout>
      <MessageContextProvider>
        <MessageLayout>
          <ConfirmationModal
            visible={!!open}
            confirmLoading={false}
            onCancel={() => modalHandler("")}
            onOk={deleteChatChannelHandler}
            message="Are you sure you want ot delete this Channel?"
          />
          <MessageHeader modalHandler={modalHandler} />
          <MessageConversationSider />
          <MessageContent />
        </MessageLayout>
      </MessageContextProvider>
    </AppLayout>
  );
}
export default Messages;
