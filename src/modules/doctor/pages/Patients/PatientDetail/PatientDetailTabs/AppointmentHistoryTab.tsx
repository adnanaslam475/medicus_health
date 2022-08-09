import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { User } from "generated/graphql";
import React from "react";
import AppointmentHistory from "../../AppointmentHistory/AppointmentHistory";

type Props = {
  userDetail?: User;
};

function AppointmentHistoryTab({ userDetail }: Props) {
  const { first_name, email } = userDetail || {};
  const profilePicture = userDetail?.patientProfile?.profileImage;

  return (
    <CardWithProfileImageInfo
      name={first_name}
      serviceName={email}
      imageUrl={profilePicture}
    >
      <AppointmentHistory />
    </CardWithProfileImageInfo>
  );
}

export default AppointmentHistoryTab;
