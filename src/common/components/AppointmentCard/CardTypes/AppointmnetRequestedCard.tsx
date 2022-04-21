import { VideoCameraFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import React from "react";
import { AppointmentTimeSlots } from "../../../../generated/graphql";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";

type Props = {
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
};

function AppointmnetRequestedCard({
  requestedDate,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
}: Props) {
  return (
    <Card className={`${_classes["appointment-card"]}`}>
      <h3 className="mb-0">Dr. {doctor}</h3>
      <span className="text-gray text-base block">{serviceType}</span>
      <span className="text-sm">Date</span>
      <h6>{date.formatMMMMDDYYYY(requestedDate)}</h6>
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
      <span className="text-base text-yellow font-bold ">{status}</span>
      <div className="flex">
        <Button
          type={"primary"}
          icon={<VideoCameraFilled />}
          className={`${_classes["card-btn"]} mr-3`}
        >
          View Suggested Slots
        </Button>
      </div>
    </Card>
  );
}

export default AppointmnetRequestedCard;
