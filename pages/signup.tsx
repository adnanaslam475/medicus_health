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
} from "antd";
import Container from "../src/common/components/Container/Container";
// import mainLogo from '../public/assets/images/logo-medi.svg';

const { TabPane } = Tabs;

const Signup = () => {
  const [activeKey, setActiveKey] = useState("1"); // should be 1
  const [nextTab, setNextTab] = useState(true);

  const onFinish = async (values: object) => {
    setActiveKey("2");
    setNextTab(false);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = () => {
    if (activeKey === "1") {
      setActiveKey("2");
    } else {
      setActiveKey("1");
    }
  };

  const personalInfo = () => {
    return (
      <>
        {/* <h2 className="text-center font-bold">Create Your Account</h2>
        <h4 className="text-center font-normal text-xs text-darkGray">
          Create your account to start using Medicus.
        </h4> */}
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
              <Select.Option value="male">Man</Select.Option>
              <Select.Option value="female">Woman</Select.Option>
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
            <DatePicker />
          </Form.Item>
        </div>

        <Form.Item
          label="Enter Email Address"
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
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className="flex-1"
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please input your password!" }]}
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
            <Select placeholder="Country" className="nb-select-input">
              <Select.Option value="male">Pakistan</Select.Option>
              <Select.Option value="female">USA</Select.Option>
              <Select.Option value="female">Canada</Select.Option>
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

        <Form.Item wrapperCol={{ span: 3, offset: 21 }}>
          <Button
            className="ant-btn ant-btn-primary ant-btn-block nb-button"
            type="primary"
            htmlType="submit"
          >
            Next
          </Button>
        </Form.Item>
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </>
    );
  };

  const healthQuestionnare = () => {
    return (
      <>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button block> Skip This For Now & Fill This Later</Button>
        </Form.Item>
        <Form.Item
          name="radio-drink"
          label="Do you drink Alcohol?"
          rules={[{ required: true, message: "Please pick an option!" }]}
        >
          <Radio.Group defaultValue={"yes"}>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          className="flex-1"
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
          name="radio-smoke"
          label="Do you smoke?"
          rules={[{ required: true, message: "Please pick an option!" }]}
        >
          <Radio.Group defaultValue={"yes"}>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          className="flex-1"
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
          name="radio-drug"
          label="Do you take any Recreational drugs?"
          rules={[{ required: true, message: "Please pick an option!" }]}
        >
          <Radio.Group defaultValue={"yes"}>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="medical-condition"
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
          className="flex-1"
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
          className="flex-1"
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
          className="flex-1"
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
          className="flex-1"
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
        <Checkbox>
          I agree to the <Link href={"#"}>Terms & Condition</Link>
        </Checkbox>

        <Form.Item wrapperCol={{ span: 3, offset: 15 }}>
          <Button
            className="ant-btn ant-btn-primary ant-btn-block nb-button"
            type="primary"
            htmlType="submit"
          >
            Complete
          </Button>
        </Form.Item>
        <Button type="link" onClick={() => setActiveKey("1")}>
          Back
        </Button>
      </>
    );
  };

  return (
    <Container className="login-bg">
      <div className="flex items-center justify-center min-h-screen w-h-100 py-16">
        <div className="w-full sm:w-1/3 md:w-1/2 lg:w-1/2 xl:w-1/2 px-0">
          <div className="card p-4 shadow-lg drop-shadow-2xl rounded-lg bg-white py-12 px-6">
            <div className="flex justify-center mb-6"><Image
              className="main-logo mx-auto"
              height={34}
              width={216}
              src="/assets/images/logo-medi.svg"
            /></div>
            <h1 className="text-center text-secondary mb-3">
              Create Your Account
            </h1>
            <h5 className="text-center text-darkGray">
              Create your account to start using Medicus
            </h5>
            <Form
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Tabs
                defaultActiveKey="1"
                centered
                onChange={handleChange}
                activeKey={activeKey}
              >
                <TabPane tab="Personal Info" key="1">
                  {personalInfo()}
                </TabPane>
                <TabPane disabled={nextTab} tab="Health Questionnaire" key="2">
                  {healthQuestionnare()}
                </TabPane>
              </Tabs>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
