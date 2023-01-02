import React, { useEffect } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import {
  GetAppointmentInput,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { Tabs } from "antd";
import PatientAppointmentInfoTab from "./PatientAppointmentInfoTab";
import PatientInfoTab from "./PatientInfoTab";
import HealthQuestionnaireFrom from "./HealthQuestionnaireFromTab";
import PhysicianQuestionnaireForm from "./PhysicianQuestionnaireFormTab";
import AttachmentTab from "./AttachmentTab";
import NotesTab from "common/components/NotesTab/NotesTab";

function PatientAppointmentHistoryDetail() {
  const { query } = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>("");
  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );

  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: {
        ...filterValues,
        appointmentId: Number(query?.id),
        status: "Completed",
      },
      pagination: { limit: -1, page: 1 },
      sorting,
    },
  });
  const { appointments } = data || {};
  const appointment = appointments?.items && appointments.items[0];
  const { items: appointmentItems, meta } = appointments || {};
  const status = appointment?.status;

  // const onChangeFilters = (values: GetAppointmentInput) => {
  //   setSorting({ column: "", order: "" });
  //   setPagination({ ...pagination, page: 1 });
  //   setFilterValues(values);
  // };

  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);

  const onChangeTabHandler = (key: string) => {
    setActiveTab(key);
    history.pushState({}, "", "?activeTab=" + key);
  };

  const { doctorId } = appointment || {};

  // const doctorId = appointment?.

  return (
    <AppLayout>
      <>
        <h2 className="mb-4">Appointment detail</h2>
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
              <PhysicianQuestionnaireForm doctorId={doctorId} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachments" key="5">
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
