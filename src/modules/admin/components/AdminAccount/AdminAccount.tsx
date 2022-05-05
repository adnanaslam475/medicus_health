/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import AppLayout from "../../../../common/components/AppLayout/AppLayout";
import Container from "../../../../common/components/Container/Container";
import { ProfileIcon } from "../../../../common/components/CustomIcon";
import {
  DoctorProfile,
  useDoctorProfileQuery,
  useScheduleQuery,
} from "../../../../generated/graphql";
import EmailNotification from "../../pages/EmailNotification/EmailNotification";
import { ViewProfile } from "../../../../common/components/ViewProfile/ViewProfile";
import { Profile } from "../Profile/Profile";

const { TabPane } = Tabs;

function AdminAccount() {
  const [isEdit, setIsEdit] = useState(false);
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

  const [doctorSchedules] = useScheduleQuery({
    variables: { doctorId: Number(docId) },
  });
  const schedules = doctorSchedules?.data?.doctorSchedules;

  return (
    <AppLayout>
      <div className="w-full">
        <div className="w-full py-5">
          {/* <Tabs defaultActiveKey="1">
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
          </Tabs> */}
          <Tabs defaultActiveKey="1" type="card">
            {/* <Tabs.TabPane
              className="w-full"
              tab={<span className="font-Circular font-medium">Profile</span>}
              key="1"
            >
              <AdminProfile />
            </Tabs.TabPane> */}
            <TabPane
              className="w-full"
              tab={
                <span className="font-Circular font-medium">
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
                />
              ) : (
                <ViewProfile
                  // doctorId={query?.id}
                  doctorData={doctorProfile}
                  setIsEdit={setIsEdit}
                  // loginInfo={false}
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

export default AdminAccount;
