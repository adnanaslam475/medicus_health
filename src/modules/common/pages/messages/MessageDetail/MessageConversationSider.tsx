import React, { useEffect, useState } from "react";
import _classes from "./Message-detail.module.scss";
import UserProfile from "../UserProfile/UserProfile";
import { useMessageContext } from "./MessageContext";
import { useRouter } from "next/router";
import { Spin } from "antd";

type Props = {
  setRemoveCurrentChat?: any;
  updateLayout?: (
    showConversationList: boolean,
    showChatContent: boolean
  ) => void;
};

function MessageConversationSider({
  setRemoveCurrentChat,
  updateLayout,
}: Props) {
  const { setCurrentChannel, onJoinChannel, messageInfo } = useMessageContext();
  const { query } = useRouter();
  const { allChannels } = messageInfo || {};
  const [loader, setLoader] = useState(false);

  async function onJoinChat(params: any = {}) {
    setRemoveCurrentChat(false);
    setCurrentChannel(params);
    onJoinChannel?.(params?.channelName);
    updateLayout?.(false, true);
  }

  useEffect(() => {
    if (query && allChannels) {
      let params = {} as any;
      if (query.patientId && query.doctorId) {
        params =
          allChannels?.find(
            (v) =>
              v.patientId == query.patientId && v.doctorId == query.doctorId
          ) || {};
        if (
          params?.patientId == query.patientId &&
          params?.doctorId == query.doctorId
        ) {
          onJoinChat(params);
        }
      } else if (query.chat == "admin" && query.patientId) {
        params = allChannels?.find(
          (v) => v.patientId == query.patientId && v.isAdminChat
        );
        onJoinChat(params);
      } else if (query.chat == "admin" && query.doctorId) {
        params = allChannels?.find(
          (v) => v.doctorId == query.doctorId && v.isAdminChat
        );
        onJoinChat(params);
      }
    }
  }, [query, allChannels]);

  return !allChannels ? (
    <div className="m-40">
      <Spin />
    </div>
  ) : (
    <div
      style={{
        height: "calc(100vh - 225px)",
        overflowY: "auto",
      }}
      className={`${_classes["custom-height"]}`}
    >
      {allChannels?.map((thread) => {
        return (
          <UserProfile
            thread={thread}
            setRemoveCurrentChat={setRemoveCurrentChat}
            updateLayout={() => {
              updateLayout?.(false, true);
            }}
          />
        );
      })}
    </div>
  );
}

export default MessageConversationSider;
