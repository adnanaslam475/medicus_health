/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import AppLayout from "../../../../common/components/AppLayout/AppLayout";
import Container from "../../../../common/components/Container/Container";
import { Profile } from "../../components/Profile/Profile";
import EmailNotification from "../EmailNotification/EmailNotification";
import { ProfileIcon } from "../../../../common/components/CustomIcon";
import {
  DoctorProfile,
  useCreateDocScheduleMutation,
  useDoctorProfileQuery,
  useRemoveDoctorScheduleMutation,
  useScheduleQuery,
} from "../../../../generated/graphql";
import { ViewProfile } from "common/components/ViewProfile/ViewProfile";

const { TabPane } = Tabs;

function ProfileDetail() {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState("");
  const [addScheduleDay, setAddScheduleDay] = useState("");
  const [addScheduleClick, setAddScheduleClick] = useState(false);
  const [addScheduleTime, setAddScheduleTime] = useState("");

  const editData = () => {
    setIsEdit(!isEdit);
  };
  //   GET ID FROM URL
  const { query } = useRouter();
  const docId = query?.id;

  const [{ data }] = useDoctorProfileQuery({
    variables: { doctor_id: Number(docId) },
  });

  const { doctorProfile } = data || {};

  const [doctorSchedules, executeDoctorSchedules] = useScheduleQuery({
    variables: { doctorId: Number(docId) },
  });
  const schedules = doctorSchedules?.data?.doctorSchedules;

  useEffect(() => {
    executeDoctorSchedules({ requestPolicy: "network-only" });
  }, [addScheduleClick]);

  const [, executeCreateDoctorScheduleMutation] =
    useCreateDocScheduleMutation();
  const [, executeRemoveDoctorScheduleMutation] =
    useRemoveDoctorScheduleMutation();

  useEffect(() => {
    if (isEdit && addScheduleDay && addScheduleTime) {
      const variable = {
        doctorId: Number(docId),
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
  // useEffect(() => {

  // }, []);
  return (
    <AppLayout>
      <div className="w-full">
        <div className="w-full py-5">
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <UserOutlined className="" />
                  Profile
                </span>
              }
              key="1"
            >
              {isEdit ? (
                <Profile
                  doctorId={query?.id}
                  doctorData={doctorProfile}
                  edit={editData}
                  setIsEdit={setIsEdit}
                  schedules={schedules}
                  setDeleteScheduleId={setDeleteScheduleId}
                  setAddScheduleDay={setAddScheduleDay}
                  setAddScheduleTime={setAddScheduleTime}
                  setAddScheduleClick={setAddScheduleClick}
                />
              ) : (
                <ViewProfile
                  doctorId={query?.id}
                  doctorData={doctorProfile}
                  setIsEdit={setIsEdit}
                  loginInfo={false}
                  schedules={schedules}
                />
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <BellOutlined />
                  Email Notifications
                </span>
              }
              key="2"
            >
              <EmailNotification />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}

export default ProfileDetail;
