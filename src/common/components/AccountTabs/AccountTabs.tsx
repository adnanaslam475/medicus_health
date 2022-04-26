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

  const transactionsColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 3,
      },
    },
    {
      title: "Booked On",
      dataIndex: "appointment",
      key: "appointment",
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(
            value?.requestedDate
          )} `}</div>
        );
      },
    },

    {
      title: "Physician",
      dataIndex: "appointment",
      key: "appointment",
      sorter: {
        compare: (a: any, b: any) => a.appointment - b.appointment,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">{`${value?.doctor?.first_name} ${value?.doctor?.last_name}`}</div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "appointment",
      key: "appointment",
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
      render: (value: any) => {
        return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
      },
    },

    {
      title: "Date",
      dataIndex: "appointment",
      key: "appointment",
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        multiple: 3,
      },
      render: (value: any) => {
        let time = value?.appointmentTimeSlots?.find(
          (time: any) => time.selected == true
        );
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(
            time?.startTime
          )} `}</div>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "appointment",
      key: "appointment",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (value: any) => {
        let time = value?.appointmentTimeSlots?.find(
          (time: any) => time.selected == true
        );
        return (
          <div className="someclass">{`${date?.formathhmma(
            time?.startTime
          )} - ${date?.formathhmma(time?.endTime)}`}</div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "amountReceived",
      key: "amountReceived",
      sorter: {
        compare: (a: any, b: any) => a.totalamount - b.totalamount,
        multiple: 3,
      },
      render: (value: any) => {
        return <div className="someclass">{`${value}`}</div>;
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: {
        compare: (a: any, b: any) => a.createdAt - b.createdAt,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">{`${
            value ? date?.formatMMMMDDYYYY(value) : "--"
          }`}</div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a: any, b: any) => a.status - b.status,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">
            <Tag color="cyan">{value}</Tag>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "view",
      className: "table-action-icon",
      render: () => <EyeFilled />,
    },
  ];

  // Get patient Health History
  const [{ data }] = usePatientHealthHistoryQuery({
    variables: { input: id },
  });

  //GET ALL TRANSACTIONS
  const [{ data: allTransactions }] = useGetAllTransactionsQuery();

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
            <TransactionHistory
              data={allTransactions?.transections}
              columns={transactionsColumns}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountTabs;
