import React, { useState } from "react";
import Link from "next/link";
import { Form, Input, Button, Tabs, Select, DatePicker } from "antd";
import Container from "../src/common/components/Container/Container";

const { TabPane } = Tabs;

const Signup = () => {
  const [activeKey, setActiveKey] = useState("1");
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
        <h3>Create Your Account</h3>
        <p>Create your account to start using Medicus</p>
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
      <Form
        layout="vertical"
        name="basic"
        labelCol={{ span: 12, offset: 6 }}
        wrapperCol={{ span: 12, offset: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ marginTop: "250px" }}
      >
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button
            className="ant-btn ant-btn-primary ant-btn-block"
            type="primary"
          >
            Skip This For Now & Fill This Later
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Container>
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
    </Container>
  );
};

export default Signup;
