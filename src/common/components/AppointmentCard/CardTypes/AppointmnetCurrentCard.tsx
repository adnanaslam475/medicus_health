import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import _classes from "./../AppointmentCard.module.scss";
import camera from "../../../../../public/assets/images/camera.svg";
import { Button, Card, Space } from "antd";
import {
  AppointmentDateTimeResponse,
  AppointmentTimeSlots,
} from "../../../../generated/graphql";
import { date } from "../../../utils";
import { MessageOutlined } from "@ant-design/icons";
import Router from "next/router";
import { isAppointmentTimeValid } from "common/utils/date";

type Props = {
  appointmentId: number | undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  setShowModal?: (id: boolean) => void;
  onViewSuggestedSlots: () => void;
  appointmentDateTime?: AppointmentDateTimeResponse;
  doctorId?:number | null | undefined;
  patientId?:number | null | undefined
};

function AppointmnetCurrentCard({
  appointmentId,
  requestedDate,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
  setShowModal,
  onViewSuggestedSlots,
  appointmentDateTime,
  doctorId,
  patientId

}: Props) {
  const [disabled, setDisabled] = useState(true);
  const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
    () => appointmentTimeSlots?.find((item) => item.selected),
    [appointmentTimeSlots]
  );

  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment]);

  return (
    <Card className={`${_classes["appointment-card"]} max-w-[300px]`}>
      <h3 className="mb-0"> {appointmentId || "Appointment-id"}</h3>
      <h3 className="mb-0">Dr. {doctor}</h3>
      <span className="text-gray text-base block">{serviceType}</span>
      <Space direction="vertical" size="middle" />
      <span className="text-sm">Date</span>
      <h6>{date.formatMMMMDDYYYY(requestedDate)}</h6>
      <Space direction="vertical" size="middle" />
      <span className="text-sm">Time</span>
        <div className="text-cyan font-semibold">
          {appointmentDateTime?.endTime && appointmentDateTime?.startTime
            ? `${date.formathhmma(appointmentDateTime?.startTime)}
             - ${date.formathhmma(appointmentDateTime?.endTime)}`
            : "--"}
        </div>
      <Space direction="vertical" size="middle" />
      <span className="text-base text-green-3 font-bold ">{status}</span>
      <Space direction="vertical" size="middle" />
      <div className="flex">
        <Button
          type="primary"
          className={`${_classes["appointments-btn"]} bg-current mr-3`}
          onClick={() => Router.push(`/patient/appointments/${appointmentId}/call`)}
          disabled={disabled}
        >
          <Image
            priority={true}
            src={camera}
            width={15}
            height={15}
            className="mb-0"
            alt="camera"
          />
          <span className="ml-2 mt-1">Join Now</span>
        </Button>
        <Button
          type="default"
          className={`${_classes["appointments-btn"]} bg-current mr-3`}
          onClick={() => Router.push(`/patient/appointments/${appointmentId}`)}
        >
          <span className="ml-2 mt-1">Detail</span>
        </Button>
      </div>
      <div className=" flex">
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn-message"]} mr-3 my-2 text-xs`}
          onClick={() =>
            Router.push({
              pathname: "/physician/messages",
              query: {
                chat: "admin",
                doctorId: doctorId,
                patientId: patientId,
              },
            })
          }
        >
          Message Admin
        </Button>
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn-message"]} mr-3 my-2`}
          onClick={() =>
            Router.push({
              pathname: "/physician/messages",
              query: {
                chat: "doctor",
                doctorId: doctorId,
                patientId: patientId,
              },
            })
          }
        >
          Message physician
        </Button>
      </div>
    </Card>
  );
}

export default AppointmnetCurrentCard;
