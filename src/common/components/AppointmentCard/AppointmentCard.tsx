import React, { useState } from "react";
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
  setShowModal: (data: boolean) => void;
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
  setShowModal,
}: 
props) {
  return (
    <Card className={`${_classes["appointment-card"]}`}>
      <h3 className="mb-0">Dr. {doctor}</h3>
      <span className="text-gray text-base block">{serviceType}</span>
      <span className="text-sm">Date</span>
      <h6>{date.formatMMMMDDYYYY(requestedDate)}</h6>
      <span className="text-sm">Time</span>
      <h6 className="text-cyan">{date.formathhmma(requestedDate)}</h6>
      <span className="text-base text-primary font-bold block ">{status}</span>
      <Button
        type="primary"
        className={`${_classes["card-btn"]} my-3 mb-1`}
        onClick={() => setShowModal(true)}
      >
        View Suggested Slots
      </Button>
    </Card>
  );
}

export default AppointmentCard;
