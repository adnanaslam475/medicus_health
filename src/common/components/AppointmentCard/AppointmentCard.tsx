import React from "react";
import AppointmnetConfirmedCard from "./CardTypes/AppointmnetConfirmedCard";
import AppointmnetRequestedCard from "./CardTypes/AppointmnetRequestedCard";
import AppointmnetCancelledCard from "./CardTypes/AppointmnetCancelledCard";
import AppointmnetSuggestedCard from "./CardTypes/AppointmnetSuggestedCard";
import { getUserData } from "../../utils/userData";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentTimeSlots,
  DoctorProfile,
  Transaction,
} from "../../../generated/graphql";

// scss
import _classes from "./AppointmentCard.module.scss";
import AppointmnetCurrentCard from "./CardTypes/AppointmnetCurrentCard";

type props = {
  appointmentId?: number |null| undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  doctorProfile?: DoctorProfile | undefined | null;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  setShowModal?: (data: boolean) => void;
  onViewSuggestedSlots: () => void;
  appointmentDateTime?: AppointmentDateTimeResponse;
  doctorId?: number | null | undefined;
  patientId?: number | null | undefined;
  transaction?: Transaction | undefined;
  appointmentDetail?:Appointment | undefined
};

function AppointmentCard({
  appointmentId,
  requestedDate,
  status,
  serviceType,
  doctor,
  doctorProfile,
  appointmentTimeSlots,
  setShowModal,
  onViewSuggestedSlots,
  appointmentDateTime,
  doctorId,
  patientId,
  transaction,
  appointmentDetail
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
    } else if (role === "User" && status === "Rescheduled") {
      return "Rescheduled";
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
          appointmentDateTime={appointmentDateTime}
        />
      );
    case "Rescheduled":
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
    case "Cancelled":
      return (
        <AppointmnetCancelledCard
          appointmentId={appointmentId}
          requestedDate={requestedDate}
          status={getStatus()}
          serviceType={serviceType}
          doctor={doctor}
          doctorProfile={doctorProfile}
          appointmentTimeSlots={appointmentTimeSlots}
          transaction={transaction}
          appointmentDetail={appointmentDetail}
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
    case "Current":
      return (
        <AppointmnetCurrentCard
          appointmentId={appointmentId}
          requestedDate={requestedDate}
          status={getStatus()}
          serviceType={serviceType}
          doctor={doctor}
          appointmentTimeSlots={appointmentTimeSlots}
          setShowModal={setShowModal}
          onViewSuggestedSlots={onViewSuggestedSlots}
          appointmentDateTime={appointmentDateTime}
          doctorId={doctorId}
          patientId={patientId}
        />
      );
    default:
      return null;
  }
}

export default AppointmentCard;
