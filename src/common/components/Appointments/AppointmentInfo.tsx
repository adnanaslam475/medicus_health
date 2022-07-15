import React, { useEffect, useMemo, useState } from "react";
import { Button, Spin, Tag } from "antd";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import _classes from "./AppointmentButtons.module.scss";
import {
  AppointmentTimeSlots,
  GetAppointmentByIdQuery,
} from "../../../generated/graphql";
import { date } from "../../utils";
import Router from "next/router";
import { isAppointmentTimeValid } from "common/utils/date";
import { CustomTimeSlot } from "common/types/types";

type Props = {
  appoinmentDetails?: GetAppointmentByIdQuery | undefined;
  loading?: boolean;
};

function AppointmentInfo(props: Props) {
  const { appoinmentDetails, loading } = props;
  const { appointment } = appoinmentDetails || {};
  const { first_name, last_name } =
    appoinmentDetails?.appointment?.doctor || {};

  const { id, status, requestedDate, appointmentTimeSlots, createdAt } =
    appoinmentDetails?.appointment || {};

  const { name, price } = appoinmentDetails?.appointment?.serviceType || {};
  const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
    () => appointmentTimeSlots?.find((item) => item.selected),
    [appointmentTimeSlots]
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment]);
  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <>
      <div className="max-w-[700px]">
        <LabelValueRow label="ID" value={Number(id)} />
        <LabelValueRow
          label="Requested date"
          value={date?.formatMMMMDDYYYY(requestedDate)}
        />
        <LabelValueRow
          label="Doctor"
          value={`Dr. ${first_name} ${last_name}`}
        />
        <LabelValueRow label="Type" value={name || "--"} />
        <LabelValueRow
          label="Due date"
          value={date.formatMMMMDDYYYY(selectedAppointment?.startTime)}
        />
        <LabelValueRow
          label="Booking date"
          value={date.formatMMMMDDYYYY(createdAt)}
        />
        <LabelValueRow
          label="Time"
          value={`${date?.formathhmma(
            selectedAppointment?.startTime
          )} - ${date?.formathhmma(selectedAppointment?.endTime)}`}
        />
        <LabelValueRow
          label="Total amount"
          value={price ? `$${price}` : "--"}
        />

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

      <div className="max-w-[700px] flex sm:justify-between flex-wrap justify-center mt-4">
        <div className="flex flex-wrap mb-3 justify-center gap-y-2">
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
            Message admin
          </Button>
          <Button
            icon={<MessageOutlined />}
            className={`${_classes["appointments-btn"]} `}
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
            Message physician
          </Button>
        </div>
        <Button
          type="primary"
          icon={<VideoCameraFilled />}
          className={`${_classes["appointments-btn"]} bg-current`}
          onClick={() => Router.push(`/patient/appointments/${id}/call`)}
          disabled={disabled}
        >
          Join now
        </Button>
      </div>
    </>
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
