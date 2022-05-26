import React from "react";
import { Avatar, Button, Checkbox, Form, Input, Tag } from "antd";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import _classes from "./AppointmentButtons.module.scss";
import { ButtonType } from "antd/lib/button";
import { GetAppointmentByIdQuery } from "../../../generated/graphql";
import { date } from "../../utils";
import Router from "next/router";
import ProfileImageWithInfo from "../ProfleImageWithInfo/ProfileImageWithInfo";

type Props = {
  appoinmentDetails?: GetAppointmentByIdQuery | undefined;
};

function AppointmentInfo(props: Props) {
  const { appoinmentDetails } = props;
  const { appointment } = appoinmentDetails || {};
  const { first_name, last_name } =
    appoinmentDetails?.appointment?.doctor || {};

  const { id, status, requestedDate, appointmentTimeSlots } =
    appoinmentDetails?.appointment || {};

  const { name, price } = appoinmentDetails?.appointment?.serviceType || {};

  function timeSlots() {
    if (appointmentTimeSlots) {
      let selectedTimeSlots = appointmentTimeSlots?.find(
        (item) => item?.selected == true
      );

      return selectedTimeSlots;
    }
  }

  return (
    <React.Fragment>
      {/* <ProfileImageWithInfo /> */}
      <div className="max-w-[800px]">
        <LabelValueRow label="ID" value={id} />
        <LabelValueRow
          label="Due date"
          value={date?.formatMMMMDDYYYY(requestedDate)}
        />
        <LabelValueRow
          label="Doctor"
          value={`Dr. ${first_name} ${last_name}`}
        />
        <LabelValueRow label="Type" value={name} />
        <LabelValueRow
          label="Appointment creation date"
          value={date?.formatMMMMDDYYYY(timeSlots()?.startTime)}
        />
        <LabelValueRow
          label="Time"
          value={`${date?.formathhmma(
            timeSlots()?.startTime
          )} - ${date?.formathhmma(timeSlots()?.endTime)}`}
        />
        <LabelValueRow label="Total Amount" value={price} />

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

      <div className="w-4/6 flex justify-between mt-4">
        <div className="flex">
          <Button
            icon={<MessageOutlined />}
            className={`${_classes["appointments-btn"]} mr-3`}
            onClick={() =>
              Router.push({
                pathname: "/patient/messages",
                query: {
                  chat: "admin",
                  doctorId: appointment?.doctorId,
                  patientId: appointment?.patientId,
                },
              })
            }
          >
            Message Admin
          </Button>
          <Button
            icon={<MessageOutlined />}
            className={`${_classes["appointments-btn"]}`}
            onClick={() =>
              Router.push({
                pathname: "/patient/messages",
                query: {
                  chat: "doctor",
                  doctorId: appointment?.doctorId,
                  patientId: appointment?.patientId,
                },
              })
            }
          >
            Message Physician
          </Button>
        </div>
        <Button
          type="primary"
          icon={<VideoCameraFilled />}
          className={`${_classes["appointments-btn"]} bg-current`}
          onClick={() => Router.push(`/patient/appointments/${id}/call`)}
        >
          Join Now
        </Button>
      </div>
    </React.Fragment>
  );
}
export default AppointmentInfo;

function LabelValueRow({
  label,
  value,
}: {
  label: string | number | undefined;
  value: string | number | undefined;
}) {
  return (
    <div className="flex border-b border-gray-5 py-3 ">
      <div className="w-full text-gray-1 max-w-[300px]">{label}</div>
      <div className="w-full text-secondary">{value}</div>
    </div>
  );
}
