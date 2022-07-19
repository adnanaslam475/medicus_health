import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Radio, RadioChangeEvent, Space } from "antd";
import _classes from "./AppointmentReschedule.module.scss";
import {
  Appointment,
  AppointmentPriceResponse,
  useGetAllCardsQuery,
  useGetAppointmentPriceQuery,
  useViewSuggestedTimeSlotsQuery,
} from "../../../../../generated/graphql";
import { getUserData } from "../../../../../common/utils/userData";
import { date } from "../../../../../common/utils";
import { useAppointmentModal } from "../AppointmentModalProvider";

type Props = {
  appointmentId: number;
  appointmentDetails: Appointment;
  appointmentCharges:AppointmentPriceResponse
};

function AppointmentReschedule(props: Props) {
  const { appointmentDetails,appointmentId ,appointmentCharges} = props;
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
  const doctorName = `${first_name || ""}  ${last_name || ""}`;

  const [value, setValue] = useState(0);
  const { data, saveStepOne } = useAppointmentModal();

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    saveStepOne?.({
      selectedSlotId: e.target.value,
    });
  };

  useEffect(() => {
    setValue(appointmentTimeSlots?.[0]?.id as number);
    saveStepOne?.({
      charges,
      requestedDate,
      scheduleId,
      selectedSlotId: appointmentTimeSlots?.[0]?.id as number,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charges, appointmentDetails, appointmentTimeSlots]);

  const {appointmentPrice,systemFee,tax,total} = appointmentCharges
  return (
    <div>
      <h2>Appointment Reschedule</h2>
      <div>
        <div className="border-b border-gray-4 ">
          <h5>Physician</h5>
          <p>Dr. {doctorName}</p>
        </div>
        <div className="flex">
        <div className="w-full border-b border-gray-5 pb-2 pt-2">
          <div className="flex justify-between  font-semibold">
            <span>Service</span>
            <span>{name || ""}</span>
          </div>

          <div className="flex justify-between ">
            <span>Appointment Fee</span>
            <span>${appointmentPrice || "-"}</span>
          </div>
          <div className="flex justify-between ">
            <span>Tax</span>
            <span>${tax || "0"}</span>
          </div>

          <div className="flex justify-between ">
            <span>System fee</span>
            <span>${systemFee || "0"}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2">
            <span>Total Charges</span>
            <span>${total || "0"}</span>
          </div>
        </div>
      </div>
      </div>
      <div className={`py-4 ${_classes["available-slots-container"]}`}>
        <h5>Available Slots (select one)</h5>
        <Radio.Group className="" onChange={onChange} defaultValue={value}>
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
                      {date.formatDAYMMDDYY(item.startTime)}
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
      <p className="text-red text-center">
        System fee is not refundable in case of appointment cancellation
      </p>
    </div>
  );
}

export default AppointmentReschedule;
