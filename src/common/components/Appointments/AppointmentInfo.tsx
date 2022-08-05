import React, { useEffect, useMemo, useState } from "react";
import { Button, Spin, Tag } from "antd";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import _classes from "./AppointmentButtons.module.scss";
import {
  AppointmentTimeSlots,
  GetAppointmentByIdQuery,
} from "../../../generated/graphql";
import { date } from "../../utils";
import Router from "next/router";
import { isAppointmentTimeValid } from "common/utils/date";
import { CustomTimeSlot } from "common/types/types";
import Link from "next/link";

type Props = {
  appoinmentDetails?: GetAppointmentByIdQuery | undefined;
  loading?: boolean;
};

function AppointmentInfo(props: Props) {
  const { appoinmentDetails, loading } = props;
  const { appointment } = appoinmentDetails || {};
  const { first_name, last_name } =
    appoinmentDetails?.appointment?.doctor || {};

  const { id, status, requestedDate, appointmentTimeSlots, createdAt,transaction } =
    appoinmentDetails?.appointment || {};
    
    const { name, price } = appoinmentDetails?.appointment?.serviceType || {};
    const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
      () => appointmentTimeSlots?.find((item) => item.selected),
      [appointmentTimeSlots]
      );
      const [disabled, setDisabled] = useState(true);
      const appointmentCharges = transaction?.amountReceived || "-"

  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment]);

  let formatedDoctorFirstName = `${
    first_name?.includes("Dr.") ? first_name : `Dr. ${first_name}`
  }`;

  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <>
      <div className="max-w-[700px]">
        <LabelValueRow label="ID#" value={Number(id)} />
        <LabelValueRow
          label="Requested date"
          value={date?.formatDAYMMDDYY(requestedDate)}
        />
        <LabelValueRow
          label="Physician"
          value={`${formatedDoctorFirstName} ${last_name}`}
        />
        <LabelValueRow label="Appointment type" value={name || "--"} />
        <LabelValueRow
          label="Appointment date"
          value={date.formatDAYMMDDYY(selectedAppointment?.startTime)}
        />
        {/* <LabelValueRow
          label="Booking date"
          value={date.formatDAYMMDDYY(createdAt)}
        /> */}
        <LabelValueRow
          label="Appointment time"
          value={`${date?.formathhmma(
            selectedAppointment?.startTime
          )} - ${date?.formathhmma(selectedAppointment?.endTime)}`}
        />
        <LabelValueRow
          label="Total amount"
          value={`$${appointmentCharges}`}
        />

        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1 max-w-[200px]">Status</div>
          <div className="w-full text-secondary">
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
            icon={<MessageOutlined />}
            className={`${_classes["appointments-btn"]} mr-3`}
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
            Message support
          </Button>
          <Button
            icon={<MessageOutlined />}
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
            Message physician
          </Button>
        </div>
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
      </div>
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
