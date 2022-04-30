import React, { useEffect, useState } from "react";
import { ViewProfile } from "../../../../../../common/components/ViewProfile/ViewProfile";
import { getUserData } from "../../../../../../common/utils/userData";
import {
  useCreateDoctorScheduleMutation,
  useRemoveDoctorScheduleMutation,
  useScheduleQuery,
} from "../../../../../../generated/graphql";
import EditProfile from "../EditProfile/EditProfile";

function AccountsProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState("");
  const [addScheduleDay, setAddScheduleDay] = useState("");
  const [addScheduleClick, setAddScheduleClick] = useState(false);
  const [addScheduleTime, setAddScheduleTime] = useState([""]);

  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  const [doctorSchedules, executeDoctorSchedules] = useScheduleQuery({
    variables: { doctorId: Number(id) },
  });
  const schedules = doctorSchedules?.data?.doctorSchedules;

  useEffect(() => {
    if (isEdit && addScheduleDay && addScheduleTime) {
      executeDoctorSchedules({ requestPolicy: "network-only" });
    }
  }, [addScheduleClick]);

  const [, executeCreateDoctorScheduleMutation] =
    useCreateDoctorScheduleMutation();

  const [, executeRemoveDoctorScheduleMutation] =
    useRemoveDoctorScheduleMutation();

  useEffect(() => {
    if (isEdit && addScheduleDay && addScheduleTime) {
      const variable = {
        doctorId: Number(id),
        day: Number(addScheduleDay),
        startTime: addScheduleTime[0],
        endTime: addScheduleTime[1],
      };
      executeCreateDoctorScheduleMutation(variable);
    }
  }, [addScheduleClick]);
  useEffect(() => {
    if (deleteScheduleId) {
      executeRemoveDoctorScheduleMutation({ id: Number(deleteScheduleId) });
    }
  }, [deleteScheduleId]);

  return (
    <div>
      {isEdit ? (
        <EditProfile
          //   doctorId={query?.id}
          //   doctorData={doctorProfile}
          //   edit={editData}
          setDeleteScheduleId={setDeleteScheduleId}
          setAddScheduleDay={setAddScheduleDay}
          setAddScheduleTime={setAddScheduleTime}
          setAddScheduleClick={setAddScheduleClick}
          schedules={schedules}
          setIsEdit={setIsEdit}
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
