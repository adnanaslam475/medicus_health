import { Button, Card, Space } from "antd";
import React from "react";
import upcoming from "../../../../../pages/physician/appointments/upcoming";
import {
  AppointmentDateTimeResponse,
  AppointmentTimeSlots,
  useGetAllRequestedAppointmentsQuery,
} from "../../../../generated/graphql";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";
import Router from "next/router";

type Props = {
  appointmentId: number | null | undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  setShowModal?: (id: boolean) => void;
  onViewSuggestedSlots: () => void;
  specialization:string;
  patientTimeZone?:string
};

function AppointmnetSuggestedCard({
  appointmentId,
  requestedDate,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
  setShowModal,
  onViewSuggestedSlots,
  specialization,
  patientTimeZone,
}: Props) {
  let formatedDoctorName = `${
    doctor?.includes("Dr.") ? doctor : `Dr. ${doctor}`
  }`;
  return (
    <Card className={`${_classes["appointment-card"]}`}>
      <span className="text-sm mb-0">ID# {appointmentId || ""}</span>
      <h3 className="mb-0 capitalize">{formatedDoctorName}</h3>
      <span className="text-primary text-base block mb-6">{specialization}</span>
      <Space direction="vertical" size="middle" />
      <span className="text-sm ">Appointment type</span>
      <div className="text-sm text-gray mb-3">{serviceType}</div>
      <Space direction="vertical" size="middle" />
      <span className="text-sm ">Appointment date</span>
      <h6>{date.formatDAYMMDDYY(requestedDate)}</h6>
      <Space direction="vertical" size="middle" />
      <span className="text-sm">Appointment proposed time</span>
      {appointmentTimeSlots?.length === 0 ? (
        <div className="text-cyan font-semibold">{" - "}</div>
      ) : (
        appointmentTimeSlots?.map((item) => (
          <div className="text-cyan font-semibold">{`${item?.startTime?.split("T")[0]} - ${date.formathhmma(
            item.startTime,patientTimeZone
          )} - ${date.formathhmma(item.endTime,patientTimeZone)}`}</div>
        ))
      )}
      <Space direction="vertical" size="middle" />
      <span className="text-sm  block mt-4 ">Appointment status</span>
      <span className="text-base text-primary font-bold ">{status}</span>
      <Space direction="vertical" size="middle" />
      <div className="flex justify-between items-center">
        <Button
          type={"primary"}
          className={`${_classes["card-btn"]} mt-4`}
          onClick={() => onViewSuggestedSlots()}
        >
          View proposed appointment times
        </Button>
      <Button
          className={`${_classes["card-btn"]} bg-transparent mt-4 ml-2`}
          onClick={() => Router.push(`/patient/appointments/${appointmentId}`)}
        >
          Details
        </Button>
      </div>
    </Card>
  );
}

export default AppointmnetSuggestedCard;
