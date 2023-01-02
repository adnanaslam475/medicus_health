import { Button,  Input } from "antd";
import React from "react";
const { TextArea } = Input;
import Router from "next/router";
import _classes from "./MessageButtons.module.scss";
import { getRole } from "../../utils/userData";
import Image from "next/image";
import chat from "./../../../../public/assets/icon/chat-bubble.svg";
import support from "./../../../../public/assets/icon/support.svg";
import { isChrome } from "utils/helper";

type Props = {
  patientID?: number;
  doctorId?: number | string;
};

const MessageButtons = (props: Props) => {
  const { patientID, doctorId } = props;
  return (
    <div className="flex justify-between mt-6 ">
      <div className="flex ">
        {/* ROLE BASED MESSAGE BUTTONS CONDITIONS */}
        {(getRole() === "Admin" ||
          getRole() === "Doctor" ||
          getRole() === "Staff") && (
            <Button
              icon={
                <Image
                  priority={true}
                  width={15}
                  height={15}
                  src={chat}
                  alt=""
                  className={`${isChrome && 'antCustomBtn'}`} />
              }
              className={`${_classes["appointments-btn"]} mr-1 sm:mr-3`}
              // onClick={() => Router.push("/physician/messages")}
              onClick={() => {
                const query: any = {
                  chat: "patient",
                  // patientId: adminApp_Details?.patient.patient_id,
                  doctorId,
                  patientId: patientID,
                };
                // localStorage.setItem("id", JSON.stringify(query));
                Router.push({
                  pathname: "/physician/messages",
                  query,
                });
              }}
            >
              <span className="pl-2">Message patient</span>
            </Button>
          )}

        {(getRole() === "User" ||
          getRole() === "Doctor" ||
          getRole() === "Staff") && (
            <Button
              icon={
                <Image
                  priority={true}
                  width={15}
                  height={15}
                  src={support}
                  alt=""
                  className=""
                />
              }
              className={`${_classes["appointments-btn"]} mr-3 ${isChrome && 'antCustomBtn'}`}
              // onClick={() => Router.push("/physician/messages")}
              onClick={() =>
                Router.push({
                  pathname: "/physician/messages",
                  query:
                    getRole() === "Doctor" || getRole() === "Staff"
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
              <span className="pl-2">Message support</span>
            </Button>
          )}

        {(getRole() === "User" || getRole() === "Admin") && (
          <Button
            icon={
              <Image
                priority={true}
                width={15}
                height={15}
                src={chat}
                alt=""
                className=""
              />
            }
            className={`${_classes["appointments-btn"]} mr-3 ${isChrome && 'antCustomBtn'}`}
            onClick={() => {
              const query: any = {
                chat: "doctor",
                doctorId,
                patientId: patientID,
              };
              // localStorage.setItem("id", JSON.stringify(query));
              Router.push({
                pathname: "/physician/messages",
                query,
              });
            }}
          >
            <span className="pl-2">Message physician</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageButtons;
