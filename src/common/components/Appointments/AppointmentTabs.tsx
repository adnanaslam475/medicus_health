import React from "react";
import { Tabs } from "antd";
import Router from "next/router";
const { TabPane } = Tabs;
import AppointmentInfo from "../../../common/components/Appointments/AppointmentInfo";
import PhysicianQuestionnaire from "../../../common/components/Appointments/PhysicianQuestionnaire";
import Attachments from "../../../common/components/Appointments/Attachments";
import {
  useGetAppointmentByIdQuery,
  usePatientHealthHistoryQuery,
} from "../../../generated/graphql";
import { QuestionnaireForm } from "../Questionnary/Questionnary";
import { parseJson } from "common/utils/helper";

type Props = {
  appointmentId?: Number;
};

const AppointmentTabs = (props: Props) => {
  const { appointmentId } = props;

  const [{ data }] = useGetAppointmentByIdQuery({
    variables: { id: Number(appointmentId) },
  });

  const { appointmentHealthHistory, patient } = data?.appointment || {};

  const { id } = patient || {};

  // Get patient Health History
  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: Number(id) },
  });

  return (
    <div className="profile-tabs">
      <Tabs type="card">
        <TabPane tab="Appointment Info" key="1" className="">
          <AppointmentInfo appoinmentDetails={data} />
        </TabPane>
        <Tabs.TabPane tab="Health Questionnaire" key="2">
          <div className="max-w-1/2">
            <QuestionnaireForm
              data={patientHealthHistory?.patientHealthHistory.history}
            />
          </div>
        </Tabs.TabPane>
        <TabPane tab="Physician Questionnaire" key="3">
          <PhysicianQuestionnaire
            appointmentHealthHistory={appointmentHealthHistory?.history}
          />
        </TabPane>
        <TabPane tab="Attachments" key="4">
          <Attachments appoinmentDetails={data} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AppointmentTabs;
