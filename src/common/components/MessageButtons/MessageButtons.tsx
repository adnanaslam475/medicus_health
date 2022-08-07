import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
const { TextArea } = Input;
import Router from "next/router";
import _classes from "./MessageButtons.module.scss";
import { getRole } from "../../utils/userData";

type Props = {
  patientID?: number;
  doctorId?: number | string;
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
              const query: any = {
                chat: "patient",
                // patientId: adminApp_Details?.patient.patient_id,
                doctorId,
                patientId: patientID,
              };
              localStorage.setItem("id", JSON.stringify(query));
              Router.push({
                pathname: "/physician/messages",
                query,
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
              onClick={() => {
                const query: any = {
                  chat: "doctor",
                  doctorId,
                  patientId: patientID,
                };
                localStorage.setItem("id", JSON.stringify(query));
                Router.push({
                  pathname: "/physician/messages",
                  query,
                });
              }}
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
                query:
                  getRole() === "Doctor"
                    ? {
                        chat: "admin",
                        doctorId: doctorId,
                      }
                    : {
                        chat: "admin",
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
