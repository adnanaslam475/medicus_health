import { VideoCameraFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";
import Router from "next/router";
import { AppointmentTimeSlots } from "../../../../generated/graphql";
import { isAppointmentTimeValid } from "common/utils/date";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  appointmentId: number | null | undefined;
  requestedDate?: string;
  status?: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  specialization: string;
};

function AppointmnetConfirmedCard({
  appointmentId,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
  specialization,
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

  let formatedDoctorName = `${
    doctor?.includes("Dr.") ? doctor : `Dr. ${doctor}`
  }`;
  return (
    <Card className={`${_classes["appointment-card"]} max-w-[300px]`}>
      <span className="text-sm mb-0">ID# {appointmentId || ""}</span>
      <h3 className="mb-0 capitalize">{formatedDoctorName}</h3>
      <span className="text-primary text-base block mb-4 normal-case mb-6">
        {specialization}
      </span>
      <span className="text-sm ">Appointment type</span>
      <div className="text-sm text-gray mb-3">{serviceType}</div>
      <span className="text-sm pt-5">Appointment date</span>
      <h6 className="mb-4">
        {date.formatDAYMMDDYY(selectedAppointment?.startTime)}
      </h6>
      <span className="text-sm">Appointment time</span>
      {!selectedAppointment ? (
        <div className="text-cyan font-semibold mb-4">{" - "}</div>
      ) : (
        <div className="text-cyan font-semibold mb-4">{`${date.formathhmma(
          selectedAppointment?.startTime
        )} - ${date.formathhmma(selectedAppointment?.endTime)}`}</div>
      )}
      <div className="text-sm">Appointment Status</div>
      <span className="text-base text-primary font-bold ">{status}</span>

      <div className="flex mt-4">
        <Link passHref href={`/patient/appointments/${appointmentId}/call`}>
          <Button
            className={` ${_classes["card-btn"]} mr-3`}
            type={"primary"}
            target={"_blank"}
            disabled={disabled}
          >
            <div className="flex items-center">
              <VideoCameraFilled className="-mt-0 leading-4" />
              <span className="ml-2">Join now</span>
            </div>
          </Button>
        </Link>

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
