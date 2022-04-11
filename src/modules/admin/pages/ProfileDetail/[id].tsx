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
import { ProfileIcon } from "../../../../../src/common/components/CustomIcon";
import {
  DoctorProfile,
  useDoctorProfileQuery,
} from "../../../../generated/graphql";

const { TabPane } = Tabs;

function ProfileDetail() {
  //   GET ID FROM URL
  const { query } = useRouter();

  const [{ data }] = useDoctorProfileQuery({
    variables: { doctor_id: Number(query?.id) },
  });

  const { doctorProfile } = data || {};



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
              <Profile doctorId={query?.id} doctorData={doctorProfile} />
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
