import React, { useEffect } from "react";
import { ChatChannels } from "generated/graphql";
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
};
function UserProfile({ thread }: Props) {
  const { setCurrentChannel, loginToRtm, onJoinChannel } = useMessageContext();

  //get channel dateTime
  const { createdAt, lastMessage } = thread || {};

  //get last message
  const { message, messageType } = lastMessage || {};

  async function onJoinChat() {
    setCurrentChannel(thread);
    onJoinChannel?.(thread.channelName);
  }

  useEffect(() => {
    loginToRtm?.();
  }, []);

  const { user } = getUserData();
  const opposite = messageUtils.getOppositeParticipant(
    thread,
    user?.role as string
  );
  const profileImage = messageUtils.getOppositeParticipantProfileImage(
    thread,
    user?.role as string
  );
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
            {`${opposite?.first_name} `}
            <span className="hidden sm:inline">{`${opposite?.last_name}`}</span>
          </span>
          <span className="text-base text-gray hidden sm:inline">
            {date?.formathhmma(createdAt)}
          </span>
        </div>
        <div className="sm:flex justify-between hidden ">
          <span className="text-gray text-base block">
            {messageType === "Media" ? "Sent a Photo" : message}
          </span>
          {/* <span className="rounded-lg bg-red px-2 py-0 text-white">3</span> */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
