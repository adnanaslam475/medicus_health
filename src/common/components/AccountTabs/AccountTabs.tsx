import React, { useState, useEffect, useRef } from "react";
import { Tabs, Button, Alert } from "antd";
import Router from "next/router";
import Image from "next/image";
import yourImage from "../../../../public/assets/images/your_photo.png";
import PersonalInfo from "./PersonelInfo/PersonelInfo";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import HealthQuestionnary, {
  QuestionnaireForm,
} from "../Questionnary/questionnary";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  useUpdatePatientHealthHistoryMutation,
  usePatientHealthHistoryQuery,
} from "../../../generated/graphql";

const { TabPane } = Tabs;

const AccountTabs = () => {
  type Props = {
    loading?: boolean;
  };

  const form: any = useRef();

  // Get patient Health History

  const [resultGet] = usePatientHealthHistoryQuery({
    variables: {
      input: 56,
    },
  });

  useEffect(() => {
    // console.log(resultGet, "resultget");
  }, [resultGet]);

  // UPDATE PATIENT HEALTH HISTORY

  const [result, updatePatientHealthHistory] =
    useUpdatePatientHealthHistoryMutation();

  const { error, fetching } = result;

  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    // const user = await submitPersonalInfo();

    const healthQuesJson = JSON.stringify(quesPayload);
    // setLoading(true);
    try {
      await updatePatientHealthHistory({
        input: {
          history: healthQuesJson,
          user_id: 213,
        },
      });
    } catch (err) {
      console.log(err);
      // setLoading(false);
    }
  };

  return (
    <div>
      <div className="card-container profile-tabs">
        <Tabs type="card">
          <TabPane tab="Personal Information" key="1" className="">
            <PersonalInfo />
          </TabPane>
          <TabPane tab="Health Questionnaire" key="2">
            <div className="w-1/3">
              <QuestionnaireForm
                ref={form}
                // data={{}}
                // onFinishSuccess={onFinishSuccess}
                onFinishSuccess={onFinishHealthQuestionnarySuccess}
              />

              <div className="flex items-center justify-end">
                <Button
                  loading={fetching}
                  disabled={fetching}
                  className="ant-btn ant-btn-primary ant-btn mb-0"
                  type="primary"
                  onClick={() => form?.current?.submit()}
                >
                  Update
                </Button>
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
  );
};

export default AccountTabs;
