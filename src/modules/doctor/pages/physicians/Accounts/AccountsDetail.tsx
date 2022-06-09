import React, { useRef } from "react";
import { Button, notification, Tabs } from "antd";
import AccountsProfile from "./AccountsProfile/AccountsProfile";
import BankInfo from "./BankInfo/BankInfo";

// scss
import _classes from "./Account.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../../../../config";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { getUserData } from "common/utils/userData";
import {
  usePatientHealthHistoryQuery,
  useUpdatePatientHealthHistoryMutation,
} from "generated/graphql";
import ConsultationRates from "modules/common/components/ConsultaionRates/ConsultaionRates";

function Accounts() {
  const form: any = useRef();

  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  // Get patient Health History
  const [{ data }] = usePatientHealthHistoryQuery({
    variables: { input: id as number },
  });

  // UPDATE PATIENT HEALTH HISTORY

  const [result, updatePatientHealthHistory] =
    useUpdatePatientHealthHistoryMutation();

  const { error, fetching } = result;

  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    const healthQuesJson = JSON.stringify(quesPayload);
    try {
      const res = await updatePatientHealthHistory({
        input: {
          history: healthQuesJson,
          user_id: id as number,
        },
      });
      {
        res?.data?.updatePatientHealthHistory &&
          notification.success({
            message: "Successfully Updated",
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
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
            <div className="w-1/2">
              <QuestionnaireForm
                ref={form}
                data={data?.patientHealthHistory?.history}
                onFinishSuccess={onFinishHealthQuestionnarySuccess}
              />

              <div className="flex items-center justify-end">
                <Button
                  loading={fetching}
                  disabled={fetching}
                  className="ant-btn ant-btn-primary ant-btn mb-0"
                  type="primary"
                  onClick={() => form?.current?.submit()}
                >
                  Update
                </Button>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium flex">Consultation Rates</span>
            }
            key="4"
          >
            <div className="w-2/6">
<ConsultationRates/>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Accounts;
