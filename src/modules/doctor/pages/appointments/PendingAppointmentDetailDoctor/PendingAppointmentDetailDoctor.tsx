import React, { useEffect } from "react";
import AppointmentTabs from "../../../../../common/components/Appointments/AppointmentTabs";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import AppointmentsDetailTabs from "../../AppointmentsDetailTabs/AppointmentsDetailTabs";
import {
  useDoctorAppointmentDetailQuery,
  useGetAppointmentReportUrlByIdQuery,
  usePatientHealthHistoryQuery,
} from "generated/graphql";
import { Empty, Tabs } from "antd";
import AppointmentInfoTab from "../UpcomingAppointmentsDetailDoctor/AppointmentInfoTab";
import PatientInfoTab from "../UpcomingAppointmentsDetailDoctor/PatientInfoTab";
// import NotesTab from "./NotesTabForPhysician";
import NotesTab from "common/components/NotesTab/NotesTab";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import Attachment from "common/components/Attachment/Attachment";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { parseJson } from "common/utils/helper";
import { AttachmentObject } from "common/types/types";

function PendingAppointmentDetailDoctor() {
  const { query } = useRouter();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>("");
  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);
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
    pause: !appointment?.id,
  });

  //get appointment URL
  const { reportUrl } = appoinmentUrl?.appointment || {};

  let urlArr = parseJson(reportUrl);
  if (urlArr && urlArr.length > 0) {
    urlArr = urlArr?.flat(1)?.map((item: any) => ({
      name: item?.name,
      url: item?.url,
    }));
  }
  //Get Patient ID
  const { patientId ,doctorId} = appointment || {};

  // Get patient Health History
  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: patientId as number },
    pause: !patientId, // this was calling unnecessary
  });

  const onChangeTabHandler = (key: string) => {
    setActiveTab(key);
    history.pushState({}, "", "?activeTab=" + key);
  };

  return (
    <AppLayout>
      <>
        <h2 className="mb-4">Pending appointments</h2>
        <div className="profile-tabs">
          <Tabs
            type="card"
            defaultActiveKey="1"
            activeKey={activeTab || "1"}
            onChange={onChangeTabHandler}
          >
            <Tabs.TabPane tab="Appointment info" key="1" className="">
              <AppointmentInfoTab />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Personal info" key="2">
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
              <div className="">
                <PhysicianQuestionnaire
                  appointmentHealthHistory={
                    appointment?.appointmentHealthHistory?.history
                  }
                  doctorId={Number(doctorId)}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachments" key="5">
              <div className="">
                {urlArr?.length ? (
                  urlArr?.map((item: AttachmentObject) => (
                    <Attachment item={item} enable={false} />
                  ))
                ) : (
                  <div className="flex items-center justify-center xl:w-3/5 mt-5">
                    <Empty />
                  </div>
                )}
              </div>
            </Tabs.TabPane>
            {(pathname.includes("appointments/upcoming") ||
              pathname.includes("appointments/pending")) && (
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
export default PendingAppointmentDetailDoctor;
