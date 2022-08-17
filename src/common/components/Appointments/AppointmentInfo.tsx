import React, { useEffect, useMemo, useState } from "react";
import { Button, Spin, Tag } from "antd";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import _classes from "./AppointmentButtons.module.scss";
import support from "./../../../../public/assets/icon/support.svg";
import chat from "./../../../../public/assets/icon/chat-bubble.svg";
import {
  AppointmentTimeSlots,
  GetAppointmentByIdQuery,
} from "../../../generated/graphql";
import { date } from "../../utils";
import Router from "next/router";
import { isAppointmentTimeValid } from "common/utils/date";
import { CustomTimeSlot } from "common/types/types";
import Link from "next/link";
import Image from "next/image";
import CardWithProfileImageInfo from "../CardWithProfileImageInfo/CardWithProfileImageInfo";
import { getRole } from "common/utils/userData";

type Props = {
  appoinmentDetails?: GetAppointmentByIdQuery | undefined;
  loading?: boolean;
};

function AppointmentInfo(props: Props) {
  const { appoinmentDetails, loading } = props;
  const { appointment } = appoinmentDetails || {};
  const { first_name, last_name } =
    appoinmentDetails?.appointment?.doctor || {};

  const {
    id,
    status,
    requestedDate,
    appointmentTimeSlots,
    createdAt,
    transaction,
    patient,
  } = appoinmentDetails?.appointment || {};

  const { name, price } = appoinmentDetails?.appointment?.serviceType || {};
  const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
    () => appointmentTimeSlots?.find((item) => item.selected),
    [appointmentTimeSlots]
  );
  const [disabled, setDisabled] = useState(true);
  const [isRoleGuard, setRoleGuard] = useState<boolean>(false);
  const appointmentCharges = transaction?.amountReceived;

  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment, disabled]);

  let formatedDoctorFirstName = `${
    first_name?.includes("Dr.") ? first_name : `Dr. ${first_name}`
  }`;

  const doctorProfilePic =
    appoinmentDetails?.appointment?.doctor?.doctorProfile?.profile_image;
  const doctorSpecialization =
    appoinmentDetails?.appointment?.doctor?.doctorProfile?.specialization;

  useEffect(() => {
    if (getRole() === "User") {
      setRoleGuard(true);
    } else {
      setRoleGuard(false);
    }
  }, []);

  const timeZone =
    typeof window !== "undefined" && localStorage?.getItem("timeZone") !== "undefined" &&
    JSON.parse(String(localStorage?.getItem("timeZone")) || "'America/Cambridge_Bay'");
  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <>
      <CardWithProfileImageInfo
        name={
          isRoleGuard
            ? `${formatedDoctorFirstName} ${last_name?.toLocaleLowerCase()}`
            : ""
        }
        serviceName={isRoleGuard ? `${doctorSpecialization}` : null}
        imageUrl={isRoleGuard ? doctorProfilePic : null}
      >
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
            label="Appointment date"
            value={date.formatDAYMMDDYY(
              String(appointment?.appointmentDateTime?.startTime),
              timeZone
            )}
          />
          {/* <LabelValueRow
          label="Booking date"
          value={date.formatDAYMMDDYY(createdAt)}
        /> */}

          <LabelValueRow
            label="Appointment time"
            value={
              selectedAppointment?.startTime
                ? `${date?.formathhmma(
                    selectedAppointment?.startTime,
                    timeZone
                  )} - ${date?.formathhmma(
                    selectedAppointment?.endTime,
                    timeZone
                  )}`
                : `${date.formathhmma(
                    String(appointment?.appointmentDateTime?.startTime),
                    timeZone
                  )} - ${date.formathhmma(
                    String(appointment?.appointmentDateTime?.endTime),
                    timeZone
                  )}`
            }
          />
          <LabelValueRow
            label="Total amount"
            value={appointmentCharges ? `$${appointmentCharges}` : "-"}
          />

          <li className="flex border-b border-gray-5 py-3">
            <div className="w-full text-gray-1 max-w-[200px]">
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
        </div>

        <div className="max-w-[700px] flex sm:justify-between flex-wrap justify-center mt-4">
          <div className="flex flex-wrap mb-3 justify-center gap-y-2">
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
                localStorage.setItem("id", JSON.stringify(query));
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
                localStorage.setItem("id", JSON.stringify(query));
                Router.push({
                  pathname: "/patient/messages",
                  query,
                });
              }}
            >
              <span className="pl-2">Message physician</span>
            </Button>
          </div>
          {status !== "Requested" && (
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
      <div className="w-full text-gray-1 max-w-[200px]">{label}</div>
      <div className="w-full text-secondary">{value}</div>
    </div>
  );
}
