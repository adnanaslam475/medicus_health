import React from "react";
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

function Accounts() {
  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  // // Get patient Health History
  const [{ data: dataList }] = useDoctorQuestionnaireQuery({
    variables: {
      doctorId: Number(id),
    },
  });

  const { doctorQuestionnaire } = dataList || {};

  let questionnair = parseJson(doctorQuestionnaire?.questionnaire);

  return (
    <div>
      <div className={`${_classes["mobile-tabs"]} profile-tabs card-container`}>
        <Tabs type="card">
          <Tabs.TabPane
            className="w-full"
            tab={
              <span className="font-Circular font-medium flex">Profile</span>
            }
            key="1"
          >
            <AccountsProfile />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium flex">Bank Info</span>
            }
            key="2"
          >
            <div className="w-2/6">
              <Elements stripe={loadStripe(config.stripeKey || "")}>
                <BankInfo />
              </Elements>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium">Questionnaire</span>
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
              <span className="font-Circular font-medium flex">
                Consultation Rates
              </span>
            }
            key="4"
          >
            <div className="w-2/6">
              <ConsultationRates />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Accounts;
