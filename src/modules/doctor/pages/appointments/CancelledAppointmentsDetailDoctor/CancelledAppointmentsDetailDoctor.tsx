import React from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import PatientInfoTab from "../UpcomingAppointmentsDetailDoctor/PatientInfoTab";
import AppointmentInfoTab from "../UpcomingAppointmentsDetailDoctor/AppointmentInfoTab";
import word from "../../../../../../public/assets/images/word-file.svg";
import Attachment from "common/components/Attachment/Attachment";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { parseJson } from "common/utils/helper";
import {
  useDoctorAppointmentDetailQuery,
  usePatientHealthHistoryQuery,
} from "generated/graphql";

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
    urlArr = urlArr[0]?.map((item: string) => item.split("com/")[1]);
  }

  return (
    <AppLayout>
      <>
        <h2 className="mb-4">Cancelled Appointments</h2>
        <div className="profile-tabs">
          <Tabs type="card">
            <Tabs.TabPane tab="Appointment Info" key="1">
              <AppointmentInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Patient Info" key="2">
              <PatientInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health Questionnaire" key="3">
              <div className="max-w-1/2">
                <QuestionnaireForm
                  data={patientHealthHistory?.patientHealthHistory?.history}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician Questionnaire" key="4">
              <div>
                <PhysicianQuestionnaire
                  appointmentHealthHistory={
                    appointment?.appointmentHealthHistory?.history
                  }
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachement" key="5">
              <div>
                {urlArr?.map((item: string) => {
                  return <Attachment src={word} name={item} enable />;
                })}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    </AppLayout>
  );
}
export default CancelledAppointmentsDetailDoctor;
