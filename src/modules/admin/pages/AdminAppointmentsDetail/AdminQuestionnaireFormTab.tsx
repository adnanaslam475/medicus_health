import React from "react";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { Appointment } from "generated/graphql";

type Props = {
  appointment: Appointment | undefined;
};

function AdminQuestionnaireFormTab({ appointment }: Props) {
  return (
    <div>
      <CardWithProfileImageInfo
        name={`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}
        serviceName={appointment?.serviceType?.name}
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

export default AdminQuestionnaireFormTab;
