import React from "react";
import AppointmnetConfirmedCard from "./CardTypes/AppointmnetConfirmedCard";
import AppointmnetRequestedCard from "./CardTypes/AppointmnetRequestedCard";
import AppointmnetCancelledCard from "./CardTypes/AppointmnetCancelledCard";
import AppointmnetSuggestedCard from "./CardTypes/AppointmnetSuggestedCard";
import { getUserData } from "../../utils/userData";
import {
  AppointmentTimeSlots,
  DoctorProfile,
} from "../../../generated/graphql";

// scss
import _classes from "./AppointmentCard.module.scss";

type props = {
  appointmentId?: number | undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  doctorProfile?: DoctorProfile | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  setShowModal?: (data: boolean) => void;
  onViewSuggestedSlots: () => void;
};

function AppointmentCard({
  appointmentId,
  requestedDate,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
  setShowModal,
  onViewSuggestedSlots,
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
          appointmentId={appointmentId}
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
          appointmentId={appointmentId}
          requestedDate={requestedDate}
          status={getStatus()}
          serviceType={serviceType}
          doctor={doctor}
          appointmentTimeSlots={appointmentTimeSlots}
          setShowModal={setShowModal}
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
          appointmentId={appointmentId}
          requestedDate={requestedDate}
          status={getStatus()}
          serviceType={serviceType}
          doctor={doctor}
          appointmentTimeSlots={appointmentTimeSlots}
          setShowModal={setShowModal}
          onViewSuggestedSlots={onViewSuggestedSlots}
        />
      );
    default:
      return null;
  }
}

export default AppointmentCard;
