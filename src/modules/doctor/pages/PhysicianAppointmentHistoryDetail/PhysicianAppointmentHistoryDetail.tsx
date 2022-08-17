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
  GetAppointmentInput,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
// import NotesTab from "../appointments/UpcomingAppointmentsDetailDoctor/NotesTabForPhysician";
import NotesTab from "common/components/NotesTab/NotesTab";

function PhysicianAppointmentHistoryDetail() {
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
      // filter: { searchString: String(query?.id), status: "Completed" },
      filter: {
        ...filterValues,
        status: "Completed",
        searchString: String(query?.id),
      },
      pagination: { limit: -1, page: 1 },
      sorting,
    },
  });
  const { appointments } = data || {};
  const appointment = appointments?.items && appointments.items[0];

  // let doctorNotes =
  //   appointment?.currentAppointmentNote &&
  //   Object?.entries(appointment?.currentAppointmentNote);

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
        <h2 className="mb-4">Appointment history detail</h2>
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
            <Tabs.TabPane tab="Personal info" key="2">
              <PatientInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health questionnaire" key="3">
              <HealthQuestionnaireFormTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician questionnaire" key="4">
              <PhysicianQuestionnaireFormTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachments" key="5">
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
