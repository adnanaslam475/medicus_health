import React from "react";
import Link from "next/link";
import { Form, Input, Button, Checkbox } from "antd";
import Container from "../src/common/components/Container/Container";
import { useMutation } from "urql";
import Image from "next/image";

const LOGIN_MUT = `mutation Login($email: String!, $password:String!) {
  login(options: { email: $email, password: $password }) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
}`;

const Login = () => {
  const [, login] = useMutation(LOGIN_MUT);

  const onFinish = async (values: object) => {
    console.log(values, "vvv");
    const res = login(values);
    console.log("Success:", res);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container className="login-bg">
      <div className="flex items-center justify-center py-16">
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-0">
          <div className="card p-4 shadow-lg drop-shadow-2xl rounded-lg bg-white pt-12 pb-6 px-6">
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
              Login to continue
            </h1>
            <h5 className="text-center text-darkGray">
              Enter your credentials to access your account.
            </h5>
            <div className="mt-5">
              <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email Address"
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
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <div className="flex justify-between text-base">
                    <Checkbox className="text-base">Remember me</Checkbox>
                    <Link href="/forgotPassword">Forgot Password</Link>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <Form.Item>
              <div className="flex justify-center mt-8">
                Dont have an account?{" "}
                <span className="ml-1">
                  <Link href="/signup">Register</Link>
                </span>
              </div>
            </Form.Item>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Login;
