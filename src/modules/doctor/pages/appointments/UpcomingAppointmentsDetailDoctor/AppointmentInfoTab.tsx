import { Spin } from "antd";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import {
  Appointment,
  useDoctorAppointmentDetailAppointmentInfoQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import DoctorAppointmentInfo from "../../../../../common/components/DoctorAppointmentInfo/DoctorAppointmentInfo";

type Props = {};

function AppointmentInfoTab({}: Props) {
  const { query } = useRouter();

  const [{ data, fetching }] = useDoctorAppointmentDetailAppointmentInfoQuery({
    variables: {
      id: Number(query.id),
    },
    pause: !query.id,
    requestPolicy: "network-only",
  });

  const { appointment } = data || {};
  const { patient } = appointment || {};
  const { patientProfile } = patient || {};
  const loading = fetching || !query.id;
  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <CardWithProfileImageInfo
      name={`${patient?.first_name} ${patient?.last_name}`}
      serviceName=""
      imageUrl={patientProfile?.profileImage}
    >
      <DoctorAppointmentInfo data={appointment as Appointment} />
    </CardWithProfileImageInfo>
  );
}

export default AppointmentInfoTab;
