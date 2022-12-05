import { Skeleton } from "antd";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { useDoctorProfileQuery, useGetUserQuery } from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import AdminPhysicianPatientAppointment from "../AdminPhysicianPatientAppointment/AdminPhysicianPatientAppointment";
function AdminPhysicianPatientAppointmentTab() {
  const { query } = useRouter();

  const [{ data, fetching: loading }] = useDoctorProfileQuery({
    variables: { doctor_id: Number(query?.id) as number },
    pause: !Number(query?.id),
  });
  const { doctorProfile } = data || {};

  const [{ data: userData }] = useGetUserQuery({
    variables: { input: Number(query?.id) },
    pause: !query?.id,
  });
  const { first_name, last_name, email: userEmail } = userData?.user || {};

  const userName = `${doctorProfile?.user?.first_name || first_name} ${
    doctorProfile?.user?.last_name || last_name
  }`;
  const profilePicture = doctorProfile?.profile_image;
  const email = doctorProfile?.user?.email || userEmail;

  return (
    <Skeleton loading={loading || !first_name} paragraph={{ rows: 1 }} active>
      <CardWithProfileImageInfo
        name={userName}
        serviceName={String(email)}
        imageUrl={profilePicture}
      >
        <AdminPhysicianPatientAppointment />
      </CardWithProfileImageInfo>
    </Skeleton>
  );
}

export default AdminPhysicianPatientAppointmentTab;
