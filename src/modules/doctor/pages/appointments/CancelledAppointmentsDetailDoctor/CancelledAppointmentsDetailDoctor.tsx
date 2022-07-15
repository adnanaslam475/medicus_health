import React, { useEffect } from "react";
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
import { AttachmentObject } from "common/types/types";

function CancelledAppointmentsDetailDoctor() {
  const { query } = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>("");

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
  if (urlArr && urlArr.length > 0) {
    urlArr = urlArr?.flat(1)?.map((item: any) => ({
      name: item.name,
      url: item.url,
    }));
  }

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
<<<<<<< HEAD
        <h2 className="mb-4">Cancelled appointments</h2>
=======
        <h2 className="mb-4">Canceled appointments</h2>
>>>>>>> 63a203ce1900f690a3a4f4b0fe5f17cea16e337f
        <div className="profile-tabs">
          <Tabs
            type="card"
            defaultActiveKey="1"
            activeKey={activeTab || "1"}
            onChange={onChangeTabHandler}
          >
            <Tabs.TabPane tab="Appointment info" key="1">
              <AppointmentInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Patient info" key="2">
              <PatientInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health questionnaire" key="3">
              <div className="md:max-w-1/2">
                <QuestionnaireForm
                  data={patientHealthHistory?.patientHealthHistory?.history}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician questionnaire" key="4">
              <div>
                <PhysicianQuestionnaire
                  appointmentHealthHistory={
                    appointment?.appointmentHealthHistory?.history
                  }
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachment" key="5">
              <div>
                {urlArr?.map((item: AttachmentObject) => {
                  return <Attachment item={item} enable />;
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
