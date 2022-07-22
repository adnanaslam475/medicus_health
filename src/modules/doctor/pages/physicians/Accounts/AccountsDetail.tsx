import React, { useEffect } from "react";
import { Tabs } from "antd";
import AccountsProfile from "./AccountsProfile/AccountsProfile";
import BankInfo from "./BankInfo/BankInfo";

// scss
import _classes from "./Account.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../../../../config";
import { getUserData } from "common/utils/userData";
import {
  Appointment,
  useDoctorQuestionnaireQuery,
  User,
} from "generated/graphql";
import ConsultationRates from "modules/common/components/ConsultaionRates/ConsultaionRates";
import { parseJson } from "common/utils/helper";
import AdminQuestionnaireFormTab from "modules/admin/pages/AdminAppointmentsDetail/AdminQuestionnaireFormTab";
import { useRouter } from "next/router";
import EmailNotificationPage from "modules/common/components/EmailNotification/EmailNotificationPage";
import {
  BellOutlined,
  EuroCircleOutlined,
  EuroOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import DollarSvg from "../../../../../../public/assets/icon/dollar.svg";
import ConsultationRatesSvgGray from "../../../../../../public/assets/icon/consultation-iconGray.png";

function Accounts() {
  // GET USER ID
  const [activeTab, setActiveTab] = React.useState<string>("");
  const { user } = getUserData();
  const id = user?.id;

  //  Get patient Health History
  const [{ data: dataList }] = useDoctorQuestionnaireQuery({
    variables: {
      doctorId: Number(id),
    },
  });

  const router = useRouter();
  const { query } = router;
  const { doctorQuestionnaire } = dataList || {};

  let questionnair = parseJson(doctorQuestionnaire?.questionnaire);

  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);

  const onChangeTabHandler = (key: string) => {
    setActiveTab(key);
    history.pushState({}, "", "?activeTab=" + key);
  };

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
              <span className="font-Circular font-medium flex items-center">
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
              <span className="font-Circular font-medium flex items-center">
                <Image
                  priority={true}
                  unoptimized
                  alt="DollarSvg"
                  height="18"
                  width="18"
                  onError={(e) => console.log(e)}
                  src={DollarSvg}

                  // style={{ fontSize: "20px", color: "#08c" }}
                  // className="bg-gray border rounded-full border-gray"
                />
                <span className="ml-2">Bank info</span>
              </span>
            }
            key="2"
          >
            <div className="lg:w-2/6">
              <Elements stripe={loadStripe(config.stripeKey || "")}>
                <BankInfo />
              </Elements>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium flex items-center">
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
                {/* <EuroCircleOutlined
                  // style={{ fontSize: "20px", color: "#08c" }}
                  style={{ fontSize: "20px" }}
                /> */}
                <Image
                  priority={true}
                  unoptimized
                  alt="DollarSvg"
                  height="20"
                  width="25"
                  onError={(e) => console.log(e)}
                  src={ConsultationRatesSvgGray}

                  // style={{ fontSize: "20px", color: "#08c" }}
                  // className="bg-gray border rounded-full border-gray"
                />
                <span className="ml-2">Consultation rates</span>
              </span>
            }
            key="4"
          >
            <div className="md:w-2/6">
              <ConsultationRates />
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium flex">
                <BellOutlined style={{ fontSize: "20px" }} />
                Email Notifications
              </span>
            }
            key="5"
          >
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-2/5">
              <EmailNotificationPage />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Accounts;
