import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import AppointmentInfo from "common/components/Appointments/AppointmentInfo";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import {
  useGetAppointmentByIdQuery,
  usePatientHealthHistoryQuery,
} from "generated/graphql";
import { QuestionnaireForm } from "../Questionnary/Questionnary";
import { parseJson } from "common/utils/helper";
import Attachment from "../Attachment/Attachment";
import { AttachmentObject } from "common/types/types";
import NotesTab from "modules/doctor/pages/appointments/UpcomingAppointmentsDetailDoctor/NotesTab";
const { TabPane } = Tabs;

type Props = {
  appointmentId?: Number;
};

const AppointmentTabs = (props: Props) => {
  const { appointmentId } = props;
  const [activeTab, setActiveTab] = React.useState<string>("");

  const router = useRouter();
  const { pathname } = router || {};
  const { query } = router;

  const [{ data }] = useGetAppointmentByIdQuery({
    variables: { id: Number(appointmentId) },
  });

  const { appointmentHealthHistory, patient, status } = data?.appointment || {};

  const { id } = patient || {};

  // Get patient Health History
  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: Number(id) },
  });

  const { appointment } = data || {};
  const { reportUrl } = appointment || {};
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
    <div className="profile-tabs">
      <Tabs
        type="card"
        defaultActiveKey="1"
        activeKey={activeTab || "1"}
        onChange={onChangeTabHandler}
      >
        <TabPane tab="Appointment Info" key="1" className="">
          <AppointmentInfo appoinmentDetails={data} />
        </TabPane>
        <Tabs.TabPane tab="Health Questionnaire" key="2">
          <div className="md:max-w-1/2">
            <QuestionnaireForm
              data={patientHealthHistory?.patientHealthHistory?.history}
            />
          </div>
        </Tabs.TabPane>
        <TabPane tab="Physician Questionnaire" key="3">
          <PhysicianQuestionnaire
            appointmentHealthHistory={appointmentHealthHistory?.history}
          />
        </TabPane>
        <TabPane tab="Attachments" key="4">
          {urlArr?.map((item: AttachmentObject) => (
            <Attachment item={item} enable />
          ))}
        </TabPane>
        {(status === "Confirmed" ||
          status === "Completed" ||
          status === "OnGoing") && (
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
  );
};

export default AppointmentTabs;
