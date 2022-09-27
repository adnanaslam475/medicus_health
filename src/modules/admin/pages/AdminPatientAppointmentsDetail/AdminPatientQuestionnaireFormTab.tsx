import React from "react";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { Appointment } from "generated/graphql";
import { Spin } from "antd";

type Props = {
  appointment: Appointment | undefined;
  loading?: boolean;
};

function AdminPatientQuestionnaireFormTab({ appointment, loading }: Props) {
  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <div>
      <CardWithProfileImageInfo
        name={`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}
        serviceName={appointment?.serviceType?.name}
        imageUrl={appointment?.patient?.patientProfile?.profileImage || ""}
      >
        <PhysicianQuestionnaire
          appointmentHealthHistory={
            appointment?.appointmentHealthHistory?.history
          }
        />
      </CardWithProfileImageInfo>
    </div>
  );
}

export default AdminPatientQuestionnaireFormTab;
