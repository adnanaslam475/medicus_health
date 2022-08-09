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

type Props = {
  appointmentId: number | null | undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  setShowModal: any;
  appointmentDateTime?: AppointmentDateTimeResponse;
  specialization:string
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
  specialization
}: Props) {
  const t = useTranslations("AppointmentCards");
  let formatedDate = `${appointmentDateTime?.startTime?.split(" ")[0]}`;
  let formatedStartTime = `${appointmentDateTime?.startTime?.split(" ")[1]} ${
    appointmentDateTime?.startTime?.split(" ")[2]
  }`;
  let formatedEndTime = `${appointmentDateTime?.endTime?.split(" ")[1]} ${
    appointmentDateTime?.endTime?.split(" ")[2]
  }`;

  let formatedDoctorName = `${
    doctor?.includes("Dr.") ? doctor : `Dr. ${doctor}`
  }`;
  return (
    <Card className={`${_classes["appointment-card"]}`}>
      <span className="text-sm mb-0"> ID# {appointmentId || ""}</span>
      <h3 className="mb-0 capitalize">{formatedDoctorName}</h3>
      <span className="text-primary text-base block  mb-6">{specialization}</span>
      <span className="text-sm ">Appointment type</span>
      <div className="text-sm text-gray mb-3">{serviceType}</div>
      <span className="text-sm mt-6 block">Appointment date</span>
      <h6>{date.formatDAYMMDDYY(requestedDate)}</h6>
      <span className="text-sm mt-4 block">Appointment requested time</span>
      <div className="text-secondary">
        {appointmentDateTime?.endTime && appointmentDateTime?.startTime
          ? `${formatedDate} - ${formatedStartTime}
             - ${formatedEndTime}`
          : "--"}
      </div>
      <span className="text-sm mt-4 block font-normal">Appointment status</span>
      <span className="text-base text-yellow font-bold ">{status}</span>
    </Card>
  );
}

export default AppointmnetRequestedCard;
