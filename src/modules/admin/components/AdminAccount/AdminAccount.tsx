/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useAdminUserQuery } from "generated/graphql";
// import EmailNotification from "../../pages/EmailNotification/EmailNotification";
import { Profile } from "../Profile/Profile";
import { ViewProfile } from "../Profile/ViewProfile";
import { getUserData } from "common/utils/userData";
import { useRouter } from "next/router";
import EmailNotificationPage from "modules/common/components/EmailNotification/EmailNotificationPage";

const { TabPane } = Tabs;

function AdminAccount() {
  const [isEdit, setIsEdit] = useState(false);
  const [activeTab, setActiveTab] = React.useState<string>("");

  const editData = () => {
    setIsEdit(!isEdit);
  };

  const { user } = getUserData();
  const { id } = user || {};

  const [{ data, fetching }] = useAdminUserQuery({
    variables: { id: Number(id) },
  });

  const { adminUser } = data || {};

  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);

  const onChangeTabHandler = (key: string) => {
    setActiveTab(key);
    history.pushState({}, "", "?activeTab=" + key);
  };
  return (
    <AppLayout>
      <div className="w-full">
        <div className="w-full py-5">
          <Tabs
            defaultActiveKey="1"
            type="card"
            activeKey={activeTab || "1"}
            onChange={onChangeTabHandler}
          >
            <TabPane
              className="w-full"
              tab={
                <span className="font-Circular font-medium improved-word-spacing flex items-center ">
                  <UserOutlined className="" />
                  <span className="-ml-1">Profile</span>
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
                <span className="flex items-center">
                  <BellOutlined />
                  <span className="-ml-1"> Email notifications</span>
                </span>
              }
              key="2"
            >
              <div className="w-full  lg:max-w-[600px]">
                <EmailNotificationPage />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}

export default AdminAccount;
