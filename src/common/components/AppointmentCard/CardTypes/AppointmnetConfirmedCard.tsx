import { VideoCameraFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";
import Router from "next/router";
import { AppointmentTimeSlots } from "../../../../generated/graphql";
import { isAppointmentTimeValid } from "common/utils/date";
import { useTranslations } from "next-intl";

type Props = {
  appointmentId: number | null | undefined;
  requestedDate?: string;
  status?: string | null | undefined;
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
  const t = useTranslations("AppointmentCards");
  const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
    () => appointmentTimeSlots?.find((item) => item.selected),
    [appointmentTimeSlots]
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment]);

  return (
    <Card className={`${_classes["appointment-card"]} max-w-[300px]`}>
      <span className="text-sm mb-0">ID#-{appointmentId || ""}</span>
      <h3 className="mb-0 capitalize">Dr.{doctor}</h3>
      <span className="text-gray text-base block mb-4 normal-case">
        {serviceType}
      </span>
      <span className="text-sm pt-5">Date</span>
      <h6 className="mb-4">
        {date.formatDAYMMDDYY(selectedAppointment?.startTime)}
      </h6>
      <span className="text-sm">Time</span>
      {!selectedAppointment ? (
        <div className="text-cyan font-semibold mb-4">{" - "}</div>
      ) : (
        <div className="text-cyan font-semibold mb-4">{`${date.formathhmma(
          selectedAppointment?.startTime
        )} - ${date.formathhmma(selectedAppointment?.endTime)}`}</div>
      )}
      <div className="text-sm">Status</div>
      <span className="text-base text-primary font-bold ">{status}</span>
      <div className="flex mt-4">
        <Button
          type={"primary"}
          icon={<VideoCameraFilled />}
          className={`${_classes["card-btn"]} mr-3`}
          onClick={() =>
            Router.push(`/patient/appointments/${appointmentId}/call`)
          }
          disabled={disabled}
        >
          Join now
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
