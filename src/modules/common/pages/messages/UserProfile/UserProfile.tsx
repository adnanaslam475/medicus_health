import React from "react";
import { ChatChannels } from "generated/graphql";
import Image from "next/image";
import { useMessageContext } from "../MessageDetail/MessageContext";
import profile from "./../../../../../../public/assets/images/doc-pic.png";
import loaderLogo from "./../../../../../../public/assets/images/loaderLogo.png";
import { getUserData } from "common/utils/userData";

function getOppositeParticipant(value: ChatChannels, role: string) {
  const oppositeParticipantId =
    role === "Doctor" ? value.patientId : value.doctorId;

  const oppositeParticipant = value.participants?.find(
    ({ participantId }) => oppositeParticipantId === participantId
  );
  const { userDetails } = oppositeParticipant || {};
  return userDetails;
}

type Props = {
  thread: ChatChannels;
};
function UserProfile({ thread }: Props) {
  const { messageInfo, onLoginJoinChannel, setCurrentChannel } =
    useMessageContext();

  async function onJoinChat() {
    setCurrentChannel(thread);
    onLoginJoinChannel?.({ channelName: thread.channelName });
  }

  const { user } = getUserData();

  const { doctor } = thread || {};

  const abc = getOppositeParticipant(thread, user?.role as string);
  return (
    <div
      onClick={onJoinChat}
      className={`flex px-5 py-4 items-center border border-gray-4 cursor-pointer hover:bg-gray-4`}
    >
      <div className="relative">
        <Image
          alt=""
          width={70}
          height={70}
          className="rounded-full"
          src={doctor?.doctorProfile?.profile_image || profile}
        />
        <span className="rounded-full absolute p-1 -right-2 bottom-0">
          <Image
            alt=""
            src={loaderLogo}
            width={20}
            height={20}
            className="border rounded border-gray-2"
            objectFit="contain"
          />
        </span>
      </div>
      <div className="w-full pl-3">
        <div className="flex justify-between">
          <span className="text-black text-base">{`${doctor?.first_name} ${doctor?.last_name}`}</span>
          <span className="text-base text-gray">03:30 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray text-base block">
            You :what is the pro..
          </span>
          <span className="rounded-lg bg-red px-2 py-0 text-white">3</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
