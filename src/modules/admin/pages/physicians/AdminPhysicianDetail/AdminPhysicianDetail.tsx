import React, { useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { Form, Tabs } from "antd";
import {
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import EmailNotification from "../../EmailNotification/EmailNotification";
import PhysicianProfile from "./AdminDetailTabs/PhysicianProfile";

type props = {
  validateForm?: (value: any) => void;
  onFinishPersonalInfo?: (value: any) => void;
  onFinish?: (value: any) => void;
};
function AdminPhysicianDetail() {
  const props = {
    onChange({ file, fileList }: any) {
      if (file.status !== "uploading") {
      }
    },
  };

  const [form] = Form.useForm();

  const { TabPane } = Tabs;

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Edit Physician</h2>
        </div>
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
                <PhysicianProfile />
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <BellOutlined />
                    Questionanaire
                  </span>
                }
                key="2"
              >
                {/* <QuestionnaireForm
                  ref={form}
                  data={data?.patientHealthHistory.history}
                  onFinishSuccess={onFinishHealthQuestionnarySuccess}
                /> */}

                {/* <div className="flex items-center justify-end">
                  <Button
                    loading={fetching}
                    disabled={fetching}
                    className="ant-btn ant-btn-primary ant-btn mb-0"
                    type="primary"
                    onClick={() => form?.current?.submit()}
                  >
                    Update
                  </Button>
                </div> */}
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <BellOutlined />
                    Earnings
                  </span>
                }
                key="3"
              >
                <EmailNotification />
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <BellOutlined />
                    Staff
                  </span>
                }
                key="4"
              >
                <EmailNotification />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPhysicianDetail;
