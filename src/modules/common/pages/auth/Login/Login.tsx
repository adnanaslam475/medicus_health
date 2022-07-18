import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "../../../../../common/components/Container/Container";
import {
  LoginUserInput,
  useLoginMutation,
} from "../../../../../generated/graphql";
import { getRole, getToken } from "../../../../../common/utils/userData";
import { PageLoader } from "../../../../../common/components/PageLoader/PageLoader";
import PurifiedInnerHtml from "common/components/PurifiedInnerHtml/PurifiedInnerHtml";

function Login() {
  const t = useTranslations("Login");
  const [authToken, setAuthToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const role = getRole();
    if (token) {
      setAuthToken(token);
      if (role === "Doctor") {
        router.push("/physician/dashboard");
      } else if (role === "User") {
        router.push("/patient/appointments/upcoming");
      } else if (role === "Admin") {
        router.push("/admin/dashboards");
      }
    } else {
      setAuthToken("");
    }
  }, []);

  const [result, login] = useLoginMutation();
  const { error, fetching } = result;
  const onFinish = async (values: any) => {
    let payload = { ...values };
    delete payload.remember;
    try {
      const res = await login({
        input: payload as LoginUserInput,
      });
      if (res.data && !res.error) {
        let userPayload: any = res?.data?.login;
        userPayload.remember = values.remember;
        localStorage.setItem("loggedInUserData", JSON.stringify(userPayload));
        localStorage.setItem("loginTime", String(new Date().getTime()));
        if (
          userPayload.user.role === "Doctor" ||
          userPayload.user.role === "Staff"
        ) {
          Router.replace({
            pathname: "/physician/dashboard",
          });
        } else if (userPayload.user.role === "User") {
          Router.replace({
            pathname: "/es/patient/appointments/upcoming",
          });
        } else if (userPayload.user.role === "Admin") {
          Router.replace({
            pathname: "/admin/dashboards",
          });
        }
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
      <Container className="login-bg">
        <div className="flex items-center justify-center min-h-screen w-h-100 py-16  rounded-3xl">
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:max-w-[500px] px-0">
            <div className="card p-4 shadow-lg drop-shadow-2xl rounded-2xl bg-white pt-12 pb-6 px-6">
              <div className="flex justify-center mb-6">
                <Image
                  priority={true}
                  unoptimized={true}
                  alt=""
                  className="main-logo mx-auto"
                  height={34}
                  width={216}
                  src="/assets/images/logo-medi.svg"
                  // loading="eager"
                />
              </div>
              <h1 className="text-center text-secondary mb-3">{t("title")}</h1>
              <h6 className="text-center text-gray font-rubik font-normal">
                {t("description")}
              </h6>
              <div className="mt-5">
                <Form
                  layout="vertical"
                  initialValues={{ remember: false }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label={t("email")}
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
                    <Input disabled={fetching} />
                  </Form.Item>

                  <Form.Item
                    label={t("password")}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password",
                      },
                    ]}
                  >
                    <Input.Password disabled={fetching} />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <div className="flex justify-between text-base">
                      <Checkbox
                        disabled={fetching}
                        className="text-gray primary-checkbox"
                      >
                        <span className="text-gray">{t("remember")}</span>
                      </Checkbox>
                      <Link href="/forgotPassword">
                        <a>
                          <span className="text-primary cursor-pointer">
                            {t("forgot")}
                          </span>
                        </a>
                      </Link>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      disabled={fetching}
                      loading={fetching}
                      block
                      type="primary"
                      htmlType="submit"
                    >
                      {t("login")}
                    </Button>
                  </Form.Item>

                  {error?.message && (
                    <>
                      {/* <PurifiedInnerHtml></PurifiedInnerHtml> */}
                      {/* <Alert
                        className=""
                        message={error?.message.split("]")[1].trim()}
                        type="error"
                      /> */}
                      <p
                        className="text-white	bg-red p-3 rounded resendClass"
                        dangerouslySetInnerHTML={{
                          __html: error?.message.split("]")[1].trim(),
                        }}
                      ></p>
                    </>
                  )}
                </Form>
              </div>
              <Form.Item>
                <div className="flex justify-center mt-8">
                  {t("account")}
                  <span className="ml-1">
                    <Link href="/signup">{t("register")}</Link>
                  </span>
                </div>
              </Form.Item>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
export default Login;
