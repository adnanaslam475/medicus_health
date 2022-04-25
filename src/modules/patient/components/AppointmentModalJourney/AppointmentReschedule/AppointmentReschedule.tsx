import React from "react";
import { Button, Radio, Space } from "antd";
import _classes from "./AppointmentReschedule.module.scss";
function AppointmentReschedule() {
  return (
    <div>
      <h2>Appointment Reschedule</h2>
      <div>
        <div className="border-b border-gray-4 ">
          <h5>Physician</h5>
          <p>Dr. Paul Wallner</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-b col-span-2 border-gray-4 pt-4 ">
            <h5>Service</h5>
            <p>First Consultation</p>
          </div>
          <div className="border-b border-gray-4  pt-4">
            <h5>Charges</h5>
            <p>$59.00</p>
          </div>
        </div>
      </div>
      <div className="py-4">
        <h5>Available Slots (select one)</h5>
        <Radio.Group value={1} className="">
          <Space direction="vertical">
            <Radio className={`bg-gray-4 ${_classes["radio-div"]}`} value={1}>
              February 4, 2022 07:30 am - 08:00 am
            </Radio>
            <Radio className={`bg-gray-4 ${_classes["radio-div"]}`} value={1}>
              February 4, 2022 07:30 am - 08:00 am
            </Radio>
            <Radio className={`bg-gray-4 ${_classes["radio-div"]}`} value={1}>
              February 4, 2022 07:30 am - 08:00 am
            </Radio>
            <Radio className={`bg-gray-4 ${_classes["radio-div"]}`} value={1}>
              February 4, 2022 07:30 am - 08:00 am
            </Radio>
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
