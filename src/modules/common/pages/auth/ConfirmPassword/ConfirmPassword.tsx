/* eslint-disable react/jsx-key */
import React from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import Image from "next/image";
import Container from "../../../../../common/components/Container/Container";
import ConfirmPasswordForm from "./ConfirmPasswordForm";
import { useUserResetPasswordMutation } from "../../../../../generated/graphql";

function ConfirmPassword() {
  const onFinish = async (values: object) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


   // Reset Password API call

   const [resetPass, setResetPass] = useUserResetPasswordMutation();
   const { error, fetching } = resetPass;
   console.log(error);
   const onFinish = async (values: object) => {
     let payload = values;
     try {
       const res = await setResetPass({
         input: payload as string,
       });
     } catch (err) {
       console.log(err);
     }
   };

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
              <ConfirmPasswordForm onFinish={()=> null} />
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
        </div>
      </div>
    </Container>
  );
}
export default ConfirmPassword;
