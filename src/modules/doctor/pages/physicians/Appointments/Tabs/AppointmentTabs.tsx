import React from "react";
import Router from "next/router";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import AppointmentInfo from "../../../../../../../src/modules/doctor/pages/physicians/Appointments/Tabs/AppointmentInfo";


function AppointmentTabs() {
  return (
    <div className="profile-tabs">
      <Tabs type="card">
        <TabPane tab="Appointment Info" key="1">
            <AppointmentInfo />
        </TabPane>
        <TabPane tab="Patient Info" key="2">
            Patient Info
        </TabPane>
        <TabPane tab="Health Questionnaire" key="3">
            Health Questionnaire
        </TabPane>
        <TabPane tab="Physician Questionnaire" key="4">
            Physician Questionnaire
        </TabPane>
        <TabPane tab="Attachments" key="5">
            Attachments
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AppointmentTabs;
