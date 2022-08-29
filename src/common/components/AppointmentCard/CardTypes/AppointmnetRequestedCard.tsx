import { VideoCameraFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import {
  AppointmentDateTimeResponse,
  AppointmentTimeSlots,
} from "../../../../generated/graphql";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";
import Router from "next/router";

type Props = {
  appointmentId: number | null | undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  setShowModal: any;
  appointmentDateTime?: AppointmentDateTimeResponse;
  specialization: string;
};

function AppointmnetRequestedCard({
  appointmentId,
  requestedDate,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
  setShowModal,
  appointmentDateTime,
  specialization,
}: Props) {
  const t = useTranslations("AppointmentCards");

  let formatedDoctorName = `${
    doctor?.includes("Dr.") ? doctor : `Dr. ${doctor}`
  }`;

  const timeZone =
    typeof window !== "undefined" &&
    localStorage?.getItem("timeZone") !== "undefined" &&
    localStorage?.getItem("timeZone")
      ? JSON.parse(String(localStorage?.getItem("timeZone")))
      : "America/Cambridge_Bay";

  return (
    <Card className={`${_classes["appointment-card"]}`}>
      <span className="text-sm mb-0"> ID# {appointmentId || ""}</span>
      <h3 className="mb-0 capitalize">{formatedDoctorName}</h3>
      <span className="text-primary text-base block  mb-6">
        {specialization}
      </span>
      <span className="text-sm ">Requested appointment type</span>
      <div className="text-sm text-gray mb-3">{serviceType}</div>
      <span className="text-sm mt-6 block">Requested date</span>
      <h6 className="text-cyan">
        {date.formatDAYMMDDYY(requestedDate, timeZone)}
      </h6>
      <span className="text-sm mt-4 block">Requested time</span>
      <div className="text-cyan">
        {appointmentDateTime?.endTime && appointmentDateTime?.startTime
          ? `${date.formathhmma(appointmentDateTime.startTime, timeZone)}
             - ${date.formathhmma(appointmentDateTime.endTime, timeZone)}`
          : "--"}
      </div>
      <span className="text-sm mt-4 block font-normal">Appointment status</span>
      <div className="flex justify-between items-center">
        <span className="text-base text-yellow font-bold ">{status}</span>
        <Button
          className={`${_classes["card-btn"]} bg-transparent`}
          onClick={() => Router.push(`/patient/appointments/${appointmentId}`)}
        >
          Details
        </Button>
      </div>
    </Card>
  );
}

export default AppointmnetRequestedCard;
