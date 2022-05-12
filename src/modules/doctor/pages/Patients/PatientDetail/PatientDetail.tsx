import React, { useEffect, useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import {
  Table,
  Tag,
  Modal,
  Avatar,
  Upload,
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Tabs,
} from "antd";
import {
  PlusOutlined,
  EyeFilled,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import yourImage from "../../../../../../public/assets/images/your_photo.png";
import {
  useCountriesQuery,
  useGetCitiesByStateQuery,
  useGetStatesByCountryQuery,
} from "../../../../../generated/graphql";
import dayjs from "dayjs";
// import { AddPhysicianForm } from "../../../components/AddPhysicianForm/AddPhysicianForm";
import { QuestionnaireForm } from "../../../../../common/components/Questionnary/Questionnary";
import PhysicianProfile from "./PatientDetailTabs/PatientProfile";
import EmailNotification from "../../../../patient/pages/EmailNotification/EmailNotification";
import AppointmentInfo from "common/components/Appointments/AppointmentInfo";
import PatientProfileForm from "./PatientDetailTabs/PatientProfileForm";

type props = {
  validateForm?: (value: any) => void;
  onFinishPersonalInfo?: (value: any) => void;
  onFinish?: (value: any) => void;
};
function PatientDetail() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [image, setImage] = useState("");

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
              <PatientProfileForm/>
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
export default PatientDetail;
