import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { useDoctorAppointmentDetailQuery, usePhysicianAppointmentsHistoryQuery } from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";

function PhysicianQuestionnaireFormTab() {
  const { query } = useRouter();

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchPatient: String(query?.id), status: "Completed" },
    },
  });
  const { appointments } = data || {};
  const appointment = appointments && appointments[0];
  return (
    <div className="">
      <CardWithProfileImageInfo name="usama" serviceName="consultation">
        <PhysicianQuestionnaire
          appointmentHealthHistory={
            appointment?.appointmentHealthHistory?.history
          }
        />
      </CardWithProfileImageInfo>
    </div>
  );
}

export default PhysicianQuestionnaireFormTab;
