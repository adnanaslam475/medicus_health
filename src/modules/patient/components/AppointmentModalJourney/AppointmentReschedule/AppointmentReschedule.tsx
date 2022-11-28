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
import { getCurrentUserTimeZone } from "common/utils/date";
import { addDecimaltoAmount } from "common/utils/helper";

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
    appointmentTypeProposed,
    status,
  } = appointmentDetails || {};

  const isRescheduledAppointment = status == "Rescheduled" ? true : false;
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
  const timeZone = getCurrentUserTimeZone();

  return (
    <div>
      <h2>
        Appointment {isRescheduledAppointment ? "rescheduling" : "scheduling"}
      </h2>
      <div>
        <div className="border-b border-gray-3 ">
          <h5>Physician name</h5>
          <p>{formatedDoctorName}</p>
        </div>
        <div className="flex">
          <div className="w-full border-b border-gray-3 pb-2 pt-2">
            <div className="flex justify-between  font-semibold">
              <span>Appointment type</span>
              <span>{appointmentTypeProposed?.type || name || ""}</span>
            </div>
            <div className="flex justify-between ">
              <span>Appointment fee</span>
              <span>
                ${addDecimaltoAmount((appointmentPrice as any) + 100) || "-"}
              </span>
            </div>
            {/* pointer */}
            <div className="flex justify-between ">
              <span>Discount applied: JOINMEDICUS</span>
              <span>- $100.00</span>
            </div>
            <div className="flex justify-between ">
              <span>Tax</span>
              <span>${addDecimaltoAmount(tax as any) || "0"}</span>
            </div>

            <div className="flex justify-between ">
              <span>
                {isRescheduledAppointment
                  ? "Processing fee"
                  : "Estimated processing fee*"}
              </span>
              <span>${addDecimaltoAmount(systemFee as any) || "0"}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2">
              <span>Total charges</span>
              <span>${addDecimaltoAmount(total as any) || "0"}</span>
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
                  <div className="text-secondary flex justify-between w-full">
                    <div className="mr-0 block text-sm min-w-[105px]">
                      {date.formatDAYMMDDYY(item.startTime, timeZone)}
                    </div>
                    <div className="inline-block text-sm text-right whitespace-nowrap">{`${date.formathhmma(
                      item.startTime,
                      timeZone
                    )} - ${date.formathhmma(item.endTime, timeZone)}`}</div>
                  </div>
                </Radio>
              ))
            )}
          </Space>
        </Radio.Group>
      </div>
      <p className="text-red text-center">
        {isRescheduledAppointment
          ? "Payment has already been submitted and processed."
          : "* Processing fee is not refundable in the event you cancel your appointment."}
      </p>
    </div>
  );
}

export default AppointmentReschedule;
