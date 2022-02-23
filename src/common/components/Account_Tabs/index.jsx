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
} from "antd";
import Router from "next/router";
import Image from "next/image";
import yourImage from "../../../../public/assets/images/your_photo.png";
import PersonalInfo from "./PersonelInfo";
// import HealthQuestionair from "./HealthQuestionair";
import PaymentMethods from "./PaymentMethods";
import TransactionHistory from "./TransactionHistory";
// import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const { TabPane } = Tabs;

const AccountTabs = () => {
  return (
    <>
      {/* <span className="hidden sm:block">
        <SidebarDrawer />
      </span> */}

      <div>
        <div className="card-container profileTabs">
          <Tabs type="card">
            <TabPane tab="Personal Information" key="1" className="">
              <PersonalInfo />
            </TabPane>
            <TabPane tab="Health Questionnaire" key="2">
              Questionair module component
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
