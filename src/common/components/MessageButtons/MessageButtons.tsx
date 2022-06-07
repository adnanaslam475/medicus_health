import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
const { TextArea } = Input;
import Router from "next/router";
import _classes from "./MessageButtons.module.scss";

const MessageButtons = () => {
  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn"]} mr-3`}
          onClick={() => Router.push("/physician/messages")}
          // onClick={() =>
          //   Router.push({
          //     pathname: "/admin/messages",
          //     query: {
          //       chat: "admin",
          //       patientId: adminApp_Details?.patient.patient_id,
          //     },
          //   })
          // }
        >
          Message Patient
        </Button>
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn"]}`}
          onClick={() => Router.push("/physician/messages")}
          // onClick={() =>
          //   Router.push({
          //     pathname: "/admin/messages",
          //     query: {
          //       chat: "admin",
          //       doctorId: adminApp_Details?.doctor.doctor_Id,
          //     },
          //   })
          // }
        >
          Message Admin
        </Button>
      </div>
    </div>
  );
};

export default MessageButtons;
