/* eslint-disable react/jsx-key */
import React from "react";
import { Tabs } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import AppLayout from "../../../../common/components/AppLayout/AppLayout";
import EmailNotification from "../EmailNotification/EmailNotification";

const { TabPane } = Tabs;

function ProfileDetailOld() {
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
              {/* <Profile /> */}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <BellOutlined />
                  Email notifications
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

export default ProfileDetailOld;
