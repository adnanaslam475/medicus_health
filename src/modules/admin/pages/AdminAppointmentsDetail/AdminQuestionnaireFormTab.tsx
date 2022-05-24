import React from "react";
import { useRouter } from "next/router";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { usePhysicianAppointmentsHistoryQuery } from "generated/graphql";

type Props = {
  data: object | undefined;
};
function AdminQuestionnaireFormTab({ data }: Props) {
  // const { appointments } = data || {};
  // const appointment = appointments && appointments[0];

  return (
    <div className="">
      {/* <CardWithProfileImageInfo
        name={`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}
        serviceName={appointment?.serviceType?.name}
      >
        <PhysicianQuestionnaire
          appointmentHealthHistory={
            appointment?.appointmentHealthHistory?.history
          }
        />
      </CardWithProfileImageInfo> */}
    </div>
  );
}

export default AdminQuestionnaireFormTab;
