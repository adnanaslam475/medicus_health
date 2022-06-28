import { Skeleton } from "antd";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { useDoctorProfileQuery } from "generated/graphql";
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
  const userName = `${doctorProfile?.user?.first_name} ${doctorProfile?.user?.last_name}`;
  const profilePicture = doctorProfile?.profile_image;
  const specialization = doctorProfile?.specialization;

  return (
    <Skeleton
      loading={loading || !doctorProfile?.user?.first_name}
      paragraph={{ rows: 1 }}
      active
    >
      <CardWithProfileImageInfo
        name={userName}
        serviceName={String(specialization)}
        imageUrl={profilePicture}
      >
        <AdminPhysicianPatientAppointment />
      </CardWithProfileImageInfo>
    </Skeleton>
  );
}

export default AdminPhysicianPatientAppointmentTab;
