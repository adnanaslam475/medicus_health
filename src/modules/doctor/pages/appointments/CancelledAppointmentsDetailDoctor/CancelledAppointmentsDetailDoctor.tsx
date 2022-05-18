import React from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
// import AppointmentsDetailTabs from "../../AppointmentsDetailTabs/AppointmentsDetailTabs";
import {
  useDoctorAppointmentDetailQuery,
  // useGetAppointmentReportUrlByIdQuery,
  usePatientHealthHistoryQuery,
} from "generated/graphql";
import { Tabs } from "antd";

import Questionnary, {
  QuestionnaireForm,
} from "common/components/Questionnary/Questionnary";
import Attachment from "common/components/Attachment/Attachment";
// import jpg from "../../../../../../public/assets/images/jpg.svg";
import word from "../../../../../../public/assets/images/word-file.svg";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import { parseJson } from "common/utils/helper";
// import NotesTab from "../UpcomingAppointmentsDetailDoctor/NotesTab";
import PatientInfoTab from "../UpcomingAppointmentsDetailDoctor/PatientInfoTab";
import AppointmentInfoTab from "../UpcomingAppointmentsDetailDoctor/AppointmentInfoTab";

function CancelledAppointmentsDetailDoctor() {
  const { query } = useRouter();

  const [{ data }] = useDoctorAppointmentDetailQuery({
    variables: {
      id: Number(query.appointmentId),
    },
    pause: !query.appointmentId,
  });
  const { appointment } = data || {};


  //get appointment URL
  const { reportUrl, patientId } = appointment || {};
  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: patientId as number },
  });

  let urlArr = parseJson(reportUrl);
  if (urlArr && urlArr?.length > 0) {
    urlArr = urlArr[0]?.map((item: any) => item.split("com/")[1]);
  }

  // Get patient Health History

  

  return (
    <AppLayout>
      <>
        <h2 className="mb-4">Cancelled Appointments</h2>
        <div className="profile-tabs">
          <Tabs type="card">
            <Tabs.TabPane tab="Appointment Info" key="1" className="">
              <AppointmentInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Patient Info" key="2">
              <PatientInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health Questionnaire" key="3">
              <div className="max-w-1/2">
                <QuestionnaireForm
                  data={patientHealthHistory?.patientHealthHistory.history}
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
            <Tabs.TabPane tab="Attachement" key="5">
              <div className="">
                {urlArr?.map((item: any) => (
                  <Attachment src={word} name={item} enable />
                ))}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    </AppLayout>
  );
}
export default CancelledAppointmentsDetailDoctor;
