/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  useCreateUserMutation,
  useCreatePatientHealthHistoryMutation,
  CreateUserInput,
} from "../../../../../generated/graphql";
import Container from "../../../../../common/components/Container/Container";
import HealthQuestionnary from "../../../../../common/components/Questionnary/Questionnary";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import { date } from "../../../../../common/utils";
import { getToken } from "../../../../../common/utils/userData";
import { PageLoader } from "../../../../../common/components/PageLoader/PageLoader";
import successSmall from "../../../../../../public/assets/icon/success-small.svg";
import { GraphQLError } from "graphql";
import { useTranslations } from "next-intl";
import _classes from "./SignUp.module.scss";

const { TabPane } = Tabs;
const { confirm } = Modal;

interface CreateUserPayload extends CreateUserInput {
  confirmPassword?: string;
}

function Signup() {
  const t = useTranslations("Signup");

  const router = useRouter();
  const [activeKey, setActiveKey] = useState("1"); // should be 1
  const [nextTab, setNextTab] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [signupError, setSignupError] = useState<string | undefined>();
  const [signUpPayload, setSignUpPaylod] = useState<CreateUserPayload>();

  const [result, createUser] = useCreateUserMutation();
  const { fetching } = result;
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuthToken(token);
      router.push("/");
    } else {
      setAuthToken("");
    }
  }, []);

  const [, createPatientHealthHistory] =
    useCreatePatientHealthHistoryMutation();
  const handleChange = () => {
    if (activeKey === "1") {
      setActiveKey("2");
    } else {
      setActiveKey("1");
    }
  };

  function showConfirm() {
    <div className={`${_classes["confirmationsignup"]}`}>
      {confirm({
        title: t("signup_modal_skip_questionaire_message"),
        icon: <ExclamationCircleOutlined />,
        // content:
        //   "These are the mandatory fields for Book an appointment you can skip it for now and can Add/Edit later from my profile section",
        content: "",
        onOk() {
          submitPersonalInfo();
        },
        onCancel() {},
      })}
    </div>;
  }
  const onFinishHealthQuestionnaryFailed = (err: any) => {};

  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    const user = await submitPersonalInfo();
    const healthQuesJson = JSON.stringify(quesPayload);
    try {
      if (user?.data?.createUser.id) {
        await createPatientHealthHistory({
          input: {
            history: healthQuesJson,
            user_id: user?.data?.createUser.id as number,
          },
        });
        handleChange();
        setActiveKey("2");
        setNextTab(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function submitPersonalInfo() {
    let payload = signUpPayload;
    let updatedPayload = {
      ...payload,
      city_id: payload?.city_id || 0,
      state_id: payload?.state_id || 0,
    };
    if (updatedPayload) {
      updatedPayload.date_of_birth = date.convertToUTC(
        updatedPayload?.date_of_birth
      );
      delete updatedPayload.confirmPassword;
    }
    let user = null;
    try {
      user = await createUser({
        input: updatedPayload as CreateUserInput,
      });
      let errorResponse = user?.error?.graphQLErrors[0]?.extensions
        ?.response as GraphQLError;
      if (user?.error?.graphQLErrors) {
        let graphQLError = user?.error?.graphQLErrors[0]?.extensions
          ?.response as GraphQLError;
        let customError = user?.error?.graphQLErrors[0]?.extensions
          ?.exception as GraphQLError;
        let errorMessage =
          graphQLError?.message[0] ||
          customError?.message ||
          "Something went wrong";
        notification.error({
          message: errorMessage,
        });
      }
      if (!user.error?.message) {
        Router.push({
          pathname: "/successScreen",
          query: { email: updatedPayload?.email },
        });
      }
      setSignupError(errorResponse?.message[0]);
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  const skipHealthQuestions = (e: any) => {
    showConfirm();
  };

  if (authToken) {
    return <PageLoader />;
  } else {
    return (
      <Container className="login-bg w-full">
        <div className="flex items-center justify-center min-h-screen w-h-100 py-16">
          <div className="w-full sm:w-full md:w-1/2 lg:min-w-[700px] xl:min-w-[700px] px-0">
            <div className="card p-4 shadow-lg drop-shadow-2xl rounded-2xl bg-white py-12 px-6">
              <div className="flex justify-center mb-6">
                <Image
                  priority={true}
                  unoptimized={true}
                  alt=""
                  className="main-logo mx-auto"
                  height={34}
                  width={216}
                  src="/assets/images/logo-medi.svg"
                />
              </div>
              <h1 className="text-center text-secondary mb-3">
                {/* {t("createAccount")} */}
                Crea tu perfil
              </h1>
              <div className="text-center text-gray font-rubik font-normal text-sm">
                {/* {t("createYourAccountToStart")} */}
              </div>
              <div className={`${_classes["signupTabs"]} mt-5`}>
                <Tabs
                  defaultActiveKey="1"
                  centered
                  onChange={handleChange}
                  activeKey={activeKey}
                >
                  <TabPane
                    tab={
                      <span>
                        {!nextTab ? (
                          <Badge
                            className="mr-3"
                            count={
                              <Image
                                priority={true}
                                alt=""
                                className="success-small mx-auto"
                                height={22}
                                width={22}
                                src={successSmall}
                              />
                            }
                            style={{ backgroundColor: "#30cec2" }}
                          ></Badge>
                        ) : (
                          <Badge
                            className="mr-3"
                            count={1}
                            style={{ backgroundColor: "#1A82FE" }}
                          ></Badge>
                        )}
                        {!nextTab ? (
                          <span className="ml-3 text-cyan text-xs sm:text-base">
                            {t("personalInfo")}
                          </span>
                        ) : (
                          <span className="ml-3 text-xs sm:text-base">
                            {t("personalInfo")}
                          </span>
                        )}
                      </span>
                    }
                    key="1"
                  >
                    <PersonalInfo
                      onFinish={(val) => {
                        setSignUpPaylod(val);
                        setActiveKey("2");
                        setNextTab(false);
                      }}
                    />
                  </TabPane>
                  <TabPane
                    disabled={nextTab}
                    tab={
                      <span>
                        <Badge
                          count={2}
                          style={
                            nextTab
                              ? { backgroundColor: "#cdcdcd" }
                              : { backgroundColor: "#1A82FE" }
                          }
                        ></Badge>
                        <span className="ml-3 text-xs sm:text-base">
                          {t("healthQuestionnaire")}
                        </span>
                      </span>
                    }
                    key="2"
                  >
                    <HealthQuestionnary
                      isUpdateMode={false}
                      onFinishSuccess={onFinishHealthQuestionnarySuccess}
                      onFinishedFailed={onFinishHealthQuestionnaryFailed}
                      handleBackChange={handleChange}
                      skipHealthQues={skipHealthQuestions}
                      isLoading={fetching}
                      disable={true}
                      signupError={signupError}
                      setNextTab={setNextTab}
                      setActiveKey={setActiveKey}
                    />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Signup;
