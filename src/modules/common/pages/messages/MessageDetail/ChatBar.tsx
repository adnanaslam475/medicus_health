import React from "react";
import Image from "next/image";
import profile from "./../../../../../../public/assets/images/your_photo.png";
import { useMessageContext } from "./MessageContext";
import { getUserData } from "common/utils/userData";
import attachIcon from "./../../../../../../public/assets/images/attach.svg";
import fileIcon from "./../../../../../../public/assets/icon/file-icon.svg";

type Props = {
  data: any;
};

function MessageItem(props: Props) {
  const { user } = getUserData();
  const { data } = props;
  const { message, senderId, messageType } = data || {};
  const { messageInfo } = useMessageContext();
  const { currentChannel } = messageInfo || {};
  const { participants } = currentChannel || {};
  const messageOwner = participants?.find(
    ({ participantId }) => Number(senderId) === participantId
  );
  const { userDetails } = messageOwner || {};
  const isMyMessage = Number(senderId) === Number(user?.id);
  const backgroundColor = isMyMessage ? "#E0EEFD" : "#F6F8FA";
  const justifyContent = isMyMessage ? "flex-end" : "flex-start";

  // console.log({ data });

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
              <Image
                priority={true}
                alt=""
                width={39}
                height={39}
                src={profile}
              />
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
                {messageType === "Text" ? (
                  <p className={`p-3 text-secondary rounded inline-block`}>
                    {message}
                  </p>
                ) : (
                  <p className={`p-3 text-secondary rounded inline-block`}>
                    <Image
                      priority={true}
                      alt=""
                      width={25}
                      height={25}
                      src={fileIcon}
                    />
                    {/* {message} */}
                    <a href={message} target="_blank" rel="noreferrer">
                      {message}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
