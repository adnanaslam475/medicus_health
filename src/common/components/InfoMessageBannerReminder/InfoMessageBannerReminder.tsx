import React from "react";
import { Button } from "antd";
import Image from "next/image";
import { useGetAppointmentsReminderBannerQuery } from "generated/graphql";
import { date } from "common/utils";
import { getRole } from "common/utils/userData";
import Router from "next/router";

const InfoMessageBannerReminder = () => {
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

  let selectedTime = appointmentTimeSlots?.find((time) => time.selected);

  //checking is appointment time is same as current datetime
  let isAppoinmetnStartTime = date?.isAppoinentDateIsSame(
    date.formatDAYMMDDYY(selectedTime?.startTime)
  );
  let formatedDoctorFirstName = `${
    doctor_first_name?.includes("Dr.") ? doctor_first_name : `Dr. ${doctor_first_name}`
  }`;
  return data?.appointmentsReminderBanner ? (
    <div className="flex items-center bg-gray-4 p-2 lg:h-10 md:h-auto px-2 rounded text-xs text-nowr gap-2">
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
        <span className="ml-1 min-h-max hidden md:block">
          You have an appointment with
          {getRole() === "Doctor" && (
            <span> {`${patient_first_name} ${patient_last_name}`} </span>
          )}
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
          {`${date?.formathhmma(selectedTime?.startTime)}`}
        </span>
        <span>on {date?.formatDAYMMDD(selectedTime?.startTime)}</span>
      </div>

      {isAppoinmetnStartTime && (
        <Button
          className="bg-primary text-primary px-3 whitespace-nowrap ml-auto"
          type="default"
          size="small"
          onClick={() => Router.push(`/patient/appointments/${id}/call`)}
        >
          Join now
        </Button>
      )}
    </div>
  ) : null;
};

export default InfoMessageBannerReminder;
