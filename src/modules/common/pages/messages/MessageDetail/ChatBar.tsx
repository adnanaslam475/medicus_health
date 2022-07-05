import React from "react";
import Image from "next/image";
import profile from "./../../../../../../public/assets/images/your_photo.png";
import { useMessageContext } from "./MessageContext";
import { getUserData } from "common/utils/userData";
import attachIcon from "./../../../../../../public/assets/images/attach.svg";
import fileIcon from "./../../../../../../public/assets/icon/file-icon.svg";
import { date } from "common/utils";

type Props = {
  data: any;
};

function MessageItem(props: Props) {
  const { user } = getUserData();
  const { data } = props;
  const { message, senderId, messageType, sender, createdAt } = data || {};
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

  //adding 5 hours to datetime
  const messageTime = date?.addHoursToDate(new Date(createdAt), 5);
  const messageTimein12HoursFomrat = date?.formathhmma(messageTime?.toString());

  // get file name from Media
  const fileName = message.split("com")[1]?.replace("/", "");
  return (
    <div className="p-4">
      <div
        className={`flex items-center gap-2`}
        style={{
          justifyContent,
        }}
      >
        <div className="md:w-1/2">
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
                <span className="text-base text-gray">
                  {messageTimein12HoursFomrat}
                </span>
              </div>
              <div
                className={`flex items-center gap-2`}
                style={{ backgroundColor }}
              >
                {messageType === "Media" ? (
                  <p className={`p-3 text-secondary rounded inline-block`}>
                    <Image
                      priority={true}
                      alt=""
                      width={25}
                      height={25}
                      src={fileIcon}
                    />
                    <a href={message} target="_blank" rel="noreferrer">
                      {fileName}
                    </a>
                  </p>
                ) : (
                  <p className={`p-3 text-secondary rounded inline-block`}>
                    {message}
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
