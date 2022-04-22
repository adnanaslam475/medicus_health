import dynamic from "next/dynamic";

const messages = dynamic(
  () => {
    return import(
      "../../src/modules/admin/pages/messages/MessageDetail/MessagesDetail"
    );
  },
  { ssr: false }
);

export default messages;
