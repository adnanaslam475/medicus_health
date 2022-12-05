import React, { useEffect } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import { usePhysicianAppointmentsHistoryQuery } from "generated/graphql";
import { Tabs } from "antd";
import ProfileTab from "./ProfileTab";
import AdminHealthQuestionnaireFrom from "./AdminHealthQuestionnaireFromTab";
import {
  CalendarOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import PatientAppointmentsTab from "./PatientAppointmentsTab";
import _classes from "./ProfileTab.module.scss";

function AdminPatientListingDetail() {
  const { query } = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>("");

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchString: String(query?.id), status: "Completed" },
    },
  });
  const { appointments } = data || {};
  const appointment = appointments?.items && appointments.items[0];

  // let doctorNotes =
  //   appointment?.currentAppointmentNote &&
  //   Object?.entries(appointment?.currentAppointmentNote);

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
        <div className="tab-active-style">
          <Tabs
            type="card"
            defaultActiveKey="1"
            activeKey={activeTab || "1"}
            onChange={onChangeTabHandler}
          >
            <Tabs.TabPane
              tab={
                <span className="flex items-center">
                  <UserOutlined className="" />
                  Profile
                </span>
              }
              key="1"
            >
              <ProfileTab />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span className="flex items-center">
                  <UnorderedListOutlined />
                  Questionnaire
                </span>
              }
              key="2"
            >
              <AdminHealthQuestionnaireFrom />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span className="flex items-center">
                  <CalendarOutlined />
                  Appointments
                </span>
              }
              key="3"
            >
              <PatientAppointmentsTab />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    </AppLayout>
  );
}
export default AdminPatientListingDetail;
