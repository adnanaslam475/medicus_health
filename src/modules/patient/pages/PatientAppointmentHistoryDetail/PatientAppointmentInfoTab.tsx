import {
  Appointment,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import DoctorAppointmentInfo from "common/components/DoctorAppointmentInfo/DoctorAppointmentInfo";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";

function PatientAppointmentInfoTab() {
  const { query } = useRouter();

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { appointmentId: Number(query?.id), status: "Completed" },
    },
  });

  const { appointments } = data || {};
  const appointment = appointments && appointments[0];
  const { patient, serviceType } = appointment || {};

  return (
    <CardWithProfileImageInfo
      name={`${patient?.first_name} ${patient?.last_name}`}
      serviceName={serviceType?.name}
    >
      <DoctorAppointmentInfo data={appointment as Appointment} />
    </CardWithProfileImageInfo>
  );
}

export default PatientAppointmentInfoTab;
