import React from "react";
import AppointmentTabs from "../../../../../common/components/Appointments/AppointmentTabs";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import AppointmentsDetailTabs from "../../AppointmentsDetailTabs/AppointmentsDetailTabs";
import {
  useDoctorAppointmentDetailQuery,
  useGetAppointmentReportUrlByIdQuery,
  usePatientHealthHistoryQuery,
} from "generated/graphql";
import { Tabs } from "antd";
import AppointmentInfoTab from "./AppointmentInfoTab";
import PatientInfoTab from "./PatientInfoTab";
import NotesTab from "./../../appointments/UpcomingAppointmentsDetailDoctor/NotesTab";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import Attachment from "common/components/Attachment/Attachment";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { parseJson } from "common/utils/helper";
import { AttachmentObject } from "common/types/types";

function UpcomingAppointmentsDetailDoctor() {
  const { query } = useRouter();
  const router = useRouter();

  const { pathname } = router || {};

  const [{ data }] = useDoctorAppointmentDetailQuery({
    variables: {
      id: Number(query.id),
    },
    pause: !query.id,
  });
  const { appointment } = data || {};

  const [{ data: appoinmentUrl }] = useGetAppointmentReportUrlByIdQuery({
    variables: {
      id: Number(appointment?.id),
    },
  });

  //get appointment URL
  const { reportUrl } = appoinmentUrl?.appointment || {};

  let urlArr = parseJson(reportUrl);
  if (urlArr && urlArr.length > 0) {
    urlArr = urlArr?.flat(1)?.map((item: any) => ({
      name: item.name,
      url: item.url,
    }));
  }
  //Get Patient ID
  const { patientId } = appointment || {};

  // Get patient Health History
  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: patientId as number },
  });

  return (
    <AppLayout>
      <>
        <h2 className="mb-4">Appointment Detail</h2>
        <div className="profile-tabs">
          <Tabs type="card">
            <Tabs.TabPane tab="Appointment Info" key="1" className="">
              <AppointmentInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Patient Info" key="2">
              <PatientInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health Questionnaire" key="3">
              <div className="md:max-w-1/2">
                <QuestionnaireForm
                  data={patientHealthHistory?.patientHealthHistory?.history}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician Questionnaire" key="4">
              <div className="">
                <PhysicianQuestionnaire
                  appointmentHealthHistory={
                    appointment?.appointmentHealthHistory?.history
                  }
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachment" key="5">
              <div className="">
                {urlArr?.map((item: AttachmentObject) => (
                  <Attachment item={item} enable={false} />
                ))}
              </div>
            </Tabs.TabPane>
            {pathname.includes("appointments/upcoming") && (
              <Tabs.TabPane tab={<span>Notes</span>} key="6">
                <NotesTab />
              </Tabs.TabPane>
            )}
          </Tabs>
        </div>
      </>
    </AppLayout>
  );
}
export default UpcomingAppointmentsDetailDoctor;
