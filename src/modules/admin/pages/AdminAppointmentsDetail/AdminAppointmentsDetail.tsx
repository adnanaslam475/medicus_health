import React from "react";
import Router, { useRouter } from "next/router";
import { Button, notification, Tabs } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import AdminAppointmentInfoTab from "./AdminAppointmentInfoTab";
import AdminQuestionnaireFormTab from "./AdminQuestionnaireFormTab";
import AdminHealthQuestionnaireFormTab from "./AdminHealthQuestionnaireFormTab";
import AdminNotesWithTextTab from "./AdminNotesWithTextTab";
import AdminAttachmentTab from "./PhysicianAttachmentTab";
import { Appointment, useGetAppointmentByIdQuery } from "generated/graphql";
import { REQUESTED, SUGGESTED, COMPLETED } from "common/constants/status";
import NotesTab from "common/components/NotesTab/NotesTab";

function AdminAppointmentHistoryDetail() {
  const { query } = useRouter();
  const [{ data }] = useGetAppointmentByIdQuery({
    variables: { id: Number(query?.id) },
  });

  const { appointment } = data || {};
  const status = appointment?.status;

  const doctorNotes =
    appointment?.doctorNote && Object?.entries(appointment?.doctorNote);
  const isNotesShow = [REQUESTED, SUGGESTED, COMPLETED].includes(
    appointment?.status || ""
  );

  return (
    <AppLayout>
      <div>
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
            {/* {isNotesShow && (
              <Tabs.TabPane tab="Notes" key="6">
                <AdminNotesWithTextTab
                  appointment={appointment as Appointment}
                  doctorNotes={doctorNotes as [[string, string]]}
                />
              </Tabs.TabPane>
            )} */}
            {(status === "Confirmed" ||
              status === "Completed" ||
              status === "OnGoing") && (
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
      </div>
    </AppLayout>
  );
}
export default AdminAppointmentHistoryDetail;
