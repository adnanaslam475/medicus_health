import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import {
  Appointment,
  AppointmentServiceType,
  AppointmentTimeSlots,
  DoctorSchedule,
  Transaction,
  User,
} from "generated/graphql";
import { date } from "common/utils";
import StatusChip from "common/components/StatusChip/StatusChip";

type Props = {
  appointmentsData?: Appointment[] | undefined;
};

const RequestedList = (props: Props) => {
  const { appointmentsData } = props || {};

  const Columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 3,
      },
    },
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        multiple: 3,
      },
      render: (value: User) => {
        return (
          <div className="someclass">
            {`${value?.first_name} ${value?.last_name}`}
          </div>
        );
      },
    },
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: {
        compare: (a: any, b: any) => a.createdAt - b.createdAt,
        multiple: 3,
      },
      render: (value: string) => {
        return <div className="someclass">{date?.formatMMMMDDYYYY(value)}</div>;
      },
    },

    {
      title: "Type",
      dataIndex: "serviceType",
      key: "serviceType",
      sorter: {
        compare: (a: any, b: any) => a.serviceType - b.serviceType,
        multiple: 3,
      },
      render: (value: AppointmentServiceType) => {
        return <div className="someclass">{`${value?.name}`}</div>;
      },
    },
    {
      title: "Due Date ",
      dataIndex: "requestedDate",
      key: "requestedDate",
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        multiple: 3,
      },
      render: (value: string) => {
        return <div className="someclass">{date?.formatMMMMDDYYYY(value)}</div>;
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentSchedule",
      key: "appointmentSchedule",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (value: DoctorSchedule) => {
        return (
          <div className="someclass">
            {value?.startTime
              ? `${value?.startTime} - ${value?.endTime}`
              : "--"}
          </div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "charges",
      key: "charges",
      sorter: {
        compare: (a: any, b: any) => a.totalamount - b.totalamount,
        multiple: 3,
      },
      render: (value: number) => {
        return <div className="someclass">{value ? `$ ${value}` : ""}</div>;
      },
    },
    {
      title: "Appointment Status",
      dataIndex: "status",
      key: "status",
      className: "table-action-icon",
      render: (value: any) => {
        return (
          <div className="text-primary">
            <StatusChip type={value?.toUpperCase()} />
          </div>
        );
      },
    },

    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "table-action-icon text-primary",
      render: (appointmentId: number) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() => {
              return Router.push(
                `/physician/appointments/requested/${appointmentId}`
              );
            }}
          />
        </div>
      ),
    },
  ];

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <Table
      columns={Columns}
      dataSource={appointmentsData}
      onChange={onChange}
    />
  );
  // s
};

export default RequestedList;
