import { ChatChannels } from "generated/graphql";
import { getToken, getUserData } from "common/utils/userData";

export function getOppositeParticipant(
  value: ChatChannels | undefined,
  role: string
) {
  if (!value) return undefined;

  const { user } = getUserData();
  const loginUserId = user?.id;

  const oppositeParticipantId =
    role === "Doctor" ? value?.patientId : value?.doctorId;

  // const oppositeParticipant = value?.participants?.find(
  //   ({ participantId }) => oppositeParticipantId === participantId
  // );
  // const { userDetails } = oppositeParticipant || {};
  // return userDetails;
  return value?.receiverDetail;
}

export function getOppositeParticipantProfileImage(
  value: ChatChannels,
  role: string
) {
  if (!value) return undefined;
  const opposite = getOppositeParticipant(value, role);
  const oppositeParticipantProfileImage =
    role === "Doctor" || role === "Staff"
      ? opposite?.patientProfile?.profileImage
      : role === "User"
      ? opposite?.doctorProfile?.profile_image
      : value?.receiverDetail?.role === "Doctor"
      ? value?.receiverDetail?.doctorProfile?.profile_image
      : value?.receiverDetail?.patientProfile?.profileImage;
  return oppositeParticipantProfileImage;
}
