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
                
                <QuestionnaireForm />

                <div className="flex items-center justify-end">
                  <Button type="primary" size="large">
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
    </>
  );
};

export default AccountTabs;
