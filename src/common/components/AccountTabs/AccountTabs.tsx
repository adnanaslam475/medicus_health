import React, { useEffect, useRef } from "react";
import { Tabs, Button, notification } from "antd";
import PersonalInfo from "./PersonelInfo/PersonelInfo";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import { QuestionnaireForm } from "../Questionnary/Questionnary";
import {
  useUpdatePatientHealthHistoryMutation,
  usePatientHealthHistoryQuery,
  useGetAllTransactionsQuery,
  Transaction,
} from "../../../generated/graphql";
import { getUserData } from "../../utils/userData";
import _classes from "./AccountTabs.module.scss";
import { useRouter } from "next/router";
import EmailNotificationPage from "modules/common/components/EmailNotification/EmailNotificationPage";
import { useTranslations } from "next-intl";
import { isChrome } from "utils/helper";

function AccountTabs() {
  const t = useTranslations("AccountDetail");
  const form: any = useRef();
  const [activeTab, setActiveTab] = React.useState<string>("");
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });
  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  // Get patient Health History
  const [{ data }] = usePatientHealthHistoryQuery({
    variables: { input: id as number },
  });
  const router = useRouter();
  const { query } = router;
  //GET ALL TRANSACTIONS
  const [{ data: allTransactions, fetching: allTransactionLoading }] =
    useGetAllTransactionsQuery({
      variables: {
        pagination: { limit: -1, page: 1 },
        sorting,
      },
    });
  const { transactions } = allTransactions || {};

  // UPDATE PATIENT HEALTH HISTORY

  const [result, updatePatientHealthHistory] =
    useUpdatePatientHealthHistoryMutation();

  const { fetching } = result;

  //Get logged in User
  const { user: loggedInUser } = getUserData();
  const { id: loggedInUserId } = loggedInUser || {};

  // Get patient Health History
  const [{ data: patientHealthHistory }, executeUsePatientHealthHistoryQuery] =
    usePatientHealthHistoryQuery({
      variables: { input: Number(loggedInUserId) },
      requestPolicy: "network-only",
    });

  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);

  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    const healthQuesJson = JSON.stringify(quesPayload);
    try {
      const res = await updatePatientHealthHistory({
        input: {
          history: healthQuesJson,
          user_id: id as number,
        },
      });
      if (res?.data?.updatePatientHealthHistory) {
        executeUsePatientHealthHistoryQuery({
          requestPolicy: "network-only",
        });
        notification.success({
          // message: "Successfully updated",
          message: t("successfully_updated"),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
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
              <span className="font-Circular font-medium  ">
                {t("personal_information")}
                {/* Personal information */}
              </span>
            }
            key="1"
          >
            <PersonalInfo />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium  ">
                {t("health_questionnaire")}
                {/* Health questionnaire */}
              </span>
            }
            key="2"
          >
            <div className="lg:w-3/6 md:w-full">
              <QuestionnaireForm
                ref={form}
                data={data?.patientHealthHistory?.history}
                onFinishSuccess={onFinishHealthQuestionnarySuccess}
              />

              <div className="flex items-center justify-end">
                <Button
                  loading={fetching}
                  disabled={fetching}
                  className={`ant-btn ant-btn-primary ant-btn mb-0 w-40 ${
                    isChrome && "antCustomBtn"
                  }`}
                  type="primary"
                  onClick={() => form?.current?.submit()}
                >
                  {/* Update */}
                  {t("update")}
                </Button>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium  ">
                {t("payment_settings")}
                {/* Payment settings */}
              </span>
            }
            key="3"
          >
            <PaymentMethods />
          </Tabs.TabPane>
          <Tabs.TabPane
            className={`${_classes["font-normal"]}`}
            tab={
              <span className="font-Circular font-medium  ">
                {t("transaction_history")}
                {/* Transaction history */}
              </span>
            }
            key="4"
          >
            <div className="font-normal">
              <TransactionHistory
                data={transactions?.items as Transaction[]}
                setSorting={setSorting}
                meta={transactions?.meta}
                loading={allTransactionLoading}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium  ">
                {t("email_notification")}
                {/* Email notification */}
              </span>
            }
            key="5"
          >
            <div className="w-full md:w-full lg:max-w-[60%] xl:max-w-[60%]">
              <EmailNotificationPage />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default AccountTabs;
