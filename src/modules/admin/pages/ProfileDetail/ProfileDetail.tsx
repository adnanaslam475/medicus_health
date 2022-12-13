/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RangeValue } from "rc-picker/lib/interface";
import { notification, Tabs } from "antd";
import {
  BellOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  ScheduleOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AppLayout from "../../../../common/components/AppLayout/AppLayout";
import EmailNotification from "../EmailNotification/EmailNotification";
import {
  Appointment,
  useCreateDoctorScheduleMutation,
  useDoctorQuestionnaireQuery,
  useRemoveDoctorScheduleMutation,
  useScheduleQuery,
} from "../../../../generated/graphql";
import AdminPhysicianPatientAppointmentTab from "./AdminPhysicianPatientAppointmentTab";
import StaffListing from "modules/doctor/pages/staff/StaffListing/StaffListing";
import AccountsProfile from "modules/doctor/pages/physicians/Accounts/AccountsProfile/AccountsProfile";
import ConsultationRates from "modules/common/components/ConsultaionRates/ConsultaionRates";
import AdminHealthQuestionnaireFrom from "../AdminPatientListingDetail/AdminHealthQuestionnaireFromTab";
import AdminQuestionnaireFormTab from "../AdminAppointmentsDetail/AdminQuestionnaireFormTab";
import { parseJson } from "common/utils/helper";
import MultiRangeDatePicker from "common/components/MultiRangeDatePicker/MultiRangeDatePicker";
import { getUserData } from "common/utils/userData";
import { GraphQLError } from "graphql";
import { UTCPrettierTime } from "common/utils/date";

const { TabPane } = Tabs;

function ProfileDetail() {
  const [activeTab, setActiveTab] = React.useState<string>("");
  const [addScheduleDay, setAddScheduleDay] = useState<number | string>(
    "Select Day"
  );
  const [addScheduleTime, setAddScheduleTime] = useState<{
    time: RangeValue<moment.Moment> | null;
    timeString: string[];
  }>({ timeString: [], time: null });
  const [showCancelScheduleModal, setShowCancelScheduleModal] = useState(false);

  // const [addScheduleTime, setAddScheduleTime] = React.useState<{
  //   time: RangeValue<moment.Moment> | null;
  //   timeString: string[];
  // }>({ timeString: [], time: null });
  const [deleteScheduleId, setDeleteScheduleId] = React.useState<string>("");

  //   GET ID FROM URL
  const router = useRouter();
  const { query } = router;
  const docId = query?.id;
  const { user } = getUserData();
  const role = user?.role;

  const adminId = query?.id;
  const id = role == "Admin" ? Number(adminId) : user?.id;

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

  const [{ data: dataList }] = useDoctorQuestionnaireQuery({
    variables: {
      doctorId: Number(query?.id),
      languageId: 2,
    },
  });

  const { doctorQuestionnaire } = dataList || {};

  let questionnair = parseJson(doctorQuestionnaire?.questionnaire);

  const [doctorSchedules, executeDoctorSchedules] = useScheduleQuery({
    variables: { doctorId: id as number },
  });
  const schedules = doctorSchedules?.data?.doctorSchedules;

  const [createDoctorScheduleResponse, executeCreateDoctorScheduleMutation] =
    useCreateDoctorScheduleMutation();
  const { fetching } = createDoctorScheduleResponse;
  const [
    { fetching: deleteScheduleFetching },
    executeRemoveDoctorScheduleMutation,
  ] = useRemoveDoctorScheduleMutation();
  async function onAddClick() {
    if (
      addScheduleDay &&
      !isNaN(addScheduleDay as number) &&
      addScheduleTime?.timeString?.length &&
      id
    ) {
      const startTime = UTCPrettierTime(addScheduleTime?.timeString[0]);
      const endTime = UTCPrettierTime(addScheduleTime?.timeString[1]);
      const variable = {
        doctorId: Number(id),
        day: Number(addScheduleDay === 7 ? 0 : addScheduleDay),
        startTime: startTime,
        endTime: endTime,
      };

      await executeCreateDoctorScheduleMutation(variable)
        .then((res) => {
          if (res?.error && res?.error?.message) {
            let graphQLError = res?.error?.graphQLErrors[0]?.extensions
              ?.response as GraphQLError;
            let customError = res?.error?.graphQLErrors[0]?.extensions
              ?.exception as GraphQLError;
            let errorMessage =
              graphQLError?.message ||
              customError?.message ||
              "Something went wrong";
            notification.error({
              message: errorMessage,
            });
          }
        })
        .catch((err) => {});
      await executeDoctorSchedules({ requestPolicy: "network-only" });
      setAddScheduleDay("Select Day");
      setAddScheduleTime({ timeString: [], time: null });
    }
  }
  useEffect(() => {
    if (deleteScheduleId) {
      setShowCancelScheduleModal(true);
      executeRemoveDoctorScheduleMutation({
        id: Number(deleteScheduleId),
      }).then(() => {
        setShowCancelScheduleModal(false);
      });
    }
  }, [deleteScheduleId]);

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
                <span className="flex items-center">
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
                <span className="flex items-center">
                  <UnorderedListOutlined />
                  Questionnaire
                </span>
              }
              key="2"
            >
              <AdminQuestionnaireFormTab
                questionnaire={questionnair as Appointment}
                doctorId={Number(query?.id)}
              />
            </TabPane>
            {/* <TabPane
              tab={
                <span className="flex items-center">
                  <BellOutlined />
                  Email notifications
                </span>
              }
              key="2"
            >
              <EmailNotification />
            </TabPane> */}
            <TabPane
              tab={
                <span className="flex items-center">
                  <CalendarOutlined />
                  Appointments
                </span>
              }
              key="3"
            >
              <AdminPhysicianPatientAppointmentTab />
            </TabPane>
            <TabPane
              tab={
                <span className="flex items-center">
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
                <span className="flex items-center">
                  <DollarCircleOutlined />
                  Consultation rates
                </span>
              }
              key="7"
            >
              <ConsultationRates />
            </Tabs.TabPane>
            <Tabs.TabPane
              className="w-full"
              tab={
                <span className="flex items-center">
                  <ScheduleOutlined style={{ fontSize: "20px" }} />
                  Availability
                </span>
              }
              key="6"
            >
              <div className="w-full md:w-full lg:max-w-[60%] xl:max-w-[60%]">
                <MultiRangeDatePicker
                  loading={fetching}
                  disable={false}
                  schedules={schedules}
                  setDeleteScheduleId={setDeleteScheduleId}
                  deleteScheduleFetching={deleteScheduleFetching}
                  setAddScheduleTime={setAddScheduleTime}
                  addScheduleTime={addScheduleTime}
                  addScheduleDay={addScheduleDay}
                  setAddScheduleDay={setAddScheduleDay}
                  onAddClick={onAddClick}
                  showCancelScheduleModal={showCancelScheduleModal}
                  setShowCancelScheduleModal={setShowCancelScheduleModal}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}

export default ProfileDetail;
