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
  User,
} from "../../../generated/graphql";

// scss
import AppointmnetCurrentCard from "./CardTypes/AppointmnetCurrentCard";
import { getCurrentUserTimeZone } from "common/utils/date";

type props = {
  appointmentId?: number | null | undefined;
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
  appointmentDetail?: Appointment | undefined;
  specialization: string;
  patientObject?: User;
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
  appointmentDetail,
  specialization,
}: // patientObject
props) {
  const timeZone = getCurrentUserTimeZone();

  function getStatus() {
    const { user } = getUserData();
    const { role } = user || {};
    if (role === "User" && status === "Requested") {
      return "Requested";
    } else if (role === "User" && status === "Proposed") {
      return "Proposed";
    } else if (role === "Doctor" && status === "Proposed") {
      return "Proposed";
    } else if (role === "User" && status === "Rescheduled") {
      return "Rescheduled";
    } else if (role === "Doctor" && status === "Proposed") {
      return "Proposed";
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
          specialization={specialization}
          timeZone={timeZone}
          appointmentDetail={appointmentDetail}
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
          specialization={specialization}
          timeZone={timeZone}
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
          specialization={specialization}
          appointmentDateTime={appointmentDateTime}
          timeZone={timeZone}
        />
      );
    case "Canceled":
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
          specialization={specialization}
          timeZone={timeZone}
          appointmentDateTime={appointmentDateTime}
        />
      );
    case "Proposed":
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
          specialization={specialization}
          appointmentDateTime={appointmentDateTime}
          timeZone={timeZone}
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
