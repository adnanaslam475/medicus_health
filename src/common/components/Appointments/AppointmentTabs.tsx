import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Empty, Form, Tabs } from "antd";
import AppointmentInfo from "common/components/Appointments/AppointmentInfo";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import {
  useGetAppointmentByIdQuery,
  usePatientHealthHistoryQuery,
  useUpdateAppointmentAttachmentsMutation,
} from "generated/graphql";
import { QuestionnaireForm } from "../Questionnary/Questionnary";
import { parseJson } from "common/utils/helper";
import Attachment from "../Attachment/Attachment";
import { AttachmentObject } from "common/types/types";
import Notes from "../Notes/Notes";
// import NotesTab from "modules/doctor/pages/appointments/UpcomingAppointmentsDetailDoctor/NotesTabForPhysician";
import NotesTab from "common/components/NotesTab/NotesTab";
import Dragger from "antd/lib/upload/Dragger";
import Image from "next/image";
import AttachmentDragger from "./AttachmentDragger";
import i18next from "i18next";
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

  const [{ data, fetching: appointmentsLoading }] = useGetAppointmentByIdQuery({
    variables: { id: Number(appointmentId) },
  });

  const {
    appointmentHealthHistory,
    patient,
    status,
    questionnaire,
    doctorId,
    appointmentCharges,
  } = data?.appointment || {};

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
      name: item?.name,
      url: item?.url,
    }));
  }

  const t = i18next.t;

  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);

  const onChangeTabHandler = (key: string) => {
    setActiveTab(key);
    history.pushState({}, "", "?activeTab=" + key);
  };
  const [deletedUrl, setDeletedUrl] = useState("");
  const [{ fetching }, executeUseUpdateAppointmentAttachmentsMutation] =
    useUpdateAppointmentAttachmentsMutation();

  useEffect(() => {
    const updatedArr = urlArr?.filter((item: any) => item?.url !== deletedUrl);
    executeUseUpdateAppointmentAttachmentsMutation({
      updateAppointmentAttachmentsInput: {
        id: Number(query?.id),
        reportUrl: JSON.stringify(updatedArr),
      },
    });
  }, [deletedUrl]);
  return (
    <div className="profile-tabs">
      <Tabs
        type="card"
        defaultActiveKey="1"
        activeKey={activeTab || "1"}
        onChange={onChangeTabHandler}
      >
        <TabPane tab="Appointment info" key="1" className="">
          <AppointmentInfo
            appoinmentDetails={data}
            loading={appointmentsLoading}
          />
        </TabPane>
        <Tabs.TabPane tab="Health questionnaire" key="2">
          <div className="md:max-w-1/2">
            <QuestionnaireForm
              data={patientHealthHistory?.patientHealthHistory?.history}
            />
          </div>
        </Tabs.TabPane>
        <TabPane tab="Physician questionnaire" key="3">
          <PhysicianQuestionnaire
            appointmentHealthHistory={questionnaire}
            doctorId={Number(doctorId)}
          />
        </TabPane>
        <TabPane tab="Attachments" key="4">
          <AttachmentDragger urlArr={urlArr} appointmentsLoading={appointmentsLoading}/>
          <div>
            <span className="font-semibold text-md">Your files</span>
            {urlArr?.length ? (
              urlArr?.map((item: AttachmentObject) => (
                <Attachment
                  item={item}
                  enable
                  setDeletedUrl={setDeletedUrl}
                  loading={fetching}
                />
              ))
            ) : (
              <div className="flex items-center justify-center xl:w-3/5 mt-5">
                <Empty />
              </div>
            )}
          </div>
        </TabPane>
        {(status === "Confirmed" ||
          status === "Completed" ||
          status === "Upcoming") && (
          <>
            {/* {pathname.includes("appointments") && ( */}
            <Tabs.TabPane tab={<span>Notes history</span>} key="6">
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
