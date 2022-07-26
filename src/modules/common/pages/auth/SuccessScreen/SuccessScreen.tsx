import React from "react";
import Link from "next/link";
import { Form, Button } from "antd";
import Container from "../../../../../common/components/Container/Container";
import Image from "next/image";

import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const SuccessScreen = () => {
  const t = useTranslations("SuccessScreen");
  const onFinish = async (values: object) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { query } = useRouter();
  return (
    <Container className="login-bg w-full">
      <div className="flex items-center justify-center min-h-screen w-h-100 py-16">
        <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/2 px-0">
          <div className="card p-4 shadow-lg drop-shadow-2xl rounded-lg bg-white pt-24 pb-12 px-6">
            <div className="flex flex-col justify-center mb-6">
              <Image
                priority={true}
                unoptimized={true}
                alt=""
                className="mx-auto"
                height={34}
                width={216}
                src="/assets/images/logo-medi.svg"
                // loading="eager"
              />
              <div className="flex justify-center mt-10">
                <Image
                  priority={true}
                  alt=""
                  className="success-icon mx-auto mt-10"
                  height={84}
                  width={84}
                  src="/assets/icon/success-big.svg"
                  // loading="eager"
                />
              </div>
            </div>
            <h2 className="text-center text-secondary mb-3 px-10 leading-8">
              {t("success_your_account_has_been_created")}
            </h2>
            <p className="text-base text-gray text-center px-7">
              {t("we_have_sent_you_an_email_on")}
              <span className="text-secondary">{` ${query?.email} `}</span>
              {t("verify_your_account_by_click")}
            </p>
            <div className="mt-5">
              <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item>
                  <div className="text-center flex justify-center">
                    <Button
                      className="ant-btn ant-btn-secondary ant-btn nb-button"
                      type="primary"
                      htmlType="submit"
                    >
                      <Link href="/login">
                        {t("login")}
                        {/* Login */}
                      </Link>
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default SuccessScreen;
