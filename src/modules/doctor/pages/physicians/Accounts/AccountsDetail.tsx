import React, { useEffect, useState } from "react";
import { notification, Tabs } from "antd";
import AccountsProfile from "./AccountsProfile/AccountsProfile";
import BankInfo from "./BankInfo/BankInfo";
import _classes from "./Account.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../../../../config";
import { getUserData } from "common/utils/userData";
import {
  Consultationrateicon,
  Dollariconbluewhite,
} from "../../../../../common/components/CustomIcon";
import {
  Appointment,
  useCreateDoctorScheduleMutation,
  useDoctorQuestionnaireQuery,
  User,
  useRemoveDoctorScheduleMutation,
  useScheduleQuery,
} from "generated/graphql";
import ConsultationRates from "modules/common/components/ConsultaionRates/ConsultaionRates";
import { parseJson } from "common/utils/helper";
import AdminQuestionnaireFormTab from "modules/admin/pages/AdminAppointmentsDetail/AdminQuestionnaireFormTab";
import { useRouter } from "next/router";
import EmailNotificationPage from "modules/common/components/EmailNotification/EmailNotificationPage";
import {
  BellOutlined,
  ScheduleOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MultiRangeDatePicker from "common/components/MultiRangeDatePicker/MultiRangeDatePicker";
import { UTCPrettierTime } from "common/utils/date";
import { GraphQLError } from "graphql";
import { RangeValue } from "rc-picker/lib/interface";

function Accounts() {
  const [deleteScheduleId, setDeleteScheduleId] = useState("");
  const [addScheduleDay, setAddScheduleDay] = useState<number | string>(
    "Select Day"
  );
  const [addScheduleTime, setAddScheduleTime] = useState<{
    time: RangeValue<moment.Moment> | null;
    timeString: string[];
  }>({ timeString: [], time: null });
  const [showCancelScheduleModal, setShowCancelScheduleModal] = useState(false);

  // GET USER ID
  const [activeTab, setActiveTab] = React.useState<string>("");
  const { user } = getUserData();

  const role = user?.role;
  const router = useRouter();
  const { query } = router;
  const adminId = query?.id;
  const id = role == "Admin" ? Number(adminId) : user?.id;

  //  Get patient Health History
  const [{ data: dataList }] = useDoctorQuestionnaireQuery({
    variables: {
      doctorId: Number(id),
      languageId: 2,
    },
  });
  const { doctorQuestionnaire } = dataList || {};

  let questionnair = parseJson(doctorQuestionnaire?.questionnaire);

  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);

  const onChangeTabHandler = (key: string) => {
    setActiveTab(key);
    history.pushState({}, "", "?activeTab=" + key);
  };
  //

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
      console.log(startTime, endTime);

      const variable = {
        doctorId: Number(id),
        // day: Number(addScheduleDay === 7 ? 0 : addScheduleDay),
        startTime: startTime,
        endTime: endTime,
        startDay: "10/11/2022",
        endDay: "10/11/2022",
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

  //
  return (
    <div>
      <div className={`${_classes["mobile-tabs"]} profile-tabs card-container`}>
        <Tabs
          type="card"
          defaultActiveKey="1"
          activeKey={activeTab || "1"}
          onChange={onChangeTabHandler}
        >
          <Tabs.TabPane
            className="w-full"
            tab={
              <span className="font-Circular font-medium   flex items-center">
                <UserOutlined style={{ fontSize: "20px" }} />
                Profile
              </span>
            }
            key="1"
          >
            <AccountsProfile />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span
                className={`${_classes["mobile-tabs-dollar"]} font-Circular font-medium flex items-center`}
              >
                <Dollariconbluewhite className={_classes["tabs-icon-hover"]} />
                <span className="ml-2">Bank info</span>
              </span>
            }
            key="2"
          >
            <div className="lg:w-3/6 xl:w-3/6">
              <Elements stripe={loadStripe(config.stripeKey || "")}>
                <BankInfo />
              </Elements>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium   flex items-center">
                <UnorderedListOutlined style={{ fontSize: "20px" }} />
                Questionnaire
              </span>
            }
            key="3"
          >
            <AdminQuestionnaireFormTab
              questionnaire={questionnair as Appointment}
              user={user as User}
              disable={true}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium flex items-center">
                <Consultationrateicon className={_classes["tabs-icon-hover"]} />
                <span className="ml-2">Consultation rates</span>
              </span>
            }
            key="4"
          >
            <div className="lg:w-3/6 md:w-full">
              <ConsultationRates />
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium flex">
                <BellOutlined style={{ fontSize: "20px" }} />
                Email notifications
              </span>
            }
            key="5"
          >
            <div className="w-full md:w-full lg:max-w-[60%] xl:max-w-[60%]">
              <EmailNotificationPage />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            className="w-full"
            tab={
              <span className="font-Circular font-medium   flex items-center">
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
  );
}

export default Accounts;
