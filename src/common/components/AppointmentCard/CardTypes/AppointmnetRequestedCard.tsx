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
}: Props) {
  const t = useTranslations("AppointmentCards");
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
      <span className="text-sm mb-0"> ID#-{appointmentId || ""}</span>
      <h3 className="mb-0 capitalize">{formatedDoctorName}</h3>
      <span className="text-gray text-base block">{serviceType}</span>
      <span className="text-sm mt-6 block">Date</span>
      <h6>{date.formatDAYMMDDYY(requestedDate)}</h6>
      <span className="text-sm mt-4 block">Time</span>
      <div className="text-secondary">
        {appointmentDateTime?.endTime && appointmentDateTime?.startTime
          ? `${formatedStartTime}
             - ${formatedEndTime}`
          : "--"}
      </div>
      <span className="text-sm mt-4 block font-normal">Status</span>
      <span className="text-base text-yellow font-bold ">{status}</span>
    </Card>
  );
}

export default AppointmnetRequestedCard;
