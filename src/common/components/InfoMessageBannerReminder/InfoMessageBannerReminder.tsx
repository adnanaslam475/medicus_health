import React from "react";
import { Button } from "antd";
import Image from "next/image";
import { useGetAppointmentsReminderBannerQuery } from "generated/graphql";
import { date } from "common/utils";

const InfoMessageBannerReminder = () => {
  const [{ data }] = useGetAppointmentsReminderBannerQuery();
  const { appointmentsReminderBanner } = data || {};

  const { patient } = appointmentsReminderBanner || {};

  const { first_name, last_name } = patient || {};

  const { appointmentTimeSlots } = appointmentsReminderBanner || {};

  let selectedTime = appointmentTimeSlots?.find((time) => time.selected);

  //checking is appointment time is same as current datetime
  let isAppoinmetnStartTime = date?.isAppoinentDateIsSame(
    selectedTime?.startTime
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
        You Have An Upcomming Appointment With {`${first_name} ${last_name}`} At
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
        >
          Join Now
        </Button>
      )}
    </div>
  ) : null;
};

export default InfoMessageBannerReminder;
