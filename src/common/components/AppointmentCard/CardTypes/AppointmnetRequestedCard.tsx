import { VideoCameraFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import React from "react";
import { AppointmentDateTimeResponse, AppointmentTimeSlots } from "../../../../generated/graphql";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";

type Props = {
  appointmentId: number | undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  setShowModal: any;
  appointmentDateTime?:AppointmentDateTimeResponse
};

function AppointmnetRequestedCard({
  appointmentId,
  requestedDate,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
  setShowModal,
  appointmentDateTime
}: Props) {
  return (
    <Card className={`${_classes["appointment-card"]}`}>
      <h3 className="mb-0">Dr. {doctor}</h3>
      <span className="text-gray text-base block">{serviceType}</span>
      <span className="text-sm mt-6 block">Date</span>
      <h6>{date.formatMMMMDDYYYY(requestedDate)}</h6>
      <span className="text-sm mt-4 block">Time</span>
      <div className="text-secondary">
          {appointmentDateTime?.endTime && appointmentDateTime?.startTime
            ? `${date.formathhmma(appointmentDateTime?.startTime)}
             - ${date.formathhmma(appointmentDateTime?.endTime)}`
            : "--"}
        </div>
      <span className="text-sm mt-4 block font-normal">Status</span>
      <span className="text-base text-yellow font-bold ">{status}</span>
    </Card>
  );
}

export default AppointmnetRequestedCard;
