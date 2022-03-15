/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
  useCreateUserMutation,
  useCreatePatientHealthHistoryMutation,
  CreateUserInput,
} from "../../../../../generated/graphql";
import Container from "../../../../../common/components/Container/Container";
import HealthQuestionnary from "../../../../../common/components/Questionnary/questionnary";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import { date } from "../../../../../common/utils";
import { getToken } from "../../../../../common/utils/userData";
import { PageLoader } from "../../../../../common/components/PageLoader/PageLoader";
import successSmall from "../../../../../../public/assets/icon/success-small.svg"

const { TabPane } = Tabs;
const { confirm } = Modal;

interface CreateUserPayload extends CreateUserInput {
  confirmPassword?: string;
}

function Signup() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState("1"); // should be 1
  const [nextTab, setNextTab] = useState(true);
  const [authToken, setAuthToken] = useState(false);

  const [signUpPayload, setSignUpPaylod] = useState<CreateUserPayload>();

  const [result, createUser] = useCreateUserMutation();
  const { fetching } = result;
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuthToken(token);
      router.push("/");
    } else {
      setAuthToken(false);
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
    confirm({
      title: "",
      icon: <ExclamationCircleOutlined />,
      content:
        "These are the mandatory fields for Book an Appointment you can Skip it for now and can Add/Edit later from My Profile section",
      onOk() {
        submitPersonalInfo();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  const onFinishHealthQuestionnaryFailed = (err: any) => {
    console.log(err, "eerrr");
  };

  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    const user = await submitPersonalInfo();
    const healthQuesJson = JSON.stringify(quesPayload);
    try {
      await createPatientHealthHistory({
        input: {
          history: healthQuesJson,
          user_id: user?.data?.createUser.id as number,
        },
      });
      handleChange();
      setActiveKey("2");
      setNextTab(false);
    } catch (err) {
      console.log(err);
    }
  };

  async function submitPersonalInfo() {
    let pyaload = signUpPayload;
    if (pyaload) {
      pyaload.date_of_birth = date.convertToUTC(pyaload?.date_of_birth);
      delete pyaload.confirmPassword;
    }
    let user = null;
    try {
      user = await createUser({
        input: pyaload as CreateUserInput,
      });
      Router.push({
        pathname: "/successScreen",
        query: { email: pyaload?.email },
      });
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
      <Container className="login-bg w-full mx-auto">
        <div className="flex items-center justify-center min-h-screen w-h-100 py-16">
          <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/2 px-0">
            <div className="card p-4 shadow-lg drop-shadow-2xl rounded-lg bg-white py-12 px-6">
              <div className="flex justify-center mb-6">
                <Image
                  alt=""
                  className="main-logo mx-auto"
                  height={34}
                  width={216}
                  src="/assets/images/logo-medi.svg"
                />
              </div>
              <h1 className="text-center text-secondary mb-3">
                Create Your Account
              </h1>
              <div className="text-center text-gray font-rubik font-normal text-sm">
                Create your account to start using Medicus
              </div>
              <div className="mt-5">
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
                            Personal Info
                          </span>
                        ) : (
                          <span className="ml-3 text-xs sm:text-base">
                            Personal Info
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
                          Health Questionnaire
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
