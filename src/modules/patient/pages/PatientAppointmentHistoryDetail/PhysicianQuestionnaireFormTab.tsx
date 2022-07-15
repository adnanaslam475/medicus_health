import { Spin } from "antd";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import {
  useDoctorAppointmentDetailQuery,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";

function PhysicianQuestionnaireFormTab() {
  const { query } = useRouter();

  const [{ data, fetching }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchString: String(query?.id), status: "Completed" },
    },
  });
  const { appointments } = data || {};
  const appointment = appointments?.items && appointments.items[0];

  return fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
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

export default PhysicianQuestionnaireFormTab;
