import React, { useState, useRef, useEffect } from "react";
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
  const [activeTab, setActiveTab] = React.useState<string>("");


  const { query } = useRouter();

  const { TabPane } = Tabs;
  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  const [{ data: userData ,fetching:userDatatFetching}] = useGetUserQuery({
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
        <Tabs
          type="card"
          defaultActiveKey="1"
          activeKey={activeTab || "1"}
          onChange={onChangeTabHandler}
        >
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
                Health questionnaire
              </span>
            }
            key="2"
          >
            <QuestionnaireFormTab userDetail={userData?.user as User} fetching={userDatatFetching}/>
          </TabPane>

          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Appointments history
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
