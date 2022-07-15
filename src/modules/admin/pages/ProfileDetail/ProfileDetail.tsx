/* eslint-disable react/jsx-key */
import React from "react";
import { useRouter } from "next/router";
import { RangeValue } from "rc-picker/lib/interface";
import { Tabs } from "antd";
import {
  BellOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AppLayout from "../../../../common/components/AppLayout/AppLayout";
import EmailNotification from "../EmailNotification/EmailNotification";
import {
  useCreateDoctorScheduleMutation,
  useRemoveDoctorScheduleMutation,
  useScheduleQuery,
} from "../../../../generated/graphql";
import AdminPhysicianPatientAppointmentTab from "./AdminPhysicianPatientAppointmentTab";
import StaffListing from "modules/doctor/pages/staff/StaffListing/StaffListing";
import AccountsProfile from "modules/doctor/pages/physicians/Accounts/AccountsProfile/AccountsProfile";
import ConsultationRates from "modules/common/components/ConsultaionRates/ConsultaionRates";

const { TabPane } = Tabs;

function ProfileDetail() {
  const [activeTab, setActiveTab] = React.useState<string>("");

  // const [addScheduleTime, setAddScheduleTime] = React.useState<{
  //   time: RangeValue<moment.Moment> | null;
  //   timeString: string[];
  // }>({ timeString: [], time: null });
  const [deleteScheduleId, setDeleteScheduleId] = React.useState<string>("");

  //   GET ID FROM URL
  const router = useRouter();
  const { query } = router;
  const docId = query?.id;

  // const [{ data }] = useDoctorProfileQuery({
  //   variables: { doctor_id: Number(docId) },
  // });

  const [doctorSchedules, executeDoctorSchedules] = useScheduleQuery({
    variables: { doctorId: Number(docId) },
  });

  const [createDoctorScheduleResponse, executeCreateDoctorScheduleMutation] =
    useCreateDoctorScheduleMutation();

  const [, executeRemoveDoctorScheduleMutation] =
    useRemoveDoctorScheduleMutation();

  // async function onAddClick() {
  //   if (isEdit && addScheduleDay && addScheduleTime?.timeString?.length) {
  //     const variable = {
  //       doctorId: Number(docId),
  //       day: Number(addScheduleDay),
  //       startTime: addScheduleTime.timeString[0],
  //       endTime: addScheduleTime.timeString[1],
  //     };

  //     await executeCreateDoctorScheduleMutation(variable);
  //     await executeDoctorSchedules({ requestPolicy: "network-only" });
  //     setAddScheduleDay("Select Day");
  //     setAddScheduleTime({ timeString: [], time: null });
  //   }
  // }

  const onChangeTabHandler = (key: string) => {
    setActiveTab(key);
    history.pushState({}, "", "?activeTab=" + key);
  };
  React.useEffect(() => {
    if (deleteScheduleId) {
      executeRemoveDoctorScheduleMutation({ id: Number(deleteScheduleId) });
    }
  }, [deleteScheduleId]);

  React.useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);

  return (
    <AppLayout>
      <div className="w-full">
        <div className="w-full py-5">
          <Tabs
            defaultActiveKey="1"
            activeKey={activeTab || "1"}
            onChange={onChangeTabHandler}
          >
            <TabPane
              tab={
                <span>
                  <UserOutlined className="" />
                  Profile
                </span>
              }
              key="1"
            >
              {/* {isEdit ? (
                <Profile
                  doctorId={String(query?.id)}
                  doctorData={doctorProfile}
                  edit={editData}
                  setIsEdit={setIsEdit}
                  schedules={schedules}
                  setDeleteScheduleId={setDeleteScheduleId}
                  setAddScheduleDay={setAddScheduleDay}
                  addScheduleDay={String(addScheduleDay)}
                  setAddScheduleTime={setAddScheduleTime}
                  addScheduleTime={addScheduleTime}
                  onAddClick={onAddClick}
                  loading={fetching}
                />
              ) : (
                <ViewProfile
                  doctorId={String(query?.id)}
                  doctorData={doctorProfile}
                  setIsEdit={setIsEdit}
                  showLoginInfo={false}
                  schedules={schedules}
                />
              )} */}
              <AccountsProfile />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <BellOutlined />
                  Email Notifications
                </span>
              }
              key="2"
            >
              <EmailNotification />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CalendarOutlined />
                  Appointment
                </span>
              }
              key="3"
            >
              <AdminPhysicianPatientAppointmentTab />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <TeamOutlined />
                  Staff
                </span>
              }
              key="4"
            >
              <StaffListing />
            </TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  <DollarCircleOutlined />
                  Consultation Rates
                </span>
              }
              key="7"
            >
              <ConsultationRates />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}

export default ProfileDetail;
