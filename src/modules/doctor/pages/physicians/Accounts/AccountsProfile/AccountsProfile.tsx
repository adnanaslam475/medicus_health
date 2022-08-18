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
      const AMPM = addScheduleTime?.timeString[0]?.split(":")?.[1]?.split(" ")[1]
      const startTime = UTCPrettierTime(
        addScheduleTime?.timeString[0]
      );
      const endTime = UTCPrettierTime(
        addScheduleTime?.timeString[1]
      );
      console.log(addScheduleTime?.timeString, "timestring")
      // const hour = Number(
      //   date.time12HrConvert(addScheduleTime?.timeString[0])?.split(":")?.[0]
      // );
      // const minute = Number(
      //   date.time12HrConvert(addScheduleTime?.timeString[0])?.split(":")?.[1]
      // );
      // const formatedTime = dayjs
      //   .tz(dayjs(), timeZone)
      //   .set("hours", hour)
      //   .set("minute", minute)
      //   .toISOString()?.split("T")[1]?.slice(0,5)
      // const removedSeconds = formatWithT?.split()
      console.log(
        "first",
        startTime,endTime
      );

      // const patientTime = dayjs(`${dayjs().format("YYYY-MM-DD")}T${startTime}:00.000Z`).tz("Asia/Karachi").format("HH:mm")
      // console.log("my patient Time",patientTime, `${dayjs().format("YYYY-MM-DD")}T${startTime}:00.000Z`)
      // console.log(
      //   "hello world",dayjs().format("MM/DD/YYYY hh:mmA"),
      //   dayjs(
      //     `${dayjs().format("MM/DD/YYYY")} ${addScheduleTime?.timeString[0]}`
      //   )
      //     .tz(timeZone)
      //     .format("hh:mm A")
      // );
      // const variable = {
      //   doctorId: Number(id),
      //   day: Number(addScheduleDay === 7 ? 0 : addScheduleDay),
      //   startTime: addScheduleTime?.timeString[0],
      //   endTime: addScheduleTime?.timeString[1],
      // };

      // await executeCreateDoctorScheduleMutation(variable);
      // await executeDoctorSchedules({ requestPolicy: "network-only" });
      // setAddScheduleDay("Select Day");
      // setAddScheduleTime({ timeString: [], time: null });
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
