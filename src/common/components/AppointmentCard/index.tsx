import React from "react";
import { Card, Button } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";
import _classes from "./AppointmentCard.module.scss";
import { ButtonType } from "antd/lib/button";

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

interface props {
  status: StatusName;
}

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

function AppointmentCard({ status }: props) {
  const {
    lable,
    color,
    button = {
      show: false,
      type: "primary",
    },
  } = APPOINTMENT_STATUS[status] || {};
  return (
    <Card className={_classes["appointment-card"]}>
      <h3 className="mb-0">Dr. Paul Wallner</h3>
      <h5 className="text-gray">First Consultation</h5>
      <span className="text-sm">Date</span>
      <h6>February 4, 2022</h6>

      <span className="text-sm">Time</span>
      <h6 className="text-cyan">07:45 am - 08:30 am (Now)</h6>

      <span className="text-sm">Status</span>
      <h6 className={color}>{lable}</h6>

      <Button type={button.type} size="large" icon={<VideoCameraOutlined />}>
        Join Now
      </Button>
    </Card>
  );
}

export default AppointmentCard;
