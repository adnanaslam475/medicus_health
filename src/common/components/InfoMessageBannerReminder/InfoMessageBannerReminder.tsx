import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Image from "next/image";
import { useGetAppointmentsReminderBannerQuery } from "generated/graphql";
import { date } from "common/utils";
import { getRole } from "common/utils/userData";
import Router from "next/router";
import Link from "next/link";
import dayjs, { duration, localeData } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";

const InfoMessageBannerReminder = () => {
  // BANNER API CALL
  const [{ data }] = useGetAppointmentsReminderBannerQuery();
  const { appointmentsReminderBanner } = data || {};

  const { patient, id: patient_id } = appointmentsReminderBanner || {};
  const { doctor, id: doctor_id } = appointmentsReminderBanner || {};

  const { first_name: patient_first_name, last_name: patient_last_name } =
    patient || {};
  const { first_name: doctor_first_name, last_name: doctor_last_name } =
    doctor || {};
  const id = patient_id || doctor_id;
  const { appointmentTimeSlots } = appointmentsReminderBanner || {};

  const [isBannerAppointmentTime, setIsBannerAppointmentTime] =
    useState<boolean>(false);

  let selectedTime = appointmentTimeSlots?.find((time) => time.selected);
  dayjs.extend(utc);
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  dayjs.extend(duration);

  //checking is appointment time is same as current datetime
  let isAppoinmetnStartTime = date?.isAppoinentDateIsSame(
    date.formatDAYMMDDYY(selectedTime?.startTime)
  );

  let formatedDoctorFirstName = `${
    doctor_first_name?.includes("Dr.")
      ? doctor_first_name
      : `Dr. ${doctor_first_name}`
  }`;

  const selectStartTime = dayjs(selectedTime?.startTime).utc().unix();
  const selectEndTime = dayjs(selectedTime?.endTime).utc().unix();
  let now = dayjs().utc();

  useEffect(() => {
    if (now?.unix() > selectStartTime && now?.unix() < selectEndTime) {
      setIsBannerAppointmentTime(false);
    } else {
      setIsBannerAppointmentTime(true);
    }
  }, [selectedTime]);
  let formatedPatientFirstName = `${
    patient_first_name?.includes("")
      ? patient_first_name
      : ` ${patient_first_name}`
  }`;
  const timeZone =
    typeof window !== "undefined" &&
    JSON.parse(String(localStorage?.getItem("timeZone")) || "");

  return data?.appointmentsReminderBanner ? (
    <div className="flex items-center bg-gray-4 p-2 lg:h-10 md:h-auto px-1 rounded text-xs text-nowr gap-1">
      <Image
        priority={true}
        unoptimized
        alt=""
        className="warning-small mx-3 shadow-none border-0"
        height={34}
        width={34}
        src="/assets/icon/warning-small.svg"
      />
      <div className="flex items-start gap-1">
        <span className="ml-0 min-h-max hidden md:block md:whitespace-nowrap">
          You have an appointment with
          {getRole() === "Doctor" || getRole() === "Staff" ? (
            // <span> {`${patient_first_name} ${patient_last_name}`} </span>
            <span> {`${formatedPatientFirstName} ${patient_last_name}`} </span>
          ) : null}
          {getRole() === "User" && (
            <span> {`${formatedDoctorFirstName} ${doctor_last_name}`} </span>
          )}
          at
        </span>
        {/* <span>{date?.formatDAYMMDDYY(selectedTime?.startTime)}</span> */}
        <span className="ml-0">
          {/* {`${date?.formathhmma(selectedTime?.startTime)} -  ${date?.formathhmma(
          selectedTime?.endTime
        )}`} */}
          {`${date?.formathhmma(selectedTime?.startTime, timeZone)}`}
        </span>
        <span className="md:whitespace-nowrap">
          on {date?.formatDAYMMDD(selectedTime?.startTime, timeZone)}
        </span>
      </div>

      {isAppoinmetnStartTime && (
        <Link passHref href={`/patient/appointments/${id}/call`}>
          <Button
            className="link_button bg-primary text-primary whitespace-nowrap ml-auto font-circular"
            type="default"
            size="small"
            target={"_blank"}
            disabled={isBannerAppointmentTime}
            // onClick={() => Router.push(`/patient/appointments/${id}/call`)}
          >
            <span>Join now</span>
          </Button>
        </Link>
      )}
    </div>
  ) : null;
};

export default InfoMessageBannerReminder;
