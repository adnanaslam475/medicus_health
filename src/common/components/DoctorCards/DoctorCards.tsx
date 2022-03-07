import React from "react";
import { Card, Button, Divider, Avatar } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import { VideoCameraOutlined } from "@ant-design/icons";

type StatusName = "confirmed" | "request" | "pending" | "cancelled";

type StatusType<K extends StatusName> = {
  [k in K]: {
    lable: string;
    color: string;
    button: {
      show: boolean;
      type: string;
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

function DoctorCard({ status }: props) {
  const { lable, color, button } = APPOINTMENT_STATUS[status] || {};
  return (
    <Card
      //   title="Default size card"
      style={{
        // width: 259,
        backgroundColor: "#F6F8FA",
        border: 0,
        // marginRight: "20px",
        marginBottom: "20px",
      }}
    >
      <Avatar size={64} src="./assets/images/doc-pic.png"></Avatar>
      <div className="flex items-center">
      <h3 className="mb-0">Dr. Paul Wallner</h3>
      <div className="flagAvatar"></div>
      <div className="flagAvatar"></div>
      </div>
      <h5 className="text-primary text-xs">Cardiologist</h5>
      <span className="font-14">10+ years of experience</span>
      <h6 className="text-gray-2 font-normal">Heads up! This alert needs your attention, but it's not super imporant</h6>
      <Divider/>

      <h6 className="text-gray-2 font-normal"><span className="font-14 font-rubik">CONDITIONS TREATED  </span></h6>
      <h6 className="">Abnormal heart rythms // Aorta diseas // Conginital heart disease
Corony artery disease // Heart Attack // Heart Faliure</h6>

      <span className="font-14">Status</span>
      <h6 className={color}>{lable}</h6>

      <Button size="large" icon={<VideoCameraOutlined />}>
        Join Now
      </Button>
    </Card>
  );
}

export default DoctorCard;
