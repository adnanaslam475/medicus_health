import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import {
  Appointment,
  useDoctorAppointmentDetailQuery,
  useGetAppointmentReportUrlByIdQuery,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { Tabs } from "antd";
import ProfileTab from "./ProfileTab";
import AdminHealthQuestionnaireFrom from "./AdminHealthQuestionnaireFromTab";
import {
  CalendarOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import PatientAppointmentsTab from "./PatientAppointmentsTab";

function AdminPatientListingDetail() {
  const { query } = useRouter();

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchString: String(query?.id), status: "Completed" },
    },
  });
  const { appointments } = data || {};
  const appointment = appointments && appointments[0];

  let doctorNotes =
    appointment?.doctorNote && Object?.entries(appointment?.doctorNote);

  return (
    <AppLayout>
      <>
        <div className="">
          <Tabs>
            <Tabs.TabPane
              tab={
                <span>
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
                <span>
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
                <span>
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
