import React from "react";
import AppointmentTabs from "../../../../../common/components/Appointments/AppointmentTabs";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import AppointmentsDetailTabs from "../../AppointmentsDetailTabs/AppointmentsDetailTabs";
import { useDoctorAppointmentDetailQuery } from "generated/graphql";
import { Tabs } from "antd";
import ProfileImageWithInfo from "common/components/ProfleImageWithInfo/ProfileImageWithInfo";
import DoctorAppointmentInfo from "../../../../../common/components/DoctorAppointmentInfo/DoctorAppointmentInfo";
import PatientInfo from "common/components/PatientInfo/PatientInfo";
import Questionnary from "common/components/Questionnary/Questionnary";
import Attachment from "common/components/Attachment/Attachment";
import Notes from "common/components/Notes/Notes";
import jpg from "../../../../../../public/assets/images/jpg.svg";
import word from "../../../../../../public/assets/images/word-file.svg";
import AppointmentInfoTab from "./AppointmentInfoTab";
import PatientInfoTab from "./PatientInfoTab";

function UpcomingAppointmentsDetailDoctor() {
  const { query } = useRouter();

  const [{ data }] = useDoctorAppointmentDetailQuery({
    variables: {
      id: Number(query.appointmentId),
    },
    pause: !query.appointmentId,
  });
  const { appointment } = data || {};

  return (
    <AppLayout>
      <>
        <h2 className="mb-4">Appointment Detail</h2>
        <div className="profile-tabs">
          <Tabs type="card">
            <Tabs.TabPane tab="Appointment Info" key="1" className="">
              <AppointmentInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Patient Info" key="2">
              <PatientInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health Questionnaire" key="3">
              <div className="max-w-1/2">
                <Questionnary disable={true} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician Questionnaire" key="4">
              <div className=""></div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachement" key="5">
              <div className="">
                <Attachment src={jpg} />
                <Attachment src={word} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Notes" key="6">
              <div className="max-w-1/2">
                {/* <ProfileImageWithInfo /> */}
                <Notes />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    </AppLayout>
  );
}
export default UpcomingAppointmentsDetailDoctor;
