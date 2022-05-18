import {
  Appointment,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import DoctorAppointmentInfo from "common/components/DoctorAppointmentInfo/DoctorAppointmentInfo";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";

function PatientAppointmentInfoOfPhysicianTab() {
  const { query } = useRouter();

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchPatient: String(query?.id), status: "Completed" },
    },
  });
  const { appointments } = data || {};
  const appointment = appointments && appointments[0];

  return (
    <CardWithProfileImageInfo
      name={`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}
      serviceName={appointment?.serviceType?.name}
    >
      <DoctorAppointmentInfo data={appointment as Appointment} />
    </CardWithProfileImageInfo>
  );
}

export default PatientAppointmentInfoOfPhysicianTab;
