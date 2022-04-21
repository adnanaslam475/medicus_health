import React from "react";
import { Avatar } from "antd";
import successImage from "../../../../../public/assets/images/success.svg";
import Image from "next/image";
import Router from "next/router";

function SuccessMessage() {
  return (
    <>
      <div className="w-full text-center">
        <Avatar
          size={64}
          src={
            <Image
              alt="successMessage"
              src={successImage}
              width={128}
              height={128}
            />
          }
        />
        <h1 className="mt-3 mb-0">Success!</h1>
        <p className="text-seconday text-base">
          Your appointment has been requested. You will <br /> get a
          notification once the doctor will confirm <br />
          the appointment. Thank you.
        </p>
        <button 
          className="text-white bg-primary text-sm rounded-md p-3 px-8"
          onClick={() => Router.push("/patient/appointments/upcoming")}
          >
          Back to Appointments
        </button>
      </div>
    </>
  );
}
export default SuccessMessage;
