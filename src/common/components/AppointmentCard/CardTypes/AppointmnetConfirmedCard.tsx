import { VideoCameraFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";
import Router from "next/router";
import { Appointment, AppointmentTimeSlots } from "generated/graphql";
import { isAppointmentTimeValid } from "common/utils/date";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { getRole } from "common/utils/userData";

type Props = {
  appointmentId: number | null | undefined;
  requestedDate?: string;
  status?: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  specialization: string;
  timeZone: string;
  appointmentDetail?: Appointment | undefined;
};

function AppointmnetConfirmedCard({
  appointmentId,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
  specialization,
  timeZone,
  appointmentDetail,
}: Props) {
  const t = useTranslations("AppointmentCards");
  const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
    () => appointmentTimeSlots?.find((item) => item.selected),
    [appointmentTimeSlots]
  );

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (selectedAppointment) {
      isAppointmentTimeValid(
        selectedAppointment,
        disabled,
        setDisabled,
        timeZone
      );
    }
  }, [selectedAppointment]);

  let formatedDoctorName = `${
    doctor?.includes("Dr.") ? doctor : `Dr. ${doctor}`
  }`;

  const serviceTypeName =
    appointmentDetail?.appointmentTypeProposed?.type || serviceType || "-";
  return (
    <Card className={`${_classes["appointment-card"]} max-w-[300px]`}>
      <span className="text-sm mb-0">ID# {appointmentId || ""}</span>
      <h3 className="mb-0 capitalize">{formatedDoctorName}</h3>
      <span className="text-primary text-base block mb-4 normal-case improved-word-spacing">
        {specialization}
      </span>
      <span className="text-sm improved-word-spacing">Appointment type</span>
      <div className="text-sm text-gray mb-3 improved-word-spacing">
        {serviceTypeName}
      </div>
      <span className="text-sm pt-5 improved-word-spacing">
        Appointment date
      </span>
      <h6 className="mb-4">
        {date.formatDAYMMDDYY(selectedAppointment?.startTime, timeZone)}
      </h6>
      <span className="text-sm improved-word-spacing">Appointment time</span>
      {!selectedAppointment ? (
        <div className="text-cyan font-semibold mb-4">{" - "}</div>
      ) : (
        <div className="text-cyan font-semibold text-sm mb-4">{`${date.formathhmma(
          selectedAppointment?.startTime,
          timeZone
        )} - ${date.formathhmma(selectedAppointment?.endTime, timeZone)}`}</div>
      )}
      <div className="text-sm">Appointment status</div>
      <span className="text-base text-primary font-bold">{status}</span>

      <div className="flex mt-4 justify-between">
        <Link
          passHref
          href={
            getRole() === "User"
              ? `/patient/appointments/${appointmentId}/call`
              : `/physician/appointments/${appointmentId}/call`
          }
        >
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
