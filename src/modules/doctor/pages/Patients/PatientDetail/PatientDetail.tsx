import React, { useState, useRef } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { Tabs, notification } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  useUpdatePatientHealthHistoryMutation,
  usePatientHealthHistoryQuery,
  useGetAllTransactionsQuery,
  useGetUserQuery,
  User,
} from "generated/graphql";
import AppointmentHistory from "../AppointmentHistory/AppointmentHistory";
import PatientProfileFormTab from "./PatientDetailTabs/PatientProfileFormTab";
import QuestionnaireFormTab from "./QuestionnaireFormTab";
import AppointmentHistoryTab from "./PatientDetailTabs/AppointmentHistoryTab";
// import NotesTab from "./NotesTab";
import NotesTab from "common/components/NotesTab/NotesTab";
import { getUserData } from "./../../../../../../src/common/utils/userData";
import { useRouter } from "next/router";

type props = {
  validateForm?: (value: any) => void;
  onFinishPersonalInfo?: (value: any) => void;
  onFinish?: (value: any) => void;
};
function PatientDetail() {
  const form: any = useRef();

  const { query } = useRouter();

  const { TabPane } = Tabs;
  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  const [{ data: userData }] = useGetUserQuery({
    variables: { input: Number(query?.id) },
  });

  // Get patient Health History
  const [{ data }] = usePatientHealthHistoryQuery({
    variables: { input: id as number },
  });
  //GET ALL TRANSACTIONS
  const [{ data: allTransactions }] = useGetAllTransactionsQuery();
  const { transactions } = allTransactions || {};

  // UPDATE PATIENT HEALTH HISTORY

  const [result, updatePatientHealthHistory] =
    useUpdatePatientHealthHistoryMutation();

  const { error, fetching } = result;

  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    const healthQuesJson = JSON.stringify(quesPayload);
    try {
      await updatePatientHealthHistory({
        input: {
          history: healthQuesJson,
          user_id: id as number,
        },
      });
      {
        result?.data?.updatePatientHealthHistory &&
          notification.success({
            message: "Successfully Updated",
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AppLayout>
      <div className="w-full">
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
            <PatientProfileFormTab
              userDetail={userData?.user as User}
              loggedinDoctorDetails={user}
            />
          </TabPane>

          <TabPane
            tab={
              <span>
                <UnorderedListOutlined />
                Health Questionnaire
              </span>
            }
            key="2"
          >
            <QuestionnaireFormTab />
          </TabPane>

          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Appointments History
              </span>
            }
            key="3"
          >
            <AppointmentHistoryTab />
          </TabPane>
          {/* <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Notes
              </span>
            }
            key="4"
          >
            <NotesTab />
          </TabPane> */}
        </Tabs>
      </div>
    </AppLayout>
  );
}
export default PatientDetail;
