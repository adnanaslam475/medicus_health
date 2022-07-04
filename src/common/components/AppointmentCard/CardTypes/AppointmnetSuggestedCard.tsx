import { Button, Card, Space } from "antd";
import React from "react";
import upcoming from "../../../../../pages/physician/appointments/upcoming";
import {
  AppointmentTimeSlots,
  useGetAllRequestedAppointmentsQuery,
} from "../../../../generated/graphql";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";

type Props = {
  appointmentId: number | null | undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  setShowModal?: (id: boolean) => void;
  onViewSuggestedSlots: () => void;
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
}: Props) {
  return (
    <Card className={`${_classes["appointment-card"]}`}>
      <span className="text-sm mb-0"> {appointmentId || ""}</span>
      <h3 className="mb-0">Dr. {doctor}</h3>
      <span className="text-gray text-base block mb-6">{serviceType}</span>
      <Space direction="vertical" size="middle" />
      <span className="text-sm ">Date</span>
      <h6>{date.formatMMMMDDYYYY(requestedDate)}</h6>
      <Space direction="vertical" size="middle" />
      <span className="text-sm">Time</span>
      {appointmentTimeSlots?.length === 0 ? (
        <div className="text-cyan font-semibold">{" - "}</div>
      ) : (
        appointmentTimeSlots?.map((item) => (
          <div className="text-cyan font-semibold">{`${date.formathhmma(
            item.startTime
          )} - ${date.formathhmma(item.endTime)}`}</div>
        ))
      )}
      <Space direction="vertical" size="middle" />
      <span className="text-sm  block mt-4 ">Status</span>
      <span className="text-base text-primary font-bold ">{status}</span>
      <Space direction="vertical" size="middle" />
      <div className="flex">
        <Button
          type={"primary"}
          className={`${_classes["card-btn"]} mt-4`}
          onClick={() => onViewSuggestedSlots()}
        >
          View Suggested Slots
        </Button>
      </div>
    </Card>
  );
}

export default AppointmnetSuggestedCard;
