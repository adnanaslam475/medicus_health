import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
const { TextArea } = Input;
import Router from "next/router";
import _classes from "./MessageButtons.module.scss";
import { getRole } from "../../utils/userData";

type Props = {
  patientID?: number;
  doctorId?: number;
};

const MessageButtons = (props: Props) => {
  const { patientID, doctorId } = props;
  return (
    <div className="flex justify-between mt-6">
      <div className="flex ">
        {/* ROLE BASED MESSAGE BUTTONS CONDITIONS */}
        {(getRole() === "Admin" ||
          getRole() === "Doctor" ||
          getRole() === "Staff") && (
          <Button
            icon={<MessageOutlined />}
            className={`${_classes["appointments-btn"]} mr-1 sm:mr-3`}
            // onClick={() => Router.push("/physician/messages")}
            onClick={() => {
              Router.push({
                pathname: "/physician/messages",
                query: {
                  chat: "patient",
                  // patientId: adminApp_Details?.patient.patient_id,
                  doctorId,
                  patientId: patientID,
                },
              });
            }}
          >
            Message patient
          </Button>
        )}

        {getRole() === "User" ||
          (getRole() === "Admin" && (
            <Button
              icon={<MessageOutlined />}
              className={`${_classes["appointments-btn"]} mr-3`}
              onClick={() =>
                Router.push({
                  pathname: "/physician/messages",
                  query: {
                    chat: "doctor",

                    doctorId: doctorId,
                    patientId: patientID,
                  },
                })
              }
            >
              Message physician
            </Button>
          ))}

        {(getRole() === "User" ||
          getRole() === "Doctor" ||
          getRole() === "Staff") && (
            <Button
              icon={<MessageOutlined />}
              className={`${_classes["appointments-btn"]}`}
              // onClick={() => Router.push("/physician/messages")}
              onClick={() =>
                Router.push({
                  pathname: "/physician/messages",
                  query: {
                    chat: "admin",
                    // doctorId: adminApp_Details?.doctor.doctor_Id,
                    doctorId: doctorId,
                    patientId: patientID,
                  },
                })
              }
            >
              Message support
            </Button>
          )}
      </div>
    </div>
  );
};

export default MessageButtons;
