import React from "react";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import { Button, Tag } from "antd";
import LabelWithText from "common/components/LabelWithText/LabelWithText";

// scss
import _classes from "./DoctorAppointmentInfo.module.scss";
import Router from "next/router";
import { Appointment } from "generated/graphql";
import { formatMMMM_Dcoma_YYYY } from "common/utils/date";
import { date } from "common/utils";

type props = {
  data: Appointment | undefined;
};
function DoctorAppointmentInfo({ data }: props) {
  const {
    id,
    patient,
    serviceType,
    charges,
    status,
    requestedDate,
    appointmentTimeSlots,
  } = data || {};

  function timeSlots() {
    if (appointmentTimeSlots) {
      let selectedTimeSlots = appointmentTimeSlots?.find(
        (item) => item?.selected == true
      );

      return selectedTimeSlots;
    }
  }

  return (
    <div className="max-w-[700px]">
      <div>
        <LabelWithText label="ID" text={id} />
        <LabelWithText
          label="Patient"
          text={`${patient?.first_name} ${patient?.last_name}`}
        />
        <LabelWithText label="Type" text={serviceType?.name} />
        <LabelWithText
          label="Date"
          text={formatMMMM_Dcoma_YYYY(requestedDate)}
        />
        <LabelWithText
          label="Time"
          text={`${date?.formathhmma(
            timeSlots()?.startTime
          )} - ${date?.formathhmma(timeSlots()?.endTime)}`}
        />
        <LabelWithText label="Total Amount" text={charges} />
        {/* <LabelWithText label="Status" text={status as string} /> */}

        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1 max-w-[300px]">Status</div>
          <div className="w-full text-secondary">
            <Tag
              color="#e2f8f7"
              className="ant-typography ant-typography-secondary"
            >
              {status}
            </Tag>
          </div>
        </li>
      </div>
      <DoctorAppointmentInfoFooter />
    </div>
  );
}

export default DoctorAppointmentInfo;

function DoctorAppointmentInfoFooter() {
  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn"]} mr-3`}
          onClick={() => Router.push("/admin/messages")}
        >
          Message Admin
        </Button>
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn"]}`}
          onClick={() => Router.push("/doctor/messages")}
        >
          Message Physician
        </Button>
      </div>
      <Button
        type="primary"
        icon={<VideoCameraFilled />}
        className={`${_classes["appointments-btn"]} bg-current`}
        onClick={() => Router.push("/doctor/appointments/call")}
      >
        Join Now
      </Button>
    </div>
  );
}
