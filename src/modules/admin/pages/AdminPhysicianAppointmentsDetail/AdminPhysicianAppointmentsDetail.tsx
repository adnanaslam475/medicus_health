import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import AdminPhysicianNotesWithTextTab from "./AdminPhysicianNotesWithTextTab";
import AdminPhysicianAttachmentTab from "./AdminPhysicianAttachmentTab";
import AdminPhysicianQuestionnaireFormTab from "./AdminPhysicianQuestionnaireFormTab";
import AdminPhysicianHealthQuestionnaireFormTab from "./AdminPhysicianHealthQuestionnaireFormTab";
import AdminPhysicianAppointmentInfoTab from "./AdminPhysicianAppointmentInfoTab";
import { Appointment, useGetAppointmentByIdQuery } from "generated/graphql";

function AdminPhysicianAppointmentDetail() {
  const { query } = useRouter();
  const [{ data, fetching }] = useGetAppointmentByIdQuery({
    variables: { id: Number(query?.id) },
  });
  const [activeTab, setActiveTab] = React.useState<string>("");

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
              <AdminPhysicianAppointmentInfoTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health Questionnaire" key="3">
              <AdminPhysicianHealthQuestionnaireFormTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician Questionnaire" key="4">
              <AdminPhysicianQuestionnaireFormTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachment" key="5">
              <AdminPhysicianAttachmentTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Notes" key="6">
              <AdminPhysicianNotesWithTextTab
                appointment={appointment as Appointment}
                doctorNotes={doctorNotes as [[string, string]]}
                loading={fetching}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    </AppLayout>
  );
}
export default AdminPhysicianAppointmentDetail;
