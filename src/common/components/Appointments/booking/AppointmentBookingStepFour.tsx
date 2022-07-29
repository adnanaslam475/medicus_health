import React from "react";
import { getUserData } from "common/utils/userData";
import { useGetAppointmentPriceForRequestQuery } from "generated/graphql";
import { date } from "../../../utils";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";

function StepFour() {
  const { data } = useBookAppointment();
  const {
    physicianName,
    requestedDate,
    serviceInfo,
    physician,
    serviceName,
    charges,
    availability,
    doctorSchedule,
  } = data?.stepOne || {};
  const [{ price, name }] = serviceInfo || [{}];
  let doctorName = physician?.split(":")[1];

  const availabilityTime = doctorSchedule?.doctorSchedulesByDay?.find(
    (time: any) => time.id === availability
  );
  const { user } = getUserData();
  const id = user?.id;
  const patientId =
    user?.role === "User" ? id : data?.stepOne?.patient?.split(":")[0];
  const serviceId = data?.stepOne?.service;
  const [{ data: appointmentPriceBreakup }] =
    useGetAppointmentPriceForRequestQuery({
      variables: { serviceId: Number(serviceId), patientId: Number(patientId) },
    });
  const { getAppointmentPriceForRequest } = appointmentPriceBreakup || {};
  const appointmentPrice = getAppointmentPriceForRequest?.appointmentPrice;
  const systemFee = getAppointmentPriceForRequest?.systemFee;
  const tax = getAppointmentPriceForRequest?.tax;
  const total = getAppointmentPriceForRequest?.total;

  return (
    <>
      <h2>Summary</h2>
      <div className="w-full border-b border-gray-5 pb-2 mb-5">
        <label className="block">Doctor</label>
        <span>Dr.{doctorName || physician || ""}</span>
      </div>
      <div className="flex">
        <div className="w-full ml-4 border-b border-gray-5 pb-2 mb-5">
          <div className="flex justify-between  font-semibold">
            <span>Service</span>
            <span>{name || serviceName}</span>
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
          <div className="flex justify-between font-semibold">
            <span>Total charges</span>
            <span>${total || "0"}</span>
          </div>
        </div>
      </div>
      <div className="w-full border-b border-gray-5 pb-2 mb-5">
        <label className="block">Requested date & time</label>
        <span>{date.formatDAYMMDDYY(requestedDate)}</span>
        <span className="text-sm"></span>
        {/* <span className="ml-3">{date.formathhmma(requestedDate)}</span> */}
        <span className="ml-3">{`${availabilityTime?.startTime} - ${availabilityTime?.endTime}`}</span>
      </div>
      <p className="font-rubik text-gray">
        Please note, this is only an appointment request. Your physician will
        respond with a 30 minute time slot within the date & time you have
        indicated. You will be charged upon confirming the appointment time
        proposed by your physician.
      </p>
      <p className="text-red">
      Processing fee is not refundable in the event you cancel your appointment.
      </p>
    </>
  );
}
export default StepFour;
