import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Tabs } from "antd";
import PatientAppointmentInfoTab from "./PatientAppointmentInfoOfPhysicianTab";
import AdminAppointmentInfoTab from "./AdminAppointmentInfoTab";
import AdminQuestionnaireFormTab from "./AdminQuestionnaireFormTab";
import AdminHealthQuestionnaireFormTab from "./AdminHealthQuestionnaireFormTab";
import AdminNotesWithTextTab from "./AdminNotesWithTextTab";
import PhysicianAttachmentTab from "./PhysicianAttachmentTab";
import { Appointment, AppointmentNote, usePhysicianAppointmentsHistoryQuery } from "generated/graphql";
import { useRouter } from "next/router";

function PhysicianAppointmentHistoryDetail() {
  const { query } = useRouter();

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    // variables: {
    //   filter: { searchPatient: String(query?.id), status: "Completed" },
    // },
  });
  const { appointments } = data || {};
  const appointment = appointments && appointments[0];

  let doctorNotes =
    appointment?.doctorNote && Object?.entries(appointment?.doctorNote);

  return (
    <AppLayout>
      <>
        <h2 className="mb-4">Appointment History Detail</h2>
        <div className="profile-tabs">
          <Tabs type="card">
            <Tabs.TabPane tab="Appointment Info" key="1" className="">
              <AdminAppointmentInfoTab/>
            </Tabs.TabPane>
        
            <Tabs.TabPane tab="Health Questionnaire" key="3">
              <AdminHealthQuestionnaireFormTab/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician Questionnaire" key="4">
              <AdminQuestionnaireFormTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachment" key="5">
              <PhysicianAttachmentTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Notes" key="6">
              <AdminNotesWithTextTab
                appointment={appointment as Appointment}
                doctorNotes={doctorNotes as [[string,string]]}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    </AppLayout>
  );
}
export default PhysicianAppointmentHistoryDetail;
