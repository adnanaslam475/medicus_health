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
} from "generated/graphql";
import { QuestionnaireForm } from "../../../../../common/components/Questionnary/Questionnary";
import PatientProfileForm from "./PatientDetailTabs/PatientProfileForm";
import { getUserData } from "common/utils/userData";
import AppointmentHistory from "../../Patients/AppointmentHistory/AppointmentHistory";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";

type props = {
  validateForm?: (value: any) => void;
  onFinishPersonalInfo?: (value: any) => void;
  onFinish?: (value: any) => void;
};
function PatientDetail() {
  const form: any = useRef();

  const { TabPane } = Tabs;
  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

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
            <PatientProfileForm />
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
            <div className="max-w-[800px]">
              <CardWithProfileImageInfo name="usama" serviceName="consultation">
                {
                  <QuestionnaireForm
                    ref={form}
                    data={data?.patientHealthHistory.history}
                    onFinishSuccess={onFinishHealthQuestionnarySuccess}
                  />
                }
              </CardWithProfileImageInfo>
            </div>
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
            <AppointmentHistory />
          </TabPane>
        </Tabs>
      </div>
    </AppLayout>
  );
}
export default PatientDetail;
