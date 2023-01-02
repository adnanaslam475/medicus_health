import React from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import PatientInfo from "common/components/PatientInfo/PatientInfo";
import Questionnary from "common/components/Questionnary/Questionnary";
import Notes from "common/components/Notes/Notes";
import { useGetAppointmentByIdQuery } from "generated/graphql";
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
        <TabPane tab="Appointment info" key="1" className="">
          {/* <ProfileImageWithInfo /> */}
          {/* <AppointmentInfo /> */}
          {/* <DoctorAppointmentInfo /> */}
        </TabPane>
        <TabPane tab="Patient info" key="2">
          {/* <ProfileImageWithInfo /> */}
          <PatientInfo />
        </TabPane>
        <TabPane tab="Health questionnaire" key="3">
          <div className="max-w-1/2">
            {/* <ProfileImageWithInfo /> */}
            <Questionnary disable={true} handleBackChange={handleChange} />
          </div>
        </TabPane>
        <TabPane tab="Physician questionnaire" key="4">
          <div className="">
            {/* <ProfileImageWithInfo /> */}
            {/* <PhysicianQuestionnaire  /> */}
          </div>
        </TabPane>
        <TabPane tab="Attachments" key="5">
          <div className="">
            {/* <ProfileImageWithInfo /> */}
            <Attachment
              item={{ name: "abcd.jpg", url: "dfsdf" }}
              enable={false}
            />
            <Attachment
              item={{ name: "abcd.jpg", url: "dfsdf" }}
              enable={false}
            />
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
