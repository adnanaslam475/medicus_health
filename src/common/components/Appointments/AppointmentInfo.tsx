import React, { useEffect, useMemo, useState } from "react";
import { Button, Tag } from "antd";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import _classes from "./AppointmentButtons.module.scss";
import { GetAppointmentByIdQuery } from "../../../generated/graphql";
import { date } from "../../utils";
import Router from "next/router";
import { isAppointmentTimeValid } from "common/utils/date";
import { CustomTimeSlot } from "common/types/types";

type Props = {
  appoinmentDetails?: GetAppointmentByIdQuery | undefined;
};

function AppointmentInfo(props: Props) {
  const { appoinmentDetails } = props;
  const { first_name, last_name } =
    appoinmentDetails?.appointment?.doctor || {};

  const { id, status, requestedDate, appointmentTimeSlots } =
    appoinmentDetails?.appointment || {};

  const { name, price } = appoinmentDetails?.appointment?.serviceType || {};
  const selectedAppointment: CustomTimeSlot | undefined = useMemo(
    () => appointmentTimeSlots?.find((item) => item.selected),
    [appointmentTimeSlots]
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment]);

  return (
    <React.Fragment>
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
          value={date.formatMMMMDDYYYY(selectedAppointment?.startTime)}
        />
        <LabelValueRow
          label="Time"
          value={`${date?.formathhmma(
            selectedAppointment?.startTime
          )} - ${date?.formathhmma(selectedAppointment?.endTime)}`}
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
            onClick={() => Router.push("/admin/messages")}
          >
            Message Admin
          </Button>
          <Button
            icon={<MessageOutlined />}
            className={`${_classes["appointments-btn"]}`}
            onClick={() => Router.push("/physician/messages")}
          >
            Message Physician
          </Button>
        </div>
        <Button
          type="primary"
          icon={<VideoCameraFilled />}
          className={`${_classes["appointments-btn"]} bg-current`}
          onClick={() => Router.push(`/patient/appointments/${id}/call`)}
          disabled={disabled}
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
