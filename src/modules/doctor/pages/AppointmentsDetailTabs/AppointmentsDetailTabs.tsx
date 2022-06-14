import React from "react";
import { Tabs } from "antd";
import Router from "next/router";
const { TabPane } = Tabs;
import AppointmentInfo from "common/components/Appointments/AppointmentInfo";
import PatientInfo from "common/components/PatientInfo/PatientInfo";
import Questionnary from "common/components/Questionnary/Questionnary";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import Attachments from "common/components/Appointments/Attachments";
import ProfileImageWithInfo from "common/components/ProfleImageWithInfo/ProfileImageWithInfo";
// import Attachement from "common/components/Attachement/Attachement";
import jpg from "../../../../../public/assets/images/jpg.svg";
import word from "../../../../../public/assets/images/word-file.svg";
import Notes from "common/components/Notes/Notes";
import { useGetAppointmentByIdQuery } from "generated/graphql";
import DoctorAppointmentInfo from "../../../../common/components/DoctorAppointmentInfo/DoctorAppointmentInfo";
import Attachment from "common/components/Attachment/Attachment";

type Props = {
  appointmentId?: Number;
};

const AppointmentsDetailTabs = (props: Props) => {
  const { appointmentId } = props;

  const handleChange = () => {};
  const [{ data }] = useGetAppointmentByIdQuery({
    variables: { id: Number(appointmentId) },
  });
  const { appointmentHealthHistory } = data?.appointment || {};

  return (
    <div className="profile-tabs">
      <Tabs type="card">
        <TabPane tab="Appointment Info" key="1" className="">
          {/* <ProfileImageWithInfo /> */}
          {/* <AppointmentInfo /> */}
          {/* <DoctorAppointmentInfo /> */}
        </TabPane>
        <TabPane tab="Patient Info" key="2">
          {/* <ProfileImageWithInfo /> */}
          <PatientInfo />
        </TabPane>
        <TabPane tab="Health Questionnaire" key="3">
          <div className="max-w-1/2">
            {/* <ProfileImageWithInfo /> */}
            <Questionnary disable={true} handleBackChange={handleChange} />
          </div>
        </TabPane>
        <TabPane tab="Physician Questionnaire" key="4">
          <div className="">
            {/* <ProfileImageWithInfo /> */}
            {/* <PhysicianQuestionnaire  /> */}
          </div>
        </TabPane>
        <TabPane tab="Attachment" key="5">
          <div className="">
            {/* <ProfileImageWithInfo /> */}
            <Attachment item={{name:"abcd.jpg",url:"dfsdf"}} enable={false} />
            <Attachment item={{name:"abcd.jpg",url:"dfsdf"}}  enable={false}/>
          </div>
        </TabPane>
        <TabPane tab="Notes" key="6">
          <div className="max-w-1/2">
            {/* <ProfileImageWithInfo /> */}
            <Notes />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AppointmentsDetailTabs;
