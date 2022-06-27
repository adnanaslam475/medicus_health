import { ChatChannels } from "generated/graphql";

export function getOppositeParticipant(
  value: ChatChannels | undefined,
  role: string
) {
  if (!value) return undefined;
  const oppositeParticipantId =
    role === "Doctor" || role === "User" || role === "Admin"
      ? value?.patientId
      : value?.doctorId;
  const oppositeParticipant = value?.participants?.find(
    ({ participantId }) => oppositeParticipantId === participantId
  );
  const { userDetails } = oppositeParticipant || {};
  return userDetails;
}

export function getOppositeParticipantProfileImage(
  value: ChatChannels,
  role: string
) {
  if (!value) return undefined;
  const opposite = getOppositeParticipant(value, role);
  const oppositeParticipantProfileImage =
    role === "Doctor"
      ? opposite?.patientProfile?.profileImage
      : opposite?.doctorProfile?.profile_image;
  return oppositeParticipantProfileImage;
}
