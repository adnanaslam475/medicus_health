import React, { useEffect, useState } from "react";
import {
  CheckOutlined,
  MessageOutlined,
  RetweetOutlined,
  DeleteOutlined,
  VideoCameraFilled,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Space,
  Tag,
} from "antd";
import LabelWithText from "common/components/LabelWithText/LabelWithText";
import { useRouter } from "next/router";
import PhysicianIcon from "./../../../../../public/assets/icon/physician.svg";

// scss
import _classes from "./AdminAppointmentInfo.module.scss";
import Router from "next/router";
import {
  Appointment,
  AppointmentServiceType,
  useCancelAppointmentByDoctorMutation,
  useGetAllAppointmentServiceTypesQuery,
  useProposeNewTimeMutation,
} from "generated/graphql";
import { formatMMMM_Dcoma_YYYY, getDayJsObject } from "common/utils/date";
import { date } from "common/utils";
import { getRole } from "common/utils/userData";
import dayjs from "dayjs";
import { FormInstance } from "rc-field-form";
import { FORMAT_D_T_W_AM_PM } from "common/constants/date";

type Props = {
  data: {
    id: string;
    bookingDate: string;
    patient: string;
    physician: string;
    service: string;
    dueDate: string;
    time: string;
    totalAmount: string;
    appointmentStatus: string;
    paymentStatus: string;
  };
};
function AdminAppointmentInfo({ data }: Props) {
  const {
    id,
    bookingDate,
    patient,
    physician,
    service,
    dueDate,
    time,
    totalAmount,
    appointmentStatus,
    paymentStatus,
  } = data || {};

  return (
    <div className="max-w-[700px]">
      <div>
        <LabelWithText label="ID" text={id} />
        <LabelWithText label="Booking Date" text={bookingDate} />
        <LabelWithText label="Patient" text={patient} />
        <LabelWithText label="Physician" text={physician} />
        <LabelWithText label="Service" text={service} />
        <LabelWithText label="Due Date" text={dueDate} />
        <LabelWithText label="Time" text={time} />
        <LabelWithText label="Total Amount" text={totalAmount} />

        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1 max-w-[300px]">
            Appointment Status
          </div>
          <div className="w-full text-secondary">
            <Tag
              color="#e2f8f7"
              className="ant-typography ant-typography-secondary"
            >
              {appointmentStatus}
            </Tag>
          </div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1 max-w-[300px]">Status</div>
          <div className="w-full text-secondary">
            <Tag
              color="#e2f8f7"
              className="ant-typography ant-typography-secondary"
            >
              {paymentStatus}
            </Tag>
          </div>
        </li>
      </div>

      <DoctorAppointmentInfoFooter appointmentId={1} />
    </div>
  );
}

export default AdminAppointmentInfo;

function DoctorAppointmentInfoFooter({
  appointmentId,
}: {
  appointmentId: number | undefined;
}) {
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
          onClick={() => Router.push("/physician/messages")}
        >
          Message Physician
        </Button>
      </div>
    </div>
  );
}
