/* eslint-disable react/jsx-key */
import React from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import Image from "next/image";
import Container from "../../../../../common/components/Container/Container";
import ForgotPasswordForm from "./ForgotPasswordForm";
import AuthLayout from "../../../../../common/components/AuthLayout/AuthLayout";

function ForgotPassword() {
  const onFinish = async (values: object) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthLayout>
      <div className="card p-4 shadow-lg drop-shadow-2xl rounded-lg bg-white pt-12 pb-6 px-6">
        <div className="flex justify-center mb-6">
          <Image
            className="mx-auto"
            height={34}
            width={216}
            src="/assets/images/logo-medi.svg"
            alt=""
          />
        </div>
        <h1 className="text-center text-secondary mb-0">Forgot Password</h1>
        <h5 className="text-center text-gray font-rubik font-normal">
          Enter your email below to reset password.
        </h5>
        <div className="mt-5">
          <ForgotPasswordForm onFinish={() => null} />
        </div>
        <Form.Item>
          <div className="flex justify-center mt-8">
            <span className="ml-2">
              <Link href="/login">
                <div className="inline-flex items-center">
                  <div className="mb-0 mr-3">
                    <Image
                      className="left-arrow-icon mx-auto"
                      height={16}
                      width={16}
                      src="/assets/icon/arrow-left.svg"
                      alt=""
                    />
                    <span className="cursor-pointer text-primary ml-3">
                      Back to login
                    </span>
                  </div>
                </div>
              </Link>
            </span>
          </div>
        </Form.Item>
      </div>
    </AuthLayout>
  );
}
export default ForgotPassword;
