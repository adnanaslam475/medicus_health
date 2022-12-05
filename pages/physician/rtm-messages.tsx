import dynamic from "next/dynamic";

const messages = dynamic(
  () => {
    return import(
      "../../src/modules/admin/pages/Messages/MessageDetail/MessageDetail"
    );
  },
  { ssr: false }
);

export default messages;
