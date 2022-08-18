import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ViewProfile } from "common/components/ViewProfile/ViewProfile";
import { getUserData } from "common/utils/userData";
import {
  DoctorProfile,
  useCreateDoctorScheduleMutation,
  useDoctorProfileQuery,
  useGetUserQuery,
  useRemoveDoctorScheduleMutation,
  useScheduleQuery,
} from "../../../../../../generated/graphql";
import { RangeValue } from "rc-picker/lib/interface";
import EditProfile from "../EditProfile/EditProfile";
import dayjs from "dayjs";
import { date } from "common/utils";
import { UTCPrettierTime } from "common/utils/date";

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
  const [addScheduleTime, setAddScheduleTime] = useState<{
    time: RangeValue<moment.Moment> | null;
    timeString: string[];
  }>({ timeString: [], time: null });
  const [deleteScheduleId, setDeleteScheduleId] = useState("");
  const [profileUpdated, setProfileUpdated] = useState();

  // GET USER ID
  const { user } = getUserData();
  const role = user?.role;
  const id = role == "Admin" ? Number(adminId) : user?.id;

  const [doctorSchedules, executeDoctorSchedules] = useScheduleQuery({
    variables: { doctorId: id as number },
  });
  const schedules = doctorSchedules?.data?.doctorSchedules;

  const [createDoctorScheduleResponse, executeCreateDoctorScheduleMutation] =
    useCreateDoctorScheduleMutation();
  const { fetching } = createDoctorScheduleResponse;
  const [
    { fetching: deleteScheduleFetching },
    executeRemoveDoctorScheduleMutation,
  ] = useRemoveDoctorScheduleMutation();
  const timeZone =
    typeof window !== "undefined" &&
    localStorage?.getItem("timeZone") !== "undefined" &&
    JSON.parse(
      String(localStorage?.getItem("timeZone")) || "'America/Cambridge_Bay'"
    );

  async function onAddClick() {
    if (isEdit && addScheduleDay && addScheduleTime?.timeString?.length && id) {
      const startTime = UTCPrettierTime(
        addScheduleTime?.timeString[0]
      );
      const endTime = UTCPrettierTime(
        addScheduleTime?.timeString[1]
      );
      const variable = {
        doctorId: Number(id),
        day: Number(addScheduleDay === 7 ? 0 : addScheduleDay),
        startTime: startTime,
        endTime: endTime,
      };

      await executeCreateDoctorScheduleMutation(variable);
      await executeDoctorSchedules({ requestPolicy: "network-only" });
      setAddScheduleDay("Select Day");
      setAddScheduleTime({ timeString: [], time: null });
    }
  }
  useEffect(() => {
    if (deleteScheduleId) {
      executeRemoveDoctorScheduleMutation({ id: Number(deleteScheduleId) });
    }
  }, [deleteScheduleId]);

  const [{ data, fetching: doctorDataLoading }, executeUseDoctorProfileQuery] =
    useDoctorProfileQuery({
      variables: { doctor_id: id as number },
      pause: !id || addScheduleDay === "Select Day" || !!deleteScheduleId,
    });
  const { doctorProfile } = data || {};
  useEffect(() => {
    executeUseDoctorProfileQuery({ requestPolicy: "network-only" });
  }, [profileUpdated]);
  return (
    <div>
      {isEdit ? (
        <EditProfile
          setIsEdit={setIsEdit}
          schedules={schedules}
          setDeleteScheduleId={setDeleteScheduleId}
          deleteScheduleFetching={deleteScheduleFetching}
          setAddScheduleDay={setAddScheduleDay}
          addScheduleDay={String(addScheduleDay)}
          setAddScheduleTime={setAddScheduleTime}
          doctorId={String(id)}
          doctorData={doctorProfile}
          edit={editData}
          addScheduleTime={addScheduleTime}
          onAddClick={onAddClick}
          loading={fetching}
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
