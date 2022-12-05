import React from "react";
import Link from "next/link";
import { Form, Button } from "antd";
import _Classes from "./Appointment.module.scss";
// import Container from "../../../../../common/components/Container/Container";
import Image from "next/image";

import { useRouter } from "next/router";

const AppointmentSuccess = () => {
  const onFinish = async (values: object) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { query } = useRouter();

  return (
    <>
      <div className="flex flex-col justify-center mb-6">
        <div className="flex justify-center mt-10">
          <Image
            priority={true}
            alt=""
            className="success-icon mx-auto mt-10"
            height={84}
            width={84}
            src="/assets/icon/success-big.svg"
          />
        </div>
      </div>
      <h2 className="text-center text-secondary mb-3 px-10 leading-8">
        Success!
      </h2>
      <div className="text-base text-secondary text-center">
        Your appointment has been confirmed. Please find your appointment
        details in the upcoming appointments section.
      </div>
    </>
  );
};
export default AppointmentSuccess;
