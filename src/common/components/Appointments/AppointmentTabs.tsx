import React from "react";
import { Tabs } from "antd";
import Router from "next/router";
const { TabPane } = Tabs;
import AppointmentInfo from "../../../common/components/Appointments/AppointmentInfo";
import PhysicianQuestionnaire from "../../../common/components/Appointments/PhysicianQuestionnaire";
import Attachments from "../../../common/components/Appointments/Attachments";
import { useGetAppointmentByIdQuery } from "../../../generated/graphql";

const AppointmentTabs = () => {
  const [{ data }] = useGetAppointmentByIdQuery({
    variables: { id: 133 },
  });

  return (
    <div className="profile-tabs">
      <Tabs type="card">
        <TabPane tab="Appointment Info" key="1" className="">
          <AppointmentInfo appoinmentDetails={data} />
        </TabPane>
        <TabPane tab="Physician Questionnaire" key="2">
          <PhysicianQuestionnaire />
        </TabPane>
        <TabPane tab="Attachments" key="3">
          <Attachments />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AppointmentTabs;
