import React from "react";
import Router, { useRouter } from "next/router";
import { Card, Button } from "antd";
import { VideoCameraFilled } from "@ant-design/icons";
import _classes from "./AppointmentCard.module.scss";
import { ButtonType } from "antd/lib/button";
import { date } from "../../utils";

type StatusName = "confirmed" | "request" | "pending" | "cancelled";

type StatusType<K extends StatusName> = {
  [k in K]: {
    lable: string;
    color: string;
    button: {
      show: boolean;
      type: ButtonType;
    };
  };
};

const APPOINTMENT_STATUS: StatusType<StatusName> = {
  confirmed: {
    lable: "Confirmed",
    color: "text-cyan",
    button: {
      show: false,
      type: "primary",
    },
  },
  request: {
    lable: "Request",
    color: "text-primary",
    button: {
      show: false,
      type: "primary",
    },
  },
  pending: {
    lable: "pending",
    color: "text-yellow",
    button: {
      show: false,
      type: "default",
    },
  },
  cancelled: {
    lable: "cancelled",
    color: "text-red",
    button: {
      show: false,
      type: "default",
    },
  },
};

type props = {
  id: number;
  patientId: number;
  doctorId: number;
  serviceId: number;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
};

function AppointmentCard({
  id,
  patientId,
  doctorId,
  serviceId,
  requestedDate,
  status,
  serviceType,
  doctor,
}: props) {
  return (
    <Card className={`${_classes["appointment-card"]}`}>
      <h3 className="mb-0">Dr. {doctor}</h3>
      <span className="font-circular text-base text-gray block">{serviceType}</span>
      <span className="text-sm mt-4 block">Date</span>
      <h6>{date.formatMMMMDDYYYY(requestedDate)}</h6>
      <span className="text-sm mt-4 block">Time</span>
      <h6 className="text-gray-8">{date.formathhmma(requestedDate)}</h6>
      <span className="text-sm mt-4 block">Status</span>
      <span className="text-base text-gray-8 ">{status}</span>
    </Card>
  );
}

export default AppointmentCard;
