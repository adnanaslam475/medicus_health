import React, { useEffect } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import {
  Appointment,
  useDoctorAppointmentDetailQuery,
  useGetAppointmentReportUrlByIdQuery,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { Tabs } from "antd";
import PatientAppointmentInfoTab from "./PatientAppointmentInfoTab";
import PatientInfoTab from "./PatientInfoTab";
import HealthQuestionnaireFrom from "./HealthQuestionnaireFromTab";
import PhysicianQuestionnaireForm from "./PhysicianQuestionnaireFormTab";
import AttachmentTab from "./AttachmentTab";
import NoteWithTextTab from "./NoteWithTextTab";
// import NotesTab from "modules/doctor/pages/appointments/UpcomingAppointmentsDetailDoctor/NotesTabForPhysician";
import NotesTab from "common/components/NotesTab/NotesTab";

function PatientAppointmentHistoryDetail() {
  const { query } = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>("");

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchString: String(query?.id), status: "Completed" },
    },
  });
  const { appointments } = data || {};
  const appointment = appointments && appointments[0];

  const status = appointment?.status;
  let doctorNotes =
    appointment?.currentAppointmentNote &&
    Object?.entries(appointment?.currentAppointmentNote);

  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);

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
            <Tabs.TabPane tab="Appointment info" key="1" className="">
              <PatientAppointmentInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Patient info" key="2">
              <PatientInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health questionnaire" key="3">
              <HealthQuestionnaireFrom />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician questionnaire" key="4">
              <PhysicianQuestionnaireForm />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachment" key="5">
              <AttachmentTab />
            </Tabs.TabPane>
            {/* <Tabs.TabPane tab="Notes" key="6">
              <NoteWithTextTab
                appointment={appointment as Appointment}
                doctorNotes={doctorNotes as [[string, string]]}
              />
            </Tabs.TabPane> */}
            {(status === "Confirmed" || status === "Completed") && (
              <>
                {/* {pathname.includes("appointments") && ( */}
                <Tabs.TabPane tab={<span>Notes</span>} key="6">
                  <NotesTab />
                </Tabs.TabPane>
                {/* )} */}
              </>
            )}
          </Tabs>
        </div>
      </>
    </AppLayout>
  );
}
export default PatientAppointmentHistoryDetail;
