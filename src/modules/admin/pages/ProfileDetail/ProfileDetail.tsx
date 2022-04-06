/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import AppLayout from "../../../../common/components/AppLayout/AppLayout";
import Container from "../../../../common/components/Container/Container";
import Profile from '../../components/profile/Profile'

const { TabPane } = Tabs;

function ProfileDetail() {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="w-full py-5">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Profile" key="1">
              <Profile/>
            </TabPane>
            <TabPane tab="Email Notifications" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}

export default ProfileDetail;
