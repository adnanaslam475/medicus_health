import React from "react";
import _classes from "./AppointmentCard.module.scss";
import { ButtonType } from "antd/lib/button";
import AppointmnetConfirmedCard from "./CardTypes/AppointmnetConfirmedCard";
import AppointmnetRequestedCard from "./CardTypes/AppointmnetRequestedCard";
import AppointmnetCancelledCard from "./CardTypes/AppointmnetCancelledCard";
import AppointmnetSuggestedCard from "./CardTypes/AppointmnetSuggestedCard";
import { getUserData } from "../../utils/userData";
import { AppointmentTimeSlots } from "../../../generated/graphql";

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

// const APPOINTMENT_STATUS: StatusType<StatusName> = {
//   confirmed: {
//     lable: "Confirmed",
//     color: "text-cyan",
//     button: {
//       show: false,
//       type: "primary",
//     },
//   },
//   request: {
//     lable: "Request",
//     color: "text-primary",
//     button: {
//       show: false,
//       type: "primary",
//     },
//   },
//   pending: {
//     lable: "pending",
//     color: "text-yellow",
//     button: {
//       show: false,
//       type: "default",
//     },
//   },
//   cancelled: {
//     lable: "cancelled",
//     color: "text-red",
//     button: {
//       show: false,
//       type: "default",
//     },
//   },
// };

type props = {
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  setShowModal: (data: boolean) => void;
};

function AppointmentCard({
  requestedDate,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
  setShowModal
}: props) {
  function getStatus() {
    const { user } = getUserData();
    const { role } = user || {};
    if (role === "User" && status === "Requested") {
      return "Pending";
    } else if (role === "User" && status === "Suggested") {
      return "Requested";
    } else if (role === "Doctor" && status === "Requested") {
      return "Requested";
    } else if (role === "Doctor" && status === "Suggested") {
      return "Suggested";
    }
    return status;
  }
  switch (status) {
    case "Confirmed":
      return (
        <AppointmnetConfirmedCard
          requestedDate={requestedDate}
          status={getStatus()}
          serviceType={serviceType}
          doctor={doctor}
          appointmentTimeSlots={appointmentTimeSlots}
        />
      );
    case "Requested":
      return (
        <AppointmnetRequestedCard
          requestedDate={requestedDate}
          status={getStatus()}
          serviceType={serviceType}
          doctor={doctor}
          appointmentTimeSlots={appointmentTimeSlots}
        />
      );
    case "Cancelled":
      return (
        <AppointmnetCancelledCard
          requestedDate={requestedDate}
          status={getStatus()}
          serviceType={serviceType}
          doctor={doctor}
          appointmentTimeSlots={appointmentTimeSlots}
        />
      );
    case "Suggested":
      return (
        <AppointmnetSuggestedCard
          requestedDate={requestedDate}
          status={getStatus()}
          serviceType={serviceType}
          doctor={doctor}
          appointmentTimeSlots={appointmentTimeSlots}
        />
      );
    default:
      return null;
  }
}

export default AppointmentCard;
