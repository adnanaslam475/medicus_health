import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import AdminPatientQuestionnaireFormTab from "./AdminPatientQuestionnaireFormTab";
import { Appointment, useGetAppointmentByIdQuery } from "generated/graphql";
import AdminPatientNotesWithTextTab from "./AdminPatientNotesWithTextTab";
import AdminPatientAppointmentInfoTab from "./AdminPatientAppointmentInfoTab";
import AdminPatientHealthQuestionnaireFormTab from "./AdminPatientHealthQuestionnaireFormTab";
import AdminPatientAttachmentTab from "./AdminPatientAttachmentTab";

function AdminPatientAppointmentDetail() {
  const { query } = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>("");

  const [{ data, fetching }] = useGetAppointmentByIdQuery({
    variables: { id: Number(query?.id) },
  });

  const { appointment } = data || {};

  let doctorNotes =
    appointment?.currentAppointmentNote &&
    Object?.entries(appointment?.currentAppointmentNote);
  const onChangeTabHandler = (key: string) => {
    setActiveTab(key);
    history.pushState({}, "", "?activeTab=" + key);
  };

  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);
  return (
    <AppLayout>
      <>
        <h2 className="mb-4">Appointment Detail</h2>
        <div className="profile-tabs">
          <Tabs
            type="card"
            defaultActiveKey="1"
            activeKey={activeTab || "1"}
            onChange={onChangeTabHandler}
          >
            <Tabs.TabPane tab="Appointment Info" key="1" className="">
              <AdminPatientAppointmentInfoTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health Questionnaire" key="3">
              <AdminPatientHealthQuestionnaireFormTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician Questionnaire" key="4">
              <AdminPatientQuestionnaireFormTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachment" key="5">
              <AdminPatientAttachmentTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Notes" key="6">
              <AdminPatientNotesWithTextTab
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
export default AdminPatientAppointmentDetail;
