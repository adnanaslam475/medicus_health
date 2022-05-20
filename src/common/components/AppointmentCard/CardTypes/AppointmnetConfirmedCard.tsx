import { VideoCameraFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";
import Router, { useRouter } from "next/router";
import { AppointmentTimeSlots } from "../../../../generated/graphql";
import { sorter } from "utils/helper";
import dayjs from "dayjs";

type Props = {
  appointmentId: number | undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
};

function AppointmnetConfirmedCard({
  appointmentId,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
}: Props) {
  const selectedAppointment = useMemo(
    () => appointmentTimeSlots?.find((item) => item.selected),
    [appointmentTimeSlots]
  );

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      date.formatMMMMDDYYYY(selectedAppointment?.startTime) ===
      dayjs(new Date().toLocaleDateString()).format("MMMM, D, YYYY")
    ) {
      const startDate = selectedAppointment?.startTime?.split("T")[0];
      const startTime = selectedAppointment?.startTime
        ?.split("T")[1]
        ?.replace("Z", "");
      const endTime = selectedAppointment?.endTime
        ?.split("T")[1]
        ?.replace("Z", "");
      let difference =
        new Date(`${startDate} ${startTime}`).getTime() - Date.now();
      setTimeout(() => {
        if (new Date(`${startDate} ${endTime}`).getTime() > Date.now()) {
          setDisabled(false);
          setTimeout(() => {
            if (!disabled) {
              setDisabled(true);
            }
          }, new Date(`${startDate} ${endTime}`).getTime() - Date.now());
        }
      }, difference);
    }
  }, [selectedAppointment]);

  return (
    <Card className={`${_classes["appointment-card"]}`}>
      <h3 className="mb-0">Dr. {doctor}</h3>
      <span className="text-gray text-base block">{serviceType}</span>
      <span className="text-sm">Date</span>
      <h6>{date.formatMMMMDDYYYY(selectedAppointment?.startTime)}</h6>
      <span className="text-sm">Time</span>
      {!selectedAppointment ? (
        <div className="text-cyan font-semibold">{" - "}</div>
      ) : (
        <div className="text-cyan font-semibold">{`${date.formathhmma(
          selectedAppointment?.startTime
        )} - ${date.formathhmma(selectedAppointment?.endTime)}`}</div>
      )}
      <span className="text-base text-primary font-bold ">{status}</span>
      <div className="flex">
        <Button
          type={"primary"}
          icon={<VideoCameraFilled />}
          className={`${_classes["card-btn"]} mr-3`}
          onClick={() =>
            Router.push(`/patient/appointments/${appointmentId}/call`)
          }
          disabled={disabled}
        >
          Join Now
        </Button>
        <Button
          className={`${_classes["card-btn"]} bg-transparent`}
          onClick={() => Router.push(`/patient/appointments/${appointmentId}`)}
        >
          Details
        </Button>
      </div>
    </Card>
  );
}

export default AppointmnetConfirmedCard;
