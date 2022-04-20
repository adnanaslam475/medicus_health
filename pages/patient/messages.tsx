import dynamic from "next/dynamic";
// import Messages from "../../src/modules/admin/pages/Messages/MessageDetail/MessageDetail";

const Messages = dynamic(
  () => {
    return import("../../src/modules/admin/pages/Messages/MessageDetail/MessageDetail");
  },
  { ssr: false }
);

function messages() {
  return <Messages />;
}

export default messages;



