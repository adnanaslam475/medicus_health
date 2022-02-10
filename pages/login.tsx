import React from "react";
import Link from "next/link";
import { Form, Input, Button, Checkbox, Card } from "antd";
import Container from "../src/common/components/Container/Container";
import { useQuery } from "urql";
import Image from "next/image";

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

  return (
    <Container className="login-bg">
      <div className="flex items-center justify-center min-h-screen w-h-100 py-16">
        <div className="w-full sm:w-1/3 md:w-1/2 lg:w-1/2 xl:w-1/2 px-0">
          <div className="card p-4 shadow-lg rounded-lg bg-white py-12 px-6">
          <div className="flex justify-center mb-6"><Image
              className="main-logo mx-auto"
              height={34}
              width={216}
              src="/assets/images/logo-medi.svg"
            /></div>
            <h1 className="text-center text-secondary mb-3">
              Login to continue
            </h1>
            <h5 className="text-center text-darkGray">
              Enter your credentials to access your account.
            </h5>
            <Form
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Enter Email Address"
                name="email"
                className="mb-1"
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
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base">
                  Remember me
                </Checkbox>
                <Link href="/signup">Forgot Password</Link>
              </Form.Item>

              <Form.Item>
                <Button
                  className="ant-btn ant-btn-secondary ant-btn-block nb-button"
                  type="primary"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Form.Item>
              Dont have an account? <Link href="/signup">Register</Link>
            </Form.Item>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Login;
