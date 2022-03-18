import React, { useState } from "react";
import {
  Layout,
  Avatar,
  Dropdown,
  Menu,
  Space,
  Tabs,
  Button,
  List,
  Typography,
  Divider,
  Result,
} from "antd";
import Router from "next/router";
import Image from "next/image";
import yourImage from "../../../../public/assets/images/your_photo.png";
import PersonalInfo from "./PersonelInfo/PersonelInfo";
// import HealthQuestionair from "./HealthQuestionair";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import HealthQuestionair from "./HealthQuestionair/HealthQuestionair";
import HealthQuestionnary, {
  QuestionnaireForm,
} from "../Questionnary/questionnary";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useCreateUserMutation } from "../../../generated/graphql";
const { TabPane } = Tabs;

const AccountTabs = () => {
  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    const user = await submitPersonalInfo();
    const healthQuesJson = JSON.stringify(quesPayload);
    try {
      await createPatientHealthHistory({
        input: {
          history: healthQuesJson,
          user_id: user?.data?.createUser.id as number,
        },
      });
      handleChange();
      setActiveKey("2");
      setNextTab(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = () => {
    // if (activeKey === "1") {
    //   setActiveKey("2");
    // } else {
    //   setActiveKey("1");
    // }
  };

  // function showConfirm() {
  //   confirm({
  //     title: "",
  //     icon: <ExclamationCircleOutlined />,
  //     content:
  //       "These are the mandatory fields for Book an Appointment you can Skip it for now and can Add/Edit later from My Profile section",
  //     onOk() {
  //       submitPersonalInfo();
  //     },
  //     onCancel() {
  //       console.log("Cancel");
  //     },
  //   });
  // }
  const onFinishHealthQuestionnaryFailed = (err: any) => {
    console.log(err, "eerrr");
  };

  const skipHealthQuestions = (e: any) => {
    // showConfirm();
  };
  const [result, createUser] = useCreateUserMutation();
  const { fetching } = result;

  return (
    <>
      <div>
        <div className="card-container profile-tabs">
          <Tabs type="card">
            <TabPane tab="Personal Information" key="1" className="">
              <PersonalInfo />
            </TabPane>
            <TabPane tab="Health Questionnaire" key="2">
              {/* <HealthQuestionair /> */}

              <div className="w-1/3">
                {/* <HealthQuestionnary
                  isUpdateMode={false}
                  onFinishSuccess={onFinishHealthQuestionnarySuccess}
                  onFinishedFailed={onFinishHealthQuestionnaryFailed}
                  handleBackChange={handleChange}
                  skipHealthQues={skipHealthQuestions}
                  isLoading={fetching}
                /> */}
                <QuestionnaireForm
                // ref={form}
                // onFinishSuccess={onFinishSuccess}
                // onFinishedFailed={onFinishedFailed}
                />
                <div className="flex items-center justify-end">
                <Button type="primary" size="large" >Update</Button>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Payment Methods" key="3">
              <PaymentMethods />
            </TabPane>
            <TabPane tab="Transaction History" key="4">
              <TransactionHistory />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AccountTabs;
