import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Form,
  Input,
  Button,
  Tabs,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Badge,
  Modal, Space
} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Container from "../src/common/components/Container/Container";

const { TabPane } = Tabs;
const { confirm } = Modal;

const Signup = () => {
  const [activeKey, setActiveKey] = useState("1"); // should be 1
  const [nextTab, setNextTab] = useState(true);

  const onFinishRegistration = async (values: object) => {
    handleChange();
    setNextTab(false);
    console.log("Success:", values);
  };

  const onFinishRegistrationFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishHealthQuestionnary = async (values: object) => {
    handleChange();
    setNextTab(false);
    console.log("Success:", values);
  };

  const onFinishHealthQuestionnaryFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = () => {
    console.log("chal gya");
    console.log(activeKey, "activeKey");
    if (activeKey === "1") {
      setActiveKey("2");
    } else {
      setActiveKey("1");
    }
  };
  console.log(nextTab, "nextTab");

  function showConfirm() {
    confirm({
      title: '',
      icon: <ExclamationCircleOutlined />,
      content: 'These are the mandatory fields for Book an Appointment you can Skip it for now and can Add/Edit later from My Profile section',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const personalInfo = () => {
    return (
      <Form
        layout="vertical"
        onFinish={onFinishRegistration}
        onFinishFailed={onFinishRegistrationFailed}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            className="flex-1"
            label="First Name"
            name="firstName"
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
            name="lastName"
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
            name="dob"
            rules={[
              {
                required: true,
                message: "Please select date of birth",
              },
            ]}
          >
            <DatePicker className="w-full" />
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
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className="flex-1"
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            className="flex-1"
            label="Cell Number"
            name="cellNumber"
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
            name="country"
            rules={[
              {
                required: true,
                message: "Please enter your country",
              },
            ]}
          >
            <Select placeholder="Country">
              <Select.Option value="pakistan">Pakistan</Select.Option>
              <Select.Option value="usa">USA</Select.Option>
              <Select.Option value="canada">Canada</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            className="flex-1"
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: "Please enter your city",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="flex-1"
            label="State"
            name="state"
            rules={[
              {
                required: true,
                message: "Please enter your country",
              },
            ]}
          >
            <Select placeholder="State" className="nb-select-input">
              <Select.Option value="one">one</Select.Option>
              <Select.Option value="two">two</Select.Option>
              <Select.Option value="three">three</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            className="flex-1"
            label="Zip"
            name="zip"
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

  const healthQuestionnare = () => {
    return (
      <Form
        initialValues={{
          radio_drink: "yes",
          radio_smoke: "yes",
          radio_drug: "yes",
        }}
        layout="vertical"
        onFinish={onFinishHealthQuestionnary}
        onFinishFailed={onFinishHealthQuestionnaryFailed}
      >
        <Form.Item>
          <Button block onClick={showConfirm}> Skip This For Now & Fill This Later</Button>
        </Form.Item>
        <Form.Item
          name="radio_drink"
          label="Do you drink Alcohol?"
          className="text-secondary"
          rules={[{ required: true, message: "Please pick an option!" }]}
        >
          <Radio.Group defaultValue={"yes"}>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          className="flex-1 text-secondary"
          label="How many Drinks on average and how offen?"
          name="drinks"
          rules={[
            {
              required: true,
              message: "Please fill filed",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="radio_smoke"
          label="Do you smoke?"
          className="text-secondary"
          rules={[{ required: true, message: "Please pick an option!" }]}
        >
          <Radio.Group defaultValue={"yes"}>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          className="flex-1 text-secondary"
          label="How many and for how long do you smoke?"
          name="smoke"
          rules={[
            {
              required: true,
              message: "Please fill filed",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="radio_drug"
          label="Do you take any Recreational drugs?"
          className="text-secondary"
          rules={[{ required: true, message: "Please pick an option!" }]}
        >
          <Radio.Group defaultValue={"yes"}>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="medical-condition"
          className="text-secondary"
          label="Please list any current medical conditions and/or past medical conditions you have experienced, (You can select multiple)"
        >
          <Checkbox>Stroke</Checkbox>
          <br />
          <Checkbox>Asthma</Checkbox>
          <br />
          <Checkbox>Cancer</Checkbox>
          <br />
          <Checkbox>Diabetes</Checkbox>
          <br />
          <Checkbox>Other</Checkbox>
        </Form.Item>
        <Form.Item className="flex-1" name="medical">
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-1 text-secondary"
          label="Please list any known allergies"
          name="allergies"
          rules={[
            {
              required: true,
              message: "Please fill",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-1 text-secondary" 
          label="Please explain any adverse/side affects you have experienced from medications"
          name="side-effects"
          rules={[
            {
              required: true,
              message: "Please fill",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-1 text-secondary"
          label="Please list any current medication you are taking and provide the dosage, and frequency"
          name="current-medication"
          rules={[
            {
              required: true,
              message: "Please fill",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-1 text-secondary"
          label="Please list any medical problems that are common/genetically inherited in your family"
          rules={[
            {
              required: true,
              message: "Please fill",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="flex justify-between items-center">
          <Checkbox>
            <span className="mb-10 text-gray">I agree to the <Link href={"#"}>Terms & Condition</Link></span>
          </Checkbox>

          <Form.Item className="mb-0">
            <Button
              className="ant-btn ant-btn-primary ant-btn-block mb-0"
              type="primary"
              htmlType="submit"
            >
              Complete
            </Button>
          </Form.Item>
        </div>
       
        <div className="flex justify-center">
        <div className="inline-flex items-center">
          <div className="mb-0">
            <Button type="link" onClick={() => handleChange()}>
              <span><Image
              className="left-arrow-icon mx-auto mt-3"
              height={16}
              width={16}
              src="/assets/icon/arrow-left.svg"
            /></span><span className="ml-3">Back</span>
            </Button>
          </div>
        </div>
        </div>
      </Form>
    );
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
                        <span className="ml-3 text-cyan">Personal Info</span>
                      ) : (
                        <span className="ml-3">Personal Info</span>
                      )}
                    </span>
                  }
                  key="1"
                >
                  {personalInfo()}
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
                      <span className="ml-3">Health Questionnaire</span>
                    </span>
                  }
                  key="2"
                >
                  {healthQuestionnare()}
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
