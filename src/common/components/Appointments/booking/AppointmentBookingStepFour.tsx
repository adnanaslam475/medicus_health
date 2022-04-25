import React from "react";
import { date } from "../../../utils";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";

function StepFour() {
  const { data } = useBookAppointment();
  const { physicianName, requestedDate, serviceInfo } = data?.stepOne || {};
  const [{ price, name }] = serviceInfo || [{}];

  return (
    <>
      <h2>Summary</h2>
      <div className="w-full border-b border-gray-5 pb-2 mb-5">
        <label className="block">Doctor</label>
        <span>Dr. {physicianName ? physicianName : ""}</span>
      </div>
      <div className="flex">
        <div className="w-4/6 border-b border-gray-5 pb-2 mb-5">
          <label className="block">Service</label>
          <span>{name}</span>
        </div>
        <div className="w-2/6 ml-4 border-b border-gray-5 pb-2 mb-5">
          <label className="block">Charges</label>
          <span>${price}</span>
        </div>
      </div>
      <div className="w-full border-b border-gray-5 pb-2 mb-5">
        <label className="block">Requested Date & Time</label>
        <span>{date.formatMMMMDDYYYY(requestedDate)}</span>
        <span className="text-sm"></span>
        <span className="ml-3">{date.formathhmma(requestedDate)}</span>
      </div>
      <p className="font-rubik text-gray">
        Please note that your payment will only be charged once the physician
        will confirm the appointment. This is only an appointment request.
      </p>
    </>
  );
}
export default StepFour;
