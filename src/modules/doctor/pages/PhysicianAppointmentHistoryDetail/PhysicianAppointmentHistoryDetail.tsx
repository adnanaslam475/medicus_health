import React, { useEffect } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Tabs } from "antd";
import PatientAppointmentInfoTab from "./PatientAppointmentInfoOfPhysicianTab";
import PatientInfoTab from "./PatientInfoTab";
import PhysicianQuestionnaireFormTab from "./PhysicianQuestionnaireFormTab";
import HealthQuestionnaireFormTab from "./HealthQuestionnaireFormTab";
import NotesWithTextTab from "./NotesWithTextTab";

import PhysicianAttachmentTab from "./PhysicianAttachmentTab";
import {
  Appointment,
  AppointmentNote,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
// import NotesTab from "../appointments/UpcomingAppointmentsDetailDoctor/NotesTabForPhysician";
import NotesTab from "common/components/NotesTab/NotesTab";

function PhysicianAppointmentHistoryDetail() {
  const { query } = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>("");

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchString: String(query?.id), status: "Completed" },
    },
  });
  const { appointments } = data || {};
  const appointment = appointments && appointments[0];

  let doctorNotes =
    appointment?.doctorNote && Object?.entries(appointment?.doctorNote);

  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
    window.onpopstate = () => {
      if (window?.location?.search?.includes("activeTab")) {
        setActiveTab(String(window?.location?.search?.split("=")[1]));
      }
    };
  }, [query, window?.location?.href]);
  const onChangeTabHandler = (key: string) => {
    setActiveTab(key);
    history.pushState({}, "", "?activeTab=" + key);
  };

  return (
    <AppLayout>
      <>
        <h2 className="mb-4">Appointment History Detail</h2>
        <div className="profile-tabs">
          <Tabs
            type="card"
            defaultActiveKey="1"
            activeKey={activeTab || "1"}
            onChange={onChangeTabHandler}
          >
            <Tabs.TabPane tab="Appointment Info" key="1" className="">
              <PatientAppointmentInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Patient Info" key="2">
              <PatientInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health Questionnaire" key="3">
              <HealthQuestionnaireFormTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician Questionnaire" key="4">
              <PhysicianQuestionnaireFormTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachment" key="5">
              <PhysicianAttachmentTab />
            </Tabs.TabPane>
            {/* <Tabs.TabPane tab="Notes" key="6">
              <NotesWithTextTab
                appointment={appointment as Appointment}
                doctorNotes={doctorNotes as [[string,string]]}
              />
            </Tabs.TabPane> */}
            <Tabs.TabPane
              tab={
                <span>
                  {/* <CalendarOutlined /> */}
                  Notes
                </span>
              }
              key="6"
            >
              <NotesTab />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    </AppLayout>
  );
}
export default PhysicianAppointmentHistoryDetail;
