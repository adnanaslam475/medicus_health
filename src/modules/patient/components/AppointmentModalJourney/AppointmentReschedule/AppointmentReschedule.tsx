import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Radio, RadioChangeEvent, Space } from "antd";
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
  appointmentCharges: AppointmentPriceResponse;
};

function AppointmentReschedule(props: Props) {
  const { appointmentDetails, appointmentId, appointmentCharges } = props;
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
    if (e.target.value) {
      setValue(e.target.value);
      saveStepOne?.({
        selectedSlotId: e.target.value,
      });
    }
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

  const { appointmentPrice, systemFee, tax, total } = appointmentCharges;
  let formatedDoctorName = `${
    doctorName?.includes("Dr.") ? doctorName : `Dr. ${doctorName}`
  }`;
  const timeZone =
    typeof window !== "undefined" &&
    JSON.parse(String(localStorage?.getItem("timeZone")) || "");
  return (
    <div>
      <h2>Appointment scheduling</h2>
      <div>
        <div className="border-b border-gray-3 ">
          <h5>Physician name</h5>
          <p>{formatedDoctorName}</p>
        </div>
        <div className="flex">
          <div className="w-full border-b border-gray-3 pb-2 pt-2">
            <div className="flex justify-between  font-semibold">
              <span>Appointment type</span>
              <span>{name || ""}</span>
            </div>

            <div className="flex justify-between ">
              <span>Appointment fee</span>
              <span>${appointmentPrice || "-"}</span>
            </div>
            <div className="flex justify-between ">
              <span>Tax</span>
              <span>${tax || "0"}</span>
            </div>

            <div className="flex justify-between ">
              <span>Processing fee</span>
              <span>${systemFee || "0"}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2">
              <span>Total charges</span>
              <span>${total || "0"}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`py-4 block w-full ${_classes["available-slots-container"]}`}
      >
        <h5>Select an available appointment time</h5>
        <Radio.Group className="block w-full" onChange={onChange} value={value}>
          <Space direction="vertical" className="block w-full">
            {appointmentTimeSlots?.length === 0 ? (
              <div className="text-secondary">{" - "}</div>
            ) : (
              appointmentTimeSlots?.map((item) => (
                <Radio
                  className={`bg-gray-4 ${_classes["radio-div"]} block w-full`}
                  value={item.id}
                >
                  <div className="text-secondary">
                    <span className="mr-3 block">
                      {date.formatDAYMMDDYY(item.startTime, timeZone)}
                    </span>
                    <span className="block">{`${date.formathhmma(
                      item.startTime,
                      timeZone
                    )} - ${date.formathhmma(item.endTime, timeZone)}`}</span>
                  </div>
                </Radio>
              ))
            )}
          </Space>
        </Radio.Group>
      </div>
      <p className="text-red text-center">
        Processing fee is not refundable in the event you cancel your
        appointment.
      </p>
    </div>
  );
}

export default AppointmentReschedule;
