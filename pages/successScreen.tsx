import React from "react";
import Link from "next/link";
import { Form, Input, Button, Checkbox, Card } from "antd";
import Container from "../src/common/components/Container/Container";
import { useQuery } from "urql";
import Image from "next/image";

const successScreen = () => {
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
    <Container className="login-bg w-full">
      <div className="flex items-center justify-center py-16">
        <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-2/3 px-0">
          <div className="card p-4 shadow-lg drop-shadow-2xl rounded-lg bg-white pt-24 pb-12 px-6">
            <div className="flex flex-col justify-center mb-6">
              <Image
                className="main-logo mx-auto"
                height={34}
                width={216}
                src="/assets/images/logo-medi.svg"
              />
              <div className="flex justify-center mt-10">
                <Image
                  className="success-icon mx-auto mt-10"
                  height={84}
                  width={84}
                  src="/assets/icon/success-big.svg"
                />
              </div>
            </div>
            <h2 className="text-center text-secondary mb-3 px-10 leading-8">
              Success! Your account has been created.
            </h2>
            <p className="text-gray text-center text-xs px-7">
              We have sent you an email on{" "}
              <span className="text-secondary">markmanson@gmail.com.</span>{" "}
              Please click on the verification link and your account will be
              verified.
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
                      <Link href="/login">Login</Link>
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
export default successScreen;
