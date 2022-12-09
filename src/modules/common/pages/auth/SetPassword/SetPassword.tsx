/* eslint-disable react/jsx-key */
import React from "react";
import Link from "next/link";
import { Form, Input, Button, Alert } from "antd";
import Image from "next/image";
import Container from "../../../../../common/components/Container/Container";
import ConfirmPasswordForm from "../ConfirmPassword/ConfirmPasswordForm";
import {
  ResetPasswordInput,
  useSetDoctorPasswordMutation,
} from "../../../../../generated/graphql";
import Router, { useRouter } from "next/router";
import { useTranslations } from "next-intl";

function SetPassword() {
  const t = useTranslations("Common");
  // Set Doctor Password API call

  const [result, setDoctorPassword] = useSetDoctorPasswordMutation();
  const { error, fetching, data } = result;
  const router = useRouter();
  const { token } = router.query;

  async function onConfirmPassword(data: { password: string }) {
    const payload = {
      password: data.password,
      password_token: token,
    };

    try {
      const res = await setDoctorPassword({
        setPasswordInput: payload as ResetPasswordInput,
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
        <div className="w-full sm:w-full md:w-1/2 lg:max-w-[500px] xl:max-w-[500px] px-0">
          <div className="card p-4 shadow-lg drop-shadow-2xl rounded-2xl bg-white py-12 px-6">
            <div className="flex justify-center mb-6">
              <Image
                priority={true}
                unoptimized={true}
                className="mx-auto"
                height={34}
                width={216}
                src="/assets/images/logo-medi.svg"
                alt=""
                // loading="eager"
              />
            </div>
            <h1 className="text-center text-secondary mb-3">
              {t("set_password")}
            </h1>
            <h5 className="text-center text-gray font-rubik font-normal">
              {t("enter_your_new_password")}
              {/* Enter your new password */}
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
                  message={t("your_password_has_been_set")}
                  type="success"
                />
              )}
            </div>
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
                      />
                      <span className="cursor-pointer text-primary ml-3">
                        {t("back_to_log_in")}
                      </span>
                    </div>
                  </div>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default SetPassword;
