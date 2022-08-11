import React, { useEffect } from "react";
import { ChatChannels } from "generated/graphql";
import { useRouter } from "next/router";
import Image from "next/image";
import { useMessageContext } from "../MessageDetail/MessageContext";
import profile from "./../../../../../../public/assets/images/doc-pic.png";
import nullicon from "./../../../../../../public/assets/images/nullicon.png";
import loaderLogo from "./../../../../../../public/assets/images/loaderLogo.png";
import { getUserData } from "common/utils/userData";
import { date, messageUtils } from "common/utils";
import MDNextImage from "common/components/MDNextImage/MDNextImage";

type Props = {
  thread: ChatChannels;
  setRemoveCurrentChat?: any;
};

function UserProfile({ thread, setRemoveCurrentChat }: Props) {
  const { setCurrentChannel, loginToRtm, onJoinChannel, messageInfo } =
    useMessageContext();
  const { user } = getUserData();
  const { timeZone } = user || {};
  const { timeZone: userTimeZone } = timeZone || {};

  const { query } = useRouter();

  //get channel dateTime
  const { lastMessage } = thread || {};

  //get last message
  const { message, messageType, createdAt } = lastMessage || {};

  // Set User time zone
  date?.setTimeZone(String(userTimeZone));
  const messageDateTime = date?.getDateAndTimeWRTTZ(
    createdAt,
    "MM/DD/YY,h:mma"
  );

  async function onJoinChat() {
    // localStorage.setItem("id", JSON.stringify(query));
    setRemoveCurrentChat(false);
    setCurrentChannel(thread);
    onJoinChannel?.(thread.channelName);
  }

  useEffect(() => {
    loginToRtm?.();
  }, []);

  const opposite = messageUtils.getOppositeParticipant(
    thread,
    user?.role as string
  );
  const profileImage = messageUtils.getOppositeParticipantProfileImage(
    thread,
    user?.role as string
  );

  const firstName = opposite?.role !== "Doctor" ? opposite?.first_name : "";

  const lastName =
    opposite?.role !== "Doctor"
      ? opposite?.last_name
      : opposite?.role === "Doctor" && opposite?.last_name?.includes("Dr.")
      ? opposite?.last_name
      : `Dr. ${opposite?.last_name}`;
  return (
    <div
      onClick={onJoinChat}
      className={`flex px-1 sm:px-5 py-4 items-center border border-gray-4 cursor-pointer hover:bg-gray-4`}
    >
      <div className="relative">
        <MDNextImage
          alt=""
          width={70}
          height={70}
          className="rounded-full"
          objectFit="cover"
          fallbackImage={nullicon}
          src={profileImage || ""}
        />
        {profileImage && (
          <span className="rounded-full absolute p-1 -right-2 bottom-0">
            <Image
              priority={true}
              alt=""
              src={loaderLogo}
              width={20}
              height={20}
              className="border rounded border-gray-2"
              objectFit="contain"
            />
          </span>
        )}
      </div>
      <div className="w-full pl-3">
        <div className="flex justify-between">
          <span className="text-black text-base">
            {firstName}
            {/* {`${opposite?.first_name ? opposite?.first_name : ""} `} */}
            <span className="hidden sm:inline">{` ${
              // opposite?.last_name ? opposite?.last_name : ""
              lastName
            }`}</span>
          </span>
          <span className="text-base text-gray hidden sm:inline">
            {messageDateTime}
          </span>
        </div>
        <div className="sm:flex justify-between hidden ">
          <span className="text-gray text-base block">
            {messageType === "Media"
              ? "Sent a File"
              : message && message.length > 25
              ? message.substring(0, 25).concat("...")
              : message
              ? message
              : "no message available"}
          </span>
          {/* <span className="rounded-lg bg-red px-2 py-0 text-white">3</span> */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
