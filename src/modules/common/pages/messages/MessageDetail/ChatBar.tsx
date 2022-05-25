import React from "react";
import Image from "next/image";
import profile from "./../../../../../../public/assets/images/your_photo.png";
import { useMessageContext } from "./MessageContext";

type Props = {
  data: any;
};

function MessageItem(props: Props) {
  const { data } = props;
  const { message, isMyMessage, senderId } = data || {};
  const { messageInfo } = useMessageContext();
  const { currentChannel } = messageInfo || {};
  const { participants } = currentChannel || {};
  const messageOwner = participants?.find(
    ({ participantId }) => Number(senderId) === participantId
  );
  const { userDetails } = messageOwner || {};

  const backgroundColor = isMyMessage ? "#E0EEFD" : "#F6F8FA";
  const justifyContent = isMyMessage ? "flex-end" : "flex-start";

  return (
    <div className="p-4">
      <div
        className={`flex items-center gap-2`}
        style={{
          justifyContent,
        }}
      >
        <div className="w-1/2">
          <div className="flex items-start gap-2">
            <div className="w-1/12">
              <Image alt="" width={39} height={39} src={profile} />
            </div>
            <div className="gap-3 w-11/12">
              <div>
                <span className="text-base text-black pr-3">{`${userDetails?.first_name} ${userDetails?.last_name}`}</span>
                <span className="text-base text-gray">3:30 AM</span>
              </div>
              <div
                className={`flex items-center gap-2`}
                style={{ backgroundColor }}
              >
                <p className={`p-3 text-secondary rounded inline-block`}>
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
