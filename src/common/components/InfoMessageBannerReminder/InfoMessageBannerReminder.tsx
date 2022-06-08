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

  const { patient ,id:patient_id} = appointmentsReminderBanner || {};
  const { doctor ,id:doctor_id} = appointmentsReminderBanner || {};

  const { first_name: patient_first_name, last_name: patient_last_name } =
    patient || {};
  const { first_name: doctor_first_name, last_name: doctor_last_name } =
    doctor || {};
  const id = patient_id || doctor_id
  const { appointmentTimeSlots } = appointmentsReminderBanner || {};

  let selectedTime = appointmentTimeSlots?.find((time) => time.selected);

  //checking is appointment time is same as current datetime
  let isAppoinmetnStartTime = date?.isAppoinentDateIsSame(
    date.formatMMMMDDYYYY(selectedTime?.startTime)
  );

  return data?.appointmentsReminderBanner ? (
    <div className="flex items-center bg-gray-4 p-2 lg:h-10 md:h-auto px-2 rounded text-xs text-nowr gap-2">
      <Image
        alt=""
        className="warning-small mx-3 shadow-none border-0"
        height={34}
        width={34}
        src="/assets/icon/warning-small.svg"
      />
      <span className="ml-3 min-h-max hidden md:block">
        You Have An Upcomming Appointment With
        {getRole() === "Doctor" && (
          <span> {`${patient_first_name} ${patient_last_name}`} </span>
        )}
        {getRole() === "User" && (
          <span> {`${doctor_first_name} ${doctor_last_name}`} </span>
        )}
        At
      </span>
      <span>{date?.formatMMMMDDYYYY(selectedTime?.startTime)}</span>
      <span>
        {`${date?.formathhmma(selectedTime?.startTime)} -  ${date?.formathhmma(
          selectedTime?.endTime
        )}`}
      </span>

      {isAppoinmetnStartTime && (
        <Button
          className="bg-primary text-primary px-3 whitespace-nowrap ml-auto"
          type="default"
          size="small"
          onClick={()=>Router.push(`/patient/appointments/${id}/call`)}
        >
          Join Now
        </Button>
      )}
    </div>
  ) : null;
};

export default InfoMessageBannerReminder;
