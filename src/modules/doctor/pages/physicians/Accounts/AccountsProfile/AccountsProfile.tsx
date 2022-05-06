import { ViewProfile } from "common/components/ViewProfile/ViewProfile";
import { getUserData } from "common/utils/userData";
import {
  useCreateDoctorScheduleMutation,
  useRemoveDoctorScheduleMutation,
  useScheduleQuery,
} from "generated/graphql";
import React, { useEffect, useState } from "react";
import EditProfile from "../EditProfile/EditProfile";
import { RangeValue } from "rc-picker/lib/interface";

function AccountsProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [addScheduleDay, setAddScheduleDay] = useState<number | string>(
    "Select Day"
  );
  const [addScheduleTime, setAddScheduleTime] = useState<{
    time: RangeValue<moment.Moment> | null;
    timeString: string[];
  }>({ timeString: [], time: null });
  const [deleteScheduleId, setDeleteScheduleId] = useState("");

  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  const [doctorSchedules, executeDoctorSchedules] = useScheduleQuery({
    variables: { doctorId: Number(id) },
  });
  const schedules = doctorSchedules?.data?.doctorSchedules;

  const [createDoctorScheduleResponse, executeCreateDoctorScheduleMutation] =
    useCreateDoctorScheduleMutation();
  const { fetching } = createDoctorScheduleResponse;
  const [, executeRemoveDoctorScheduleMutation] =
    useRemoveDoctorScheduleMutation();

  async function onAddClick() {
    if (isEdit && addScheduleDay && addScheduleTime?.timeString?.length) {
      const variable = {
        doctorId: Number(id),
        day: Number(addScheduleDay),
        startTime: addScheduleTime?.timeString[0],
        endTime: addScheduleTime?.timeString[1],
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

  return (
    <div>
      {isEdit ? (
        <EditProfile
          setIsEdit={setIsEdit}
          schedules={schedules}
          setDeleteScheduleId={setDeleteScheduleId}
          setAddScheduleDay={setAddScheduleDay}
          addScheduleDay={String(addScheduleDay)}
          setAddScheduleTime={setAddScheduleTime}
          addScheduleTime={addScheduleTime}
          onAddClick={onAddClick}
          loading={fetching}
        />
      ) : (
        <ViewProfile
          setIsEdit={setIsEdit}
          showLoginInfo
          schedules={schedules}
        />
      )}
    </div>
  );
}

export default AccountsProfile;
