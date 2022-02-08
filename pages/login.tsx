import React from "react";
import Link from "next/link";
import { Form, Input, Button, Checkbox } from "antd";
import Container from "../src/common/components/Container/Container";
import { useQuery } from "urql";

const Login = () => {
  const onFinish = async (values: object) => {
    console.log("Success:", values);
    reexecuteQuery();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loginQuery = `
  query($data:LoginStudentInput!) {
    login(data:$data) {
      token
    }
  }
`;

  const [result, reexecuteQuery] = useQuery({
    query: loginQuery,
    variables: {
      data: {
        email: "yasir9001@yahoo.com",
        password: "123admin",
      },
    },
  });

  console.log(result);
  return (
    <Container>
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

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Checkbox>Remember me</Checkbox>
          <Link href="/signup">Forgot Password</Link>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button
            className="ant-btn ant-btn-primary ant-btn-block nb-button"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <Form.Item
        wrapperCol={{ span: 12, offset: 6 }}
      >
        Don't have an account? <Link href="/signup">Register</Link>
      </Form.Item>
    </Container>
  );
};
export default Login;
