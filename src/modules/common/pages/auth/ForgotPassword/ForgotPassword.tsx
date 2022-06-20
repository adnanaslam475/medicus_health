import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Form, Input, Button, Alert } from "antd";
import Image from "next/image";
import { getToken } from "../../../../../common/utils/userData";
import { PageLoader } from "../../../../../common/components/PageLoader/PageLoader";
import Container from "../../../../../common/components/Container/Container";

import { useUserForgotPasswordMutation } from "../../../../../generated/graphql";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuthToken(token);
      router.push("/");
    } else {
      setAuthToken("");
    }
  }, []);

  // Forgot Password API call

  const [forgotPass, setForgotPass] = useUserForgotPasswordMutation();
  const { error, fetching, data } = forgotPass;

  const onFinish = async (value: { email: string }) => {
    let payload = value.email;
    try {
      const res = await setForgotPass({
        input: payload as string,
      });
      if (!error) {
        form.setFieldsValue({
          email: null,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (authToken) {
    return <PageLoader />;
  } else {
    return (
      <Container className="login-bg w-full">
        <div className="flex items-center justify-center min-h-screen w-h-100 py-16">
          <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/2 px-0">
            <div className="card p-4 shadow-lg drop-shadow-2xl rounded-lg bg-white pt-12 pb-6 px-6">
              <div className="flex justify-center mb-16">
                <Image
                  priority={true}
                  unoptimized={true}
                  alt=""
                  className="main-logo mx-auto"
                  height={34}
                  width={216}
                  src="/assets/images/logo-medi.svg"
                  loading="eager"
                />
              </div>
              <h1 className="text-center text-secondary mb-0">
                Forgot Password
              </h1>
              <h5 className="text-center text-gray font-rubik font-normal">
                Enter your email below to reset password.
              </h5>
              <div className="mt-5">
                <Form
                  form={form}
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
                        type: "email",
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
                      loading={fetching}
                      disabled={fetching}
                      className="ant-btn ant-btn-secondary ant-btn-block nb-button"
                      type="primary"
                      htmlType="submit"
                    >
                      Reset Password
                    </Button>
                  </Form.Item>

                  {error?.graphQLErrors[0].message && (
                    <Alert
                      className=""
                      message={error?.graphQLErrors[0].message}
                      type="error"
                    />
                  )}
                  {data?.UserForgotPassword && (
                    <Alert
                      className=""
                      message={
                        "Your password reset link has been sent on your email please check!"
                      }
                      type="success"
                    />
                  )}
                </Form>
              </div>
              <Form.Item>
                <div className="flex justify-center mt-8">
                  <span className="ml-2">
                    <Link href="/login">
                      <div className="inline-flex items-center">
                        <div className="mb-0 mr-3 inline-flex items-center">
                          <Image
                            priority={true}
                            alt=""
                            className="left-arrow-icon mx-auto"
                            height={16}
                            width={16}
                            src="/assets/icon/arrow-left.svg"
                            loading="eager"
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
  }
};
export default ForgotPassword;
