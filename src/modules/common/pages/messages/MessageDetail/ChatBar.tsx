import React from "react";
import Image from "next/image";
import nullicon from "./../../../../../../public/assets/images/nullicon.png";
import { useMessageContext } from "./MessageContext";
import { getUserData } from "common/utils/userData";
import attachIcon from "./../../../../../../public/assets/images/attach.svg";
import fileIcon from "./../../../../../../public/assets/icon/file-icon.svg";
import { date } from "common/utils";
import MDNextImage from "common/components/MDNextImage/MDNextImage";

type Props = {
  data: any;
};

function MessageItem(props: Props) {
  const { user } = getUserData();
  const { timeZone } = user || {};
  const { timeZone: userTimeZone } = timeZone || {};
  const { data } = props;
  const { message, senderId, messageType, sender, createdAt } = data || {};
  const { messageInfo } = useMessageContext();
  const { currentChannel } = messageInfo || {};
  const { participants } = currentChannel || {};
  const messageOwner = participants?.find(
    ({ participantId }) => Number(senderId) === participantId
  );
  const { userDetails } = messageOwner || {};
  const { role, doctorProfile, patientProfile, adminProfilePicture } =
    userDetails || {};
  const { profile_image: doctorImage } = doctorProfile || {};
  const { profileImage: patientImage } = patientProfile || {};
  const { profile_picture } = adminProfilePicture || {};
  const isMyMessage = Number(senderId) === Number(user?.id);
  const backgroundColor = isMyMessage ? "#E0EEFD" : "#F6F8FA";
  const justifyContent = isMyMessage ? "flex-end" : "flex-start";

  // Set User time zone
  date?.setTimeZone(userTimeZone ? String(userTimeZone) : "America/New_York");
  const messageDateTime = date?.getDateAndTimeWRTTZ(
    createdAt,
    "MM/DD/YY, h:mma"
  );

  // get file name from Media
  let fileName = message.split("com")[1]?.replace("/", "");
  fileName = fileName?.substr(0, fileName?.lastIndexOf("."));

  return (
    <div className="p-4">
      <div
        className={`flex items-center gap-2`}
        style={{
          justifyContent,
        }}
      >
        <div className="w-full xl:w-1/2">
          <div className="flex items-start gap-2">
            <div className="w-1/12">
              <MDNextImage
                alt=""
                width={39}
                height={39}
                objectFit="cover"
                className="rounded-full"
                src={
                  role === "Doctor" || role === "Staff"
                    ? (doctorImage as string)
                    : role === "User"
                    ? (patientImage as string)
                    : role === "Admin"
                    ? (profile_picture as string)
                    : ""
                }
                fallbackImage={nullicon}
              />
            </div>
            <div className="gap-3 w-11/12">
              <div>
                <span className="text-base text-black pr-3">
                  {userDetails?.role === "Doctor"
                    ? `Dr. ${userDetails?.last_name}`
                    : `${userDetails?.first_name} ${userDetails?.last_name}`}
                </span>
                <span className="text-base text-gray">{messageDateTime}</span>
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
                    <a
                      href={message}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all"
                    >
                      {fileName}
                    </a>
                  </p>
                ) : (
                  <p
                    className={`p-3 text-secondary rounded inline-block break-all`}
                  >
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
