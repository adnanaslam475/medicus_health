import React, { useEffect, useState } from "react";
import {
  ChatChannels,
  useGetUnreadMessageCountQuery,
  useMarkMessagesAsReadMutationMutation,
} from "generated/graphql";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import { useMessageContext } from "../MessageDetail/MessageContext";
import profile from "./../../../../../../public/assets/images/doc-pic.png";
import nullicon from "./../../../../../../public/assets/images/nullicon.png";
import loaderLogo from "./../../../../../../public/assets/images/loaderLogo.png";
import { getUserData } from "common/utils/userData";
import { date, messageUtils } from "common/utils";
import MDNextImage from "common/components/MDNextImage/MDNextImage";
import { Badge } from "antd";

type Props = {
  thread: ChatChannels;
  setRemoveCurrentChat?: any;
  updateLayout?: () => void;
};

function UserProfile({ thread, setRemoveCurrentChat, updateLayout }: Props) {
  const { setCurrentChannel, loginToRtm, onJoinChannel, messageInfo } =
    useMessageContext();
  const { user } = getUserData();
  const { timeZone } = user || {};
  const { timeZone: userTimeZone } = timeZone || {};

  const { query } = useRouter();

  //get channel dateTime
  const { lastMessage, unReadMessagesCount } = thread || {};

  //get last message
  const { message, messageType, createdAt } = lastMessage || {};
  const { channelMessagesCount } = unReadMessagesCount || {};

  // Set User time zone
  date?.setTimeZone(userTimeZone ? String(userTimeZone) : "America/New_York");
  const messageDateTime = date?.getDateAndTimeWRTTZ(
    createdAt,
    "MM/DD/YY,h:mma"
  );

  async function onJoinChat() {
    // localStorage.setItem("id", JSON.stringify(query));
    setRemoveCurrentChat(false);
    setCurrentChannel(thread);
    onJoinChannel?.(thread.channelName);
    window.history.replaceState(null, "", Router.pathname);
    updateLayout?.();
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
      className={`flex px-1 sm:px-5 py-4 items-center border border-gray-4 cursor-pointer hover:bg-gray-4 relative`}
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
      <div className="w-full pl-2 sm:pl-3">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            {/* <span className="text-black text-xs sm:text-base max-w-[50px] sm:max-w-[200px] break-all font-semibold sm:font-normal"> */}
            <span className="text-black text-sm sm:text-base sm:max-w-[200px] break-all font-semibold sm:font-normal">
              {firstName}
              {/* {`${opposite?.first_name ? opposite?.first_name : ""} `} */}
              {/* <span className="hidden sm:inline">{` ${ */}
              <span className="sm:inline">
                {` ${
                  // opposite?.last_name ? opposite?.last_name : ""
                  lastName
                }`}{" "}
              </span>
            </span>
            <Badge
              count={channelMessagesCount}
              className="new-msg-count ml-2 mb-3 w-4"
            />
          </div>
          {/* <span className=" text-gray hidden sm:inline text-xs text-bold font-medium pt-1"> */}
          <span className=" text-gray sm:inline text-xs text-bold font-medium pt-1">
            {messageDateTime}
          </span>
        </div>
        {/* <div className="sm:flex justify-between hidden "> */}
        <div className="sm:flex justify-between">
          <span className="text-gray text-base block">
            {messageType === "Media"
              ? "Sent a File"
              : message && message.length > 25
              ? message.substring(0, 25).concat("...")
              : message
              ? message
              : "no message available"}
          </span>
          {/* <Badge count={channelMessagesCount} className="new-msg-count" /> */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
