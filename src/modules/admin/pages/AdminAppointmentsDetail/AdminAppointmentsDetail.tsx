import React from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import AdminAppointmentInfoTab from "./AdminAppointmentInfoTab";
import AdminQuestionnaireFormTab from "./AdminQuestionnaireFormTab";
import AdminHealthQuestionnaireFormTab from "./AdminHealthQuestionnaireFormTab";
import AdminNotesWithTextTab from "./AdminNotesWithTextTab";
import AdminAttachmentTab from "./PhysicianAttachmentTab";
import { Appointment, useGetAppointmentByIdQuery } from "generated/graphql";

function AdminAppointmentHistoryDetail() {
  const { query } = useRouter();
  const [{ data }] = useGetAppointmentByIdQuery({
    variables: { id: Number(query?.appointmentId) },
  });

  const { appointment } = data || {};

  let doctorNotes =
    appointment?.doctorNote && Object?.entries(appointment?.doctorNote);
  return (
    <AppLayout>
      <>
        <h2 className="mb-4">Appointment History Detail</h2>
        <div className="profile-tabs">
          <Tabs type="card">
            <Tabs.TabPane tab="Appointment Info" key="1" className="">
              <AdminAppointmentInfoTab
                appointment={appointment as Appointment}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health Questionnaire" key="3">
              <AdminHealthQuestionnaireFormTab
                appointment={appointment as Appointment}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician Questionnaire" key="4">
              <AdminQuestionnaireFormTab
                appointment={appointment as Appointment}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachment" key="5">
              <AdminAttachmentTab appointment={appointment as Appointment} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Notes" key="6">
              <AdminNotesWithTextTab
                appointment={appointment as Appointment}
                doctorNotes={doctorNotes as [[string, string]]}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    </AppLayout>
  );
}
export default AdminAppointmentHistoryDetail;
