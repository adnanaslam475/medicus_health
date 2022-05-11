import { Table } from "antd";
import {
  Appointment,
  AppointmentServiceType,
  AppointmentTimeSlots,
  User,
} from "generated/graphql";
import React from "react";


import engFlag from "../../../../../../public/assets/images/engFlag.png";
import espanolFlag from "../../../../../../public/assets/images/espanolFlag.png";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import { date } from "common/utils";

type Props = {
  dataSource: Appointment[] | undefined;
};

const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["Spanish" as string]: espanolFlag,
};

function CancelledAppointmentTable({ dataSource }: Props) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
        multiple: 3,
      },
    },
    {
      title: "Name",
      dataIndex: "patient",
      render: (value: User) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },

      sorter: {
        compare: (a: any, b: any) => a.first_name - b.first_name,
        multiple: 3,
      },
    },
    {
      title: "Type",
      dataIndex: "serviceType",
      render: (value: AppointmentServiceType) => {
        return <div>{value?.name}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
    },
    {
      title: "Contact Number",
      dataIndex: "patient",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (value: User) => {
        return <div className="someclass">{value.contact_number}</div>;
      },
    },
    {
      title: "Account Creation Date",
      dataIndex: "createdAt",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (value: string) => {
        return <div className="someclass">{date?.formatMMMMDDYYYY(value)}</div>;
      },
    },
    {
      title: "Booking Due Date",
      dataIndex: "bookingDate",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (value: string) => {
        return <div className="someclass">{date?.formatMMMMDDYYYY(value)}</div>;
      },
    },
    {
      title: "Appoinment Time",
      dataIndex: "appoinmentTime",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (value: string) => {
        return <div className="someclass">{date?.formatMMMMDDYYYY(value)}</div>;
      },
    },
    {
      dataIndex: "id",
      className: "table-action-icon",
      render: (appointmentId: number) => (
        <div>
          <EyeFilled
            onClick={() => {
              return Router.push(
                `/doctor/appointments/upcoming/${appointmentId}`
              );
            }}
          />
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={dataSource} />;
}
export default CancelledAppointmentTable;
