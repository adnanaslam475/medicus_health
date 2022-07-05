import React from "react";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { Appointment, User } from "generated/graphql";
import { Spin } from "antd";

type Props = {
  appointment?: Appointment | undefined;
  user?: User;
  questionnaire?: Appointment | undefined;
  disable?: boolean;
  loading?: boolean;
};

function AdminQuestionnaireFormTab({
  questionnaire,
  appointment,
  user,
  disable,
  loading,
}: Props) {
  const firstName = appointment?.patient?.first_name || user?.first_name;
  const lastName = appointment?.patient?.last_name || user?.last_name;
  const serviceName = appointment?.serviceType?.name || user?.email;
  const profilePicture =
    user?.adminProfilePicture?.profile_picture ||
    user?.doctorProfile?.profile_image ||
    user?.patientProfile?.profileImage ||
    appointment?.patient?.patientProfile?.profileImage;
  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <div>
      <CardWithProfileImageInfo
        name={`${firstName} ${lastName}`}
        serviceName={serviceName}
        imageUrl={profilePicture}
      >
        <PhysicianQuestionnaire
          appointmentHealthHistory={
            appointment?.appointmentHealthHistory?.history || questionnaire
          }
          disable
        />
      </CardWithProfileImageInfo>
    </div>
  );
}

export default AdminQuestionnaireFormTab;
