import React, { useEffect } from "react";
import _classes from "./Message-detail.module.scss";
import UserProfile from "../UserProfile/UserProfile";
import { useMessageContext } from "./MessageContext";
import { useRouter } from "next/router";

type Props = { setRemoveCurrentChat?: any };

function MessageConversationSider({ setRemoveCurrentChat }: Props) {
  const { setCurrentChannel, onJoinChannel, messageInfo } = useMessageContext();
  const { query } = useRouter();
  const { allChannels } = messageInfo || {};

  async function onJoinChat(params: any = {}) {
    // console.log("onJoinChat=======>", params);
    setRemoveCurrentChat(false);
    setCurrentChannel(params);
    onJoinChannel?.(params?.channelName);
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
      } else if (query.chat === "admin") {
        params = allChannels?.find(
          (v) => v.patientId == query.patientId && v.doctorId == query.doctorId
        );
        // onJoinChat({});
      }
    }
  }, [query]);

  // console.log("alchanels", allChannels);

  return (
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
          />
        );
      })}
    </div>
  );
}

export default MessageConversationSider;
