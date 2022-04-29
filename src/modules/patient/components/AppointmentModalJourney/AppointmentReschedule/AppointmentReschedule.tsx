import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Radio, RadioChangeEvent, Space } from "antd";
import _classes from "./AppointmentReschedule.module.scss";
import {
  Appointment,
  useGetAllCardsQuery,
  useViewSuggestedTimeSlotsQuery,
} from "../../../../../generated/graphql";
import { getUserData } from "../../../../../common/utils/userData";
import { date } from "../../../../../common/utils";
import { useAppointmentModal } from "../AppointmentModalProvider";

type Props = {
  appointmentId: number;
  appointmentDetails: Appointment;
};

function AppointmentReschedule(props: Props) {
  const { appointmentDetails } = props;
  const {
    doctor,
    serviceType,
    appointmentTimeSlots,
    requestedDate,
    scheduleId,
    charges,
  } = appointmentDetails || {};

  const { first_name, last_name } = doctor || {};
  const { name } = serviceType || {};
  const doctorName = first_name + " " + last_name;

  const [value, setValue] = useState(0);
  const { data, saveStepOne } = useAppointmentModal();

  console.log({ appointmentDetails });

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    saveStepOne?.({
      selectedSlotId: e.target.value,
    });
  };

  useEffect(() => {
    setValue(appointmentTimeSlots?.[0].id as number);
    saveStepOne?.({
      charges,
      requestedDate,
      scheduleId,
      selectedSlotId: appointmentTimeSlots?.[0].id as number,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charges, appointmentDetails, appointmentTimeSlots]);

  return (
    <div>
      <h2>Appointment Reschedule</h2>
      <div>
        <div className="border-b border-gray-4 ">
          <h5>Physician</h5>
          <p>Dr. {doctorName}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-b col-span-2 border-gray-4 pt-4 ">
            <h5>Service</h5>
            <p>{name}</p>
          </div>
          <div className="border-b border-gray-4  pt-4">
            <h5>Charges</h5>
            <p>${charges}</p>
          </div>
        </div>
      </div>
      <div className="py-4">
        <h5>Available Slots (select one)</h5>
        <Radio.Group className="" onChange={onChange} value={value}>
          <Space direction="vertical">
            {appointmentTimeSlots?.length === 0 ? (
              <div className="text-secondary">{" - "}</div>
            ) : (
              appointmentTimeSlots?.map((item) => (
                <Radio
                  className={`bg-gray-4 ${_classes["radio-div"]}`}
                  value={item.id}
                >
                  <div className="text-secondary">
                    <span className="mr-3">
                      {date.formatMMMMDDYYYY(item.startTime)}
                    </span>
                    {`${date.formathhmma(item.startTime)} - ${date.formathhmma(
                      item.endTime
                    )}`}
                  </div>
                </Radio>
              ))
            )}
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
}

export default AppointmentReschedule;
