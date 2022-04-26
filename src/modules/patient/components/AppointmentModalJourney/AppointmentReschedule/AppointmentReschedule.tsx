import React from "react";
import { Button, Radio, Space } from "antd";
import _classes from "./AppointmentReschedule.module.scss";
import {
  Appointment,
  useGetAllCardsQuery,
  useViewSuggestedTimeSlotsQuery,
} from "../../../../../generated/graphql";
import { getUserData } from "../../../../../common/utils/userData";
import { date } from "../../../../../common/utils";

type Props = {
  appointmentId: number;
  appointmentDetails: Appointment;
};

function AppointmentReschedule(props: Props) {
  const { appointmentDetails } = props;
  // const { appointmentTimeSlots } = appointmentDetails;
  console.log(appointmentDetails?.appointmentTimeSlots, "nad");
  console.log(props, "usama");

  const { doctor, serviceType } = appointmentDetails || {};
  const { first_name, last_name } = doctor || {};
  const { name, price } = serviceType || {};
  const doctorName = first_name + " " + last_name;

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
            <p>${price}</p>
          </div>
        </div>
      </div>
      <div className="py-4">
        <h5>Available Slots (select one)</h5>
        <Radio.Group value={1} className="">
          <Space direction="vertical">
            {/* <Radio className={`bg-gray-4 ${_classes["radio-div"]}`} value={1}>
              February 4, 2022 07:30 am - 08:00 am
            </Radio> */}
            <Radio className={`bg-gray-4 ${_classes["radio-div"]}`} value={1}>
              {appointmentDetails?.appointmentTimeSlots?.length === 0 ? (
                <div className="text-secondary">{" - "}</div>
              ) : (
                appointmentDetails?.appointmentTimeSlots?.map((item) => (
                  <div className="text-secondary">
                    <span className="mr-3">
                      {date.formatMMMMDDYYYY(item.startTime)}
                    </span>
                    {`${date.formathhmma(item.startTime)} - ${date.formathhmma(
                      item.endTime
                    )}`}
                  </div>
                ))
              )}
            </Radio>

            {/* <Radio className={`bg-gray-4 ${_classes["radio-div"]}`} value={1}>
              February 4, 2022 07:30 am - 08:00 am
            </Radio>
            <Radio className={`bg-gray-4 ${_classes["radio-div"]}`} value={1}>
              February 4, 2022 07:30 am - 08:00 am
            </Radio>
            <Radio className={`bg-gray-4 ${_classes["radio-div"]}`} value={1}>
              February 4, 2022 07:30 am - 08:00 am
            </Radio> */}
          </Space>
        </Radio.Group>
      </div>

      {/* <div className='flex justify-end gap-2'>
          <Button  className={`${_Classes['button-border']}`}>Reject</Button>
          <Button type="primary" className={`${_Classes['button-background-color']}`}>Proceed To Payment</Button>
        </div> */}
    </div>
  );
}

export default AppointmentReschedule;
