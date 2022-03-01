import React from "react";
import Link from "next/link";
import { Form, Input, Button, Checkbox, Card } from "antd";
import Container from "../src/common/components/Container/Container";
import Image from "next/image";

const ForgotPassword = () => {
  const onFinish = async (values: object) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container className="login-bg w-full">
      <div className="flex items-center justify-center min-h-screen w-h-100 py-16">
        <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/2 px-0">
          <div className="card p-4 shadow-lg drop-shadow-2xl rounded-lg bg-white pt-12 pb-6 px-6">
            <div className="flex justify-center mb-16">
              <Image
                alt=""
                className="main-logo mx-auto"
                height={34}
                width={216}
                src="/assets/images/logo-medi.svg"
              />
            </div>
            <h1 className="text-center text-secondary mb-0">Forgot Password</h1>
            <h5 className="text-center text-gray font-rubik font-normal">
              Enter your email below to reset password.
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
                      required: false,
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

                <Form.Item>
                  <Button
                    className="ant-btn ant-btn-secondary ant-btn-block nb-button"
                    type="primary"
                    htmlType="submit"
                  >
                    Reset Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <Form.Item>
              <div className="flex justify-center mt-8">
                <span className="ml-2">
                  <Link href="/login">
                    <div className="inline-flex items-center">
                      <div className="mb-0 mr-3 inline-flex items-center">
                        <Image
                          alt=""
                          className="left-arrow-icon mx-auto"
                          height={16}
                          width={16}
                          src="/assets/icon/arrow-left.svg"
                        />
                        <span className="cursor-pointer text-primary ml-3">
                          Back to log in
                        </span>
                      </div>
                    </div>
                  </Link>
                </span>
              </div>
            </Form.Item>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ForgotPassword;
