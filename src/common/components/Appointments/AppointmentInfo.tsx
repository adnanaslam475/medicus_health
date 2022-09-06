import React, { useEffect, useMemo, useState } from "react";
import { Button, Spin, Tag } from "antd";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import _classes from "./AppointmentButtons.module.scss";
import support from "./../../../../public/assets/icon/support.svg";
import chat from "./../../../../public/assets/icon/chat-bubble.svg";
import {
  AppointmentTimeSlots,
  DateTimeSlots,
  GetAppointmentByIdQuery,
} from "../../../generated/graphql";
import { date } from "../../utils";
import Router from "next/router";
import {
  getCurrentUserTimeZone,
  isAppointmentTimeValid,
} from "common/utils/date";
import { CustomTimeSlot } from "common/types/types";
import Link from "next/link";
import Image from "next/image";
import CardWithProfileImageInfo from "../CardWithProfileImageInfo/CardWithProfileImageInfo";
import { getRole } from "common/utils/userData";
import ViewProposeAppointmentTime from "../ViewProposeAppointmentTime";

type Props = {
  appoinmentDetails?: GetAppointmentByIdQuery | undefined;
  loading?: boolean;
};

function AppointmentInfo(props: Props) {
  const { appoinmentDetails, loading } = props;
  const { appointment } = appoinmentDetails || {};
  const { first_name: doctorFirstName, last_name: doctorLastName } =
    appoinmentDetails?.appointment?.doctor || {};

  const { first_name: patientFirstName, last_name: patientLastName } =
    appoinmentDetails?.appointment?.patient || {};

  const {
    id,
    status,
    requestedDate,
    appointmentTimeSlots,
    createdAt,
    transaction,
    patient,
    appointmentCharges,
    appointmentTypeProposed,
  } = appoinmentDetails?.appointment || {};

  const { name, price } = appoinmentDetails?.appointment?.serviceType || {};
  const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
    () => appointmentTimeSlots?.find((item) => item.selected),
    [appointmentTimeSlots]
  );
  const [disabled, setDisabled] = useState(true);
  const [isRoleGuard, setRoleGuard] = useState<boolean>(false);
  // const appointmentCharges = transaction?.total;

  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment, disabled]);

  let formatedDoctorFirstName = `${
    doctorFirstName?.includes("Dr.")
      ? doctorFirstName
      : `Dr. ${doctorFirstName}`
  }`;

  const doctorProfilePic =
    appoinmentDetails?.appointment?.doctor?.doctorProfile?.profile_image;
  const patientProfilePic =
    appoinmentDetails?.appointment?.patient?.patientProfile?.profileImage;
  const doctorSpecialization =
    appoinmentDetails?.appointment?.doctor?.doctorProfile?.specialization;

  useEffect(() => {
    if (getRole() === "User") {
      setRoleGuard(true);
    } else {
      setRoleGuard(false);
    }
  }, []);

  const timeZone = getCurrentUserTimeZone();

  const firstName =
    getRole() === "User"
      ? formatedDoctorFirstName
      : getRole() === "Doctor"
      ? patientFirstName
      : "";
  const lastName =
    getRole() === "User"
      ? doctorLastName
      : getRole() === "Doctor"
      ? patientLastName
      : "";
  const serviceName = getRole() === "User" ? doctorSpecialization : "";
  const profilePic =
    getRole() === "User"
      ? doctorProfilePic
      : getRole() === "Doctor"
      ? patientProfilePic
      : "";

  const isPendingAppointment = [
    "Requested",
    "Rescheduled",
    "Proposed",
  ].includes(status as string);

  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <>
      <CardWithProfileImageInfo
        name={`${firstName} ${lastName}`}
        serviceName={`${serviceName}`}
        imageUrl={profilePic}
        // name={
        //   isRoleGuard
        //     ? `${formatedDoctorFirstName} ${last_name?.toLocaleLowerCase()}`
        //     : ""
        // }
        // serviceName={isRoleGuard ? `${doctorSpecialization}` : null}
        // imageUrl={isRoleGuard ? doctorProfilePic : null}
      >
        <div className="flex flex-wrap mb-3 mt-6 gap-y-2">
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
            className={`${_classes["appointments-btn"]}  mr-3`}
            onClick={() => {
              const query: any = {
                chat: "admin",
                // doctorId: appointment?.doctorId,
                patientId: appointment?.patientId,
              };
              // localStorage.setItem("id", JSON.stringify(query));
              Router.push({
                pathname: "/patient/messages",
                query,
              });
            }}
          >
            <span className="pl-2">Message support</span>
          </Button>
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
            className={`${_classes["appointments-btn"]} mr-2 `}
            onClick={() => {
              const query: any = {
                chat: "doctor",
                doctorId: appointment?.doctorId,
                patientId: appointment?.patientId,
              };
              // localStorage.setItem("id", JSON.stringify(query));
              Router.push({
                pathname: "/patient/messages",
                query,
              });
            }}
          >
            <span className="pl-2">Message physician</span>
          </Button>
          {(status === "Proposed" || status === "Rescheduled") && (
            <ViewProposeAppointmentTime
              appointmentId={Number(appointment?.id)}
            />
          )}
        </div>
        <div className="max-w-[700px]">
          <LabelValueRow label="ID#" value={Number(id)} />
          {/* <LabelValueRow
            label="Requested date"
            value={date?.formatDAYMMDDYY(requestedDate, timeZone)}
          /> */}
          {/* <LabelValueRow
            label="Physician"
            value={`${formatedDoctorFirstName} ${last_name}`}
          /> */}
          <LabelValueRow label="Appointment type" value={name || "--"} />
          <LabelValueRow
            label={isPendingAppointment ? "Requested date" : "Appointment date"}
            value={
              requestedDate
                ? date.formatDAYMMDDYY(String(requestedDate), timeZone)
                : "--"
            }
          />
          {/* <LabelValueRow
          label="Booking date"
          value={date.formatDAYMMDDYY(createdAt)}
        /> */}

          <LabelValueRow
            label={isPendingAppointment ? "Requested time" : "Appointment time"}
            value={
              selectedAppointment?.startTime
                ? `${date?.formathhmma(
                    selectedAppointment?.startTime,
                    timeZone
                  )} - ${date?.formathhmma(
                    selectedAppointment?.endTime,
                    timeZone
                  )}`
                : appointment?.appointmentDateTime?.startTime
                ? `${date.formathhmma(
                    String(appointment?.appointmentDateTime?.startTime),
                    timeZone
                  )} - ${date.formathhmma(
                    String(appointment?.appointmentDateTime?.endTime),
                    timeZone
                  )}`
                : "--"
            }
          />
          <LabelValueRow
            label="Total amount"
            value={appointmentCharges ? `$${appointmentCharges?.total}` : "-"}
          />

          <li className="flex border-b border-gray-5 py-3">
            <div className="w-full text-gray-1 max-w-[260px]">
              Appointment status
            </div>
            <div className="w-full text-primary">
              <Tag
                color="#e2f8f7"
                className="ant-typography ant-typography-secondary"
              >
                {status}
              </Tag>
            </div>
          </li>

          {appointmentTypeProposed?.type && (
            <LabelValueRow
              label={"Appointment type proposed"}
              value={appointmentTypeProposed?.type || ""}
            />
          )}
          {appointmentTypeProposed?.dateTime?.length && (
            <LabelValueRow
              label={"Appointment(s) proposed"}
              value={
                appointmentTypeProposed.dateTime.map((item: DateTimeSlots) => {
                  return (
                    <div>{`${date.formatDAYMMDDYY(
                      String(item?.date),
                      timeZone
                    )} - ${date.formathhmma(
                      String(item?.startTime),
                      timeZone
                    )} - ${date.formathhmma(
                      String(item?.endTime),
                      timeZone
                    )}`}</div>
                  );
                }) as any
              }
            />
          )}
        </div>

        <div className="max-w-[700px] flex sm:justify-between flex-wrap justify-center mt-4">
          {/* <div className="flex flex-wrap mb-3 justify-center gap-y-2">
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
              className={`${_classes["appointments-btn"]}  mr-3`}
              onClick={() => {
                const query: any = {
                  chat: "admin",
                  // doctorId: appointment?.doctorId,
                  patientId: appointment?.patientId,
                };
                // localStorage.setItem("id", JSON.stringify(query));
                Router.push({
                  pathname: "/patient/messages",
                  query,
                });
              }}
            >
              <span className="pl-2">Message support</span>
            </Button>
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
              className={`${_classes["appointments-btn"]} `}
              onClick={() => {
                const query: any = {
                  chat: "doctor",
                  doctorId: appointment?.doctorId,
                  patientId: appointment?.patientId,
                };
                // localStorage.setItem("id", JSON.stringify(query));
                Router.push({
                  pathname: "/patient/messages",
                  query,
                });
              }}
            >
              <span className="pl-2">Message physician</span>
            </Button>
          </div> */}
          {status !== "Requested" &&
            status !== "Rescheduled" &&
            status !== "Proposed" && (
              <Link passHref href={`/patient/appointments/${id}/call`}>
                <Button
                  className={`${_classes["appointments-btn"]}`}
                  type="primary"
                  icon={<VideoCameraFilled />}
                  target={"_blank"}
                  disabled={disabled}
                >
                  <span>Join now</span>
                </Button>
              </Link>
            )}
        </div>
      </CardWithProfileImageInfo>
    </>
  );
}
export default AppointmentInfo;

function LabelValueRow({
  label,
  value,
}: {
  label: string | number | undefined;
  value: string | number | undefined;
}) {
  return (
    <div className="flex border-b border-gray-5 py-3 ">
      <div className="w-full text-gray-1 max-w-[260px]">{label}</div>
      <div className="w-full text-secondary">{value}</div>
    </div>
  );
}
