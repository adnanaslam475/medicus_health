import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ViewProfile } from "common/components/ViewProfile/ViewProfile";
import { getUserData } from "common/utils/userData";
import {
  useDoctorProfileQuery,
  useScheduleQuery,
} from "../../../../../../generated/graphql";
import EditProfile from "../EditProfile/EditProfile";

function AccountsProfile() {
  const editData = () => {
    setIsEdit(!isEdit);
  };
  const { query } = useRouter();

  const adminId = query?.id;

  const [isEdit, setIsEdit] = useState(false);
  const [addScheduleDay, setAddScheduleDay] = useState<number | string>(
    "Select Day"
  );
  const [deleteScheduleId, setDeleteScheduleId] = useState("");
  const [profileUpdated, setProfileUpdated] = useState();
  const [doctorProfileData, setDoctorProfileData] = React.useState<any>({});

  // GET USER ID
  const { user } = getUserData();
  const role = user?.role;
  const id = role == "Admin" ? Number(adminId) : user?.id;

  const [doctorSchedules, executeDoctorSchedules] = useScheduleQuery({
    variables: { doctorId: id as number },
  });
  const schedules = doctorSchedules?.data?.doctorSchedules;

  const [{ data, fetching: doctorDataLoading }, executeUseDoctorProfileQuery] =
    useDoctorProfileQuery({
      variables: { doctor_id: id as number },
      pause: !id || !!deleteScheduleId,
      requestPolicy: "network-only",
    });
  const { doctorProfile } = data || {};

  useEffect(() => {
    executeUseDoctorProfileQuery({ requestPolicy: "network-only" });
  }, [profileUpdated, isEdit]);
  return (
    <div>
      {isEdit ? (
        <EditProfile
          setIsEdit={setIsEdit}
          schedules={schedules}
          doctorId={String(id)}
          doctorData={doctorProfile}
          edit={editData}
          setProfileUpdated={setProfileUpdated}
        />
      ) : (
        <ViewProfile
          setIsEdit={setIsEdit}
          schedules={schedules}
          doctorId={String(id)}
          doctorData={doctorProfile}
          loading={doctorDataLoading}
        />
      )}
    </div>
  );
}

export default AccountsProfile;
