/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { Tabs } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useAdminUserQuery } from "generated/graphql";
import EmailNotification from "../../pages/EmailNotification/EmailNotification";
import { Profile } from "../Profile/Profile";
import { ViewProfile } from "../Profile/ViewProfile";
import { getUserData } from "common/utils/userData";

const { TabPane } = Tabs;

function AdminAccount() {
  const [isEdit, setIsEdit] = useState(false);
  const editData = () => {
    setIsEdit(!isEdit);
  };

  const { user } = getUserData();
  const { id } = user || {};

  const [{data,fetching}] = useAdminUserQuery({
    variables: { id: Number(id) },
  });

  const { adminUser } = data || {};
  return (
    <AppLayout>
      <div className="w-full">
        <div className="w-full py-5">
          <Tabs defaultActiveKey="1" type="card">
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
                  doctorData={adminUser}
                  edit={editData}
                  setIsEdit={setIsEdit}
                />
              ) : (
                <ViewProfile doctorData={adminUser} setIsEdit={setIsEdit} />
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
