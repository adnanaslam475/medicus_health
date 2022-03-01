/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HealthQuestionnary from "../src/common/components/Questionnary/questionnary";
import {
  Form,
  Input,
  Button,
  Tabs,
  Select,
  DatePicker,
  Badge,
  Modal,
  FormInstance,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import Container from "../src/common/components/Container/Container";
import {
  CreateUserInput,
  useCreateUserMutation,
  useCountriesQuery,
  useGetStatesByCountryQuery,
  useGetCitiesByStateQuery,
  useCreatePatientHealthHistoryMutation,
} from "../src/generated/graphql";

const { TabPane } = Tabs;
const { confirm } = Modal;

const Signup = () => {
  const [activeKey, setActiveKey] = useState("1"); // should be 1
  const [nextTab, setNextTab] = useState(true);
  const [form] = Form.useForm();
  const [countryId, setCountryId] = useState<number | undefined>();
  const [stateId, setStateId] = useState<number | undefined>();

  const [, createUser] = useCreateUserMutation();
  const [, createPatientHealthHistory] =
    useCreatePatientHealthHistoryMutation();

  const [getStatesByCountry] = useGetStatesByCountryQuery({
    variables: {
      input: countryId || 0,
    },
    pause: countryId === undefined,
  });

  const [getCityByState] = useGetCitiesByStateQuery({
    variables: {
      input: stateId || 0,
    },
    pause: stateId === undefined,
  });

  const [{ data }] = useCountriesQuery();
  const { countries } = data || {};

  const onFinishRegistration = async (values: any) => {
    values.date_of_birth = dayjs.utc(values.date_of_birth).format();
    delete values.confirmPassword;
    const payload: CreateUserInput = { ...values };
    try {
      const res = await createUser({
        input: payload,
      });
      handleChange();
      setActiveKey("2");
      setNextTab(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishRegistrationFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = () => {
    console.log(activeKey, "activeKey");
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
        form.submit();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  function selectCountryId(id: number): void {
    setCountryId(id);
  }

  function selectStateId(id: number): void {
    setStateId(id);
  }

  function disabledDate(current: any) {
    return current && current < dayjs().startOf("day");
  }

  const PersonalInfo = ({ form: signupForm }: { form: FormInstance<any> }) => {
    return (
      <Form
        form={signupForm}
        layout="vertical"
        onFinish={onFinishRegistration}
        onFinishFailed={onFinishRegistrationFailed}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            className="flex-1"
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please enter your first name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="flex-1"
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please enter your last name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            className="flex-1"
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please enter your gender",
              },
            ]}
          >
            <Select placeholder="Gender" className="nb-select-input">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="flex-1"
            label="Date of birth"
            name="date_of_birth"
            rules={[
              {
                required: true,
                message: "Please select date of birth",
              },
            ]}
          >
            <DatePicker className="w-full" disabledDate={disabledDate} />
          </Form.Item>
        </div>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email address",
            },
            {
              type: "email",
              message: "Email is invalid",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            className="flex-1"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className="flex-1"
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            className="flex-1"
            label="Cell Number"
            name="contact_number"
            rules={[
              {
                required: true,
                message: "Please enter your Cell Number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="flex-1"
            label="Country"
            name="country_id"
            rules={[
              {
                required: true,
                message: "Please enter your country",
              },
            ]}
          >
            <Select
              onChange={(e) => {
                selectCountryId(e);
                signupForm.setFieldsValue({
                  state_id: null,
                  city_id: null,
                });
              }}
              placeholder="Country"
            >
              {countries?.map((el, i) => {
                return (
                  <Select.Option key={i} value={el?.id}>
                    {el?.country_name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            className="flex-1"
            label="State"
            name="state_id"
            rules={[
              {
                required: true,
                message: "Please enter your state",
              },
            ]}
          >
            <Select
              onChange={(e) => {
                selectStateId(e);
                signupForm.setFieldsValue({
                  city_id: null,
                });
              }}
              placeholder="State"
            >
              {getStatesByCountry?.data?.getStatesByCountry?.map((el, i) => {
                return (
                  <Select.Option key={i} value={el.id}>
                    {el?.state_name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            className="flex-1"
            label="City"
            name="city_id"
            rules={[
              {
                required: true,
                message: "Please enter your city",
              },
            ]}
          >
            <Select placeholder="City">
              {getCityByState?.data?.getCitiesByState?.map((el, i) => {
                return (
                  <Select.Option key={i} value={el.id}>
                    {el?.city_name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            className="flex-1"
            label="Zip"
            name="zip_code"
            rules={[
              {
                required: true,
                message: "Please enter your zip",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="flex justify-end">
          <Form.Item>
            <Button
              className="ant-btn ant-btn-primary ant-btn-block nb-button"
              type="primary"
              htmlType="submit"
            >
              Next
            </Button>
          </Form.Item>
        </div>
        <div className="flex justify-center mt-8">
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </Form>
    );
  };
  const onFinishHealthQuestionnaryFailed = (err: any) => {
    console.log(err, "eerrr");
  };

  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    form.submit();
    const healthQuesJson = JSON.stringify(quesPayload);
    try {
      const res = await createPatientHealthHistory({
        input: { history: healthQuesJson, user_id: 123 },
      });
      console.log(res);
      handleChange();
      setActiveKey("2");
      setNextTab(false);
    } catch (err) {
      console.log(err);
    }
  };

  const skipHealthQuestions = (e: any) => {
    showConfirm();
  };

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
            <h5 className="text-center text-darkGray">
              Create your account to start using Medicus
            </h5>
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
                              src="/assets/icon/success-small.svg"
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
                  <PersonalInfo form={form} />
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
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
