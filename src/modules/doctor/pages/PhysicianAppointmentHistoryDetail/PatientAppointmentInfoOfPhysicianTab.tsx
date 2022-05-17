
import {
  Appointment,
  useDoctorAppointmentDetailAppointmentInfoQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import DoctorAppointmentInfo from "common/components/DoctorAppointmentInfo/DoctorAppointmentInfo";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";


type Props = {};

function PatientAppointmentInfoOfPhysicianTab({}: Props) {
  const { query } = useRouter();

  const [{ data }] = useDoctorAppointmentDetailAppointmentInfoQuery({
    variables: {
      id: Number(query.appointmentId),
    },
    pause: !query.appointmentId,
  });
  const { appointment } = data || {};
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

export default PatientAppointmentInfoOfPhysicianTab;
