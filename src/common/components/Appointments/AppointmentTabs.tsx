import React from "react";
import { Tabs } from "antd";
import Router from "next/router";
const { TabPane } = Tabs;
import AppointmentInfo from "../../../common/components/Appointments/AppointmentInfo";
import PhysicianQuestionnaire from "../../../common/components/Appointments/PhysicianQuestionnaire";
import Attachments from "../../../common/components/Appointments/Attachments";
import { useGetAppointmentByIdQuery } from "../../../generated/graphql";

type Props = {
  appointmentId?: Number;
};

const AppointmentTabs = (props: Props) => {
  const { appointmentId } = props;

  const [{ data }] = useGetAppointmentByIdQuery({
    variables: { id: Number(appointmentId) },
  });

  const { appointmentHealthHistory } = data?.appointment || {};

  return (
    <div className="profile-tabs">
      <Tabs type="card">
        <TabPane tab="Appointment Info" key="1" className="">
          <AppointmentInfo appoinmentDetails={data} />
        </TabPane>
        <TabPane tab="Physician Questionnaire" key="2">
          <PhysicianQuestionnaire
            appointmentHealthHistory={appointmentHealthHistory?.history}
          />
        </TabPane>
        <TabPane tab="Attachments" key="3">
          <Attachments appoinmentDetails={data} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AppointmentTabs;
