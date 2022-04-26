import React, { useState, useEffect, useRef } from "react";
import { Tabs, Button, Alert, notification, Tag } from "antd";
import PersonalInfo from "./PersonelInfo/PersonelInfo";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import HealthQuestionnary, {
  QuestionnaireForm,
} from "../Questionnary/Questionnary";
import {
  useUpdatePatientHealthHistoryMutation,
  usePatientHealthHistoryQuery,
  useGetAllTransactionsQuery,
} from "../../../generated/graphql";
import { getUserData } from "../../utils/userData";
import _classes from "./AccountTabs.module.scss";
import { date } from "../../utils";
import { EyeFilled } from "@ant-design/icons";

const { TabPane } = Tabs;

const AccountTabs = () => {
  type Props = {
    loading?: boolean;
  };

  const form: any = useRef();

  // GET USER ID
  const { user } = getUserData();
  const id: number = user?.id;

  // Get patient Health History
  const [{ data }] = usePatientHealthHistoryQuery({
    variables: { input: id },
  });

  //GET ALL TRANSACTIONS
  const [{ data: allTransactions }] = useGetAllTransactionsQuery();
  console.log("allTransactions", allTransactions);

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
          user_id: id,
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
    <div>
      <div className={`${_classes["mobile-tabs"]} profile-tabs card-container`}>
        <Tabs type="card">
          <TabPane
            className="w-full"
            tab={
              <span className="font-Circular font-medium">
                Personal Information
              </span>
            }
            key="1"
          >
            <PersonalInfo />
          </TabPane>
          <TabPane
            tab={
              <span className="font-Circular font-medium">
                Health Questionnaire
              </span>
            }
            key="2"
          >
            <div className="md:w-3/6">
              <QuestionnaireForm
                ref={form}
                data={data?.patientHealthHistory.history}
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
          <TabPane
            tab={
              <span className="font-Circular font-medium">Payment Methods</span>
            }
            key="3"
          >
            <PaymentMethods />
          </TabPane>
          <TabPane
            tab={
              <span className="font-Circular font-medium">
                Transaction History
              </span>
            }
            key="4"
          >
            <TransactionHistory data={allTransactions?.transections} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountTabs;
