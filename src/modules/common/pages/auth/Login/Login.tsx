import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import Image from "next/image";
import Container from "../../../../../common/components/Container/Container";
import {
  LoginUserInput,
  useLoginMutation,
} from "../../../../../generated/graphql";
import { getRole, getToken } from "../../../../../common/utils/userData";
import { PageLoader } from "../../../../../common/components/PageLoader/PageLoader";
import { useTranslations } from "next-intl";
import engFlag from "../../../../../../public/assets/images/engFlag.png";
import espanolFlag from "../../../../../../public/assets/images/espanolFlag.png";
import { useUserData } from "common/components/Context/UserContext";

function Login() {
  const t = useTranslations("Login");
  const [authToken, setAuthToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const token = getToken();
      const role = getRole();
      if (token) {
        setAuthToken(token);
        if (role === "Doctor") {
          router.push("/physician/dashboard");
        } else if (role === "User") {
          if (router.query.doctor_id) {
            Router.push({
              pathname: `/patient/physicians/profile/${router.query.doctor_id}`,
            });
          } else if (router.query.physicians) {
            Router.push({
              pathname: `/patient/physicians`,
            });
          } else {
            router.push("/patient/appointments/upcoming");
          }
        } else if (role === "Admin") {
          router.push("/admin/dashboards");
        }
      } else {
        setAuthToken("");
      }
    }
  }, [router.isReady]);

  const [result, login] = useLoginMutation();
  const { error, fetching } = result;
  const { data: userContextData, saveUserData } = useUserData();
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
        saveUserData?.({
          firstName: userPayload?.user?.first_name,
          lastName: userPayload?.user?.last_name,
          profilePicture:
            userPayload?.user?.doctorProfile?.profile_image ||
            userPayload?.user?.patientProfile?.profileImage ||
            userPayload?.user?.adminProfilePicture?.profile_picture,
        });
        localStorage.setItem("loggedInUserData", JSON.stringify(userPayload));
        localStorage.setItem("loginTime", String(new Date().getTime()));
        localStorage.setItem(
          "timeZone",
          JSON.stringify(userPayload?.user?.timeZone?.timeZone)
        );
        localStorage.setItem(
          "appointmentsAlertData",
          JSON.stringify({
            canceled: 0,
            history: 0,
            pending: 0,
            upcoming: 0,
            propose: 0,
            reschedule: 0,
            firstLogin: true,
          })
        );
        if (
          userPayload.user.role === "Doctor" ||
          userPayload.user.role === "Staff"
        ) {
          Router.replace({
            pathname: "/physician/appointments/upcoming",
            // pathname: "/physician/dashboard",
          });
        } else if (userPayload.user.role === "User") {
          if (router.query.doctor_id) {
            Router.push({
              pathname: `/patient/physicians/profile/${router.query.doctor_id}`,
            });
          } else if (router.query.physicians) {
            Router.push({
              pathname: `/patient/physicians`,
            });
          } else {
            Router.push("/patient/appointments/upcoming");
          }
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
        {/* <div className="flagDiv w-56 h-12 flex items-center">
          <div className="flagAvatar enFlag">
            <Image
              priority={true}
              alt=""
              className="success-icon mx-auto mt-10"
              height={30}
              width={30}
              src={engFlag}
            />
          </div>
          <div className="flagAvatar spFlag">
            <Image
              priority={true}
              alt=""
              className="success-icon mx-auto mt-10"
              height={30}
              width={30}
              src={espanolFlag}
            />
          </div>
        </div> */}
        <div className="flex items-center justify-center min-h-screen w-h-100 py-16 rounded-3xl">
          <div className="w-full sm:w-full md:w-full lg:w-1/2 xl:max-w-[500px] px-0">
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
              <h1 className="text-center text-secondary mb-3 font-bold">
                {t("title")}
              </h1>
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
                    // label={t("email")}
                    label="Correo electrónico"
                    name="email"
                    className="mb-1"
                    rules={[
                      {
                        required: true,
                        // message: t("email_address_message"),
                        message:
                          "Por favor, introduzca su dirección de correo electrónico.",
                      },
                      {
                        type: "email",
                        message: "El correo electrónico es invalido",
                        // message: t("email_invalid_message"),
                        // message: "Email is invalid",
                      },
                    ]}
                  >
                    <Input disabled={fetching} />
                  </Form.Item>

                  <Form.Item
                    label="Contraseña"
                    // label={t("password")}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor, introduzca su contraseña!",
                        // message: t("password_message"),
                        // message: "Please enter your password",
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
                        <span className="text-gray text-base">
                          Recordarme
                          {/* {t("remember")} */}
                        </span>
                      </Checkbox>
                      <Link href="/forgotPassword">
                        <a>
                          <span className="text-primary cursor-pointer">
                            ¿Olvidó su contraseña?
                            {/* ¿Olvidó su contraseña?  */}
                            {/* {t("forgot")} */}
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
                      {/* {t("login")} */}
                      Iniciar sesión
                    </Button>
                  </Form.Item>

                  {error?.message && (
                    <>
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
                  {/* {t("account")} */}
                  ¿No tiene una cuenta?
                  <span className="ml-1">
                    <Link href="/signup">
                      {/* {t("register")} */}
                      Registrarme
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
}
export default Login;
