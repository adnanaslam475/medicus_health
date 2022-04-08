/* eslint-disable react/jsx-key */
import React from "react";
import Link from "next/link";
import { Form, Input, Button, Alert } from "antd";
import Image from "next/image";
import Container from "../../../../../common/components/Container/Container";
import ConfirmPasswordForm from "./ConfirmPasswordForm";
import {
  ResetPasswordInput,
  useUserResetPasswordMutation,
} from "../../../../../generated/graphql";
import Router, { useRouter } from "next/router";

function ConfirmPassword() {
  // Reset Password API call

  const [result, resetPassword] = useUserResetPasswordMutation();
  const { error, fetching, data } = result;
  const router = useRouter();
  const { token } = router.query;

  async function onConfirmPassword(data: { password: string }) {
    const payload = {
      password: data.password,
      password_token: token,
    };

    try {
      const res = await resetPassword({
        input: payload as ResetPasswordInput,
      });
      // if (res.data && !res.error) {
      //   Router.replace({
      //     pathname: "/login",
      //   });
      // }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container className="login-bg w-full">
      <div className="flex items-center justify-center min-h-screen w-h-100 py-16">
        <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/2 px-0">
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
            <h1 className="text-center text-secondary mb-3">
              Confirm Password
            </h1>
            <h5 className="text-center text-gray font-rubik font-normal">
              Enter your new password
            </h5>
            <div className="mt-5">
              <ConfirmPasswordForm
                onFinish={(data) => onConfirmPassword(data)}
                loading={fetching}
                response={error}
              />
              {error?.message && (
                <Alert
                  className=""
                  message={error?.message.split("]")[1].trim()}
                  type="error"
                />
              )}
              {data && (
                <Alert
                  className=""
                  message="Your password has been reset!"
                  type="success"
                  // action={
                  //   <Link href="/login" passHref>
                  //     <Button size="small" type="primary">
                  //       Login
                  //     </Button>
                  //   </Link>
                  // }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default ConfirmPassword;
