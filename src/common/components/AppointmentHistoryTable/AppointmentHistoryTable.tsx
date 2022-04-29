import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { date } from "../../utils";
import {
  AppointmentServiceType,
  AppointmentTimeSlots,
  Transaction,
  User,
} from "../../../generated/graphql";

interface col {
  title: string;
  dataIndex: string;
  key: "string";
  width: "30%";
}

type Props = {
  data?: any;
};

const AppointmentHistoryTable = (props: Props) => {
  const { data } = props || {};

  const historyColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // sorter: {
      //   compare: (a: any, b: any) => a.id - b.id,
      //   multiple: 3,
      // },
    },
    {
      title: "Booked On",
      dataIndex: "requestedDate",
      key: "requestedDate",
      // sorter: {
      //   compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      //   multiple: 3,
      // },
      render: (value: string) => {
        return <div>{`${date?.formatMMMMDDYYYY(value)} `}</div>;
      },
    },
    {
      title: "Physician",
      dataIndex: "doctor",
      key: "doctor",
      // sorter: {
      //   compare: (a: any, b: any) => a.doctor - b.doctor,
      //   multiple: 3,
      // },
      render: (value: User) => {
        return <div>{`${value.first_name} ${value.last_name}`}</div>;
      },
    },
    {
      title: "Type",
      dataIndex: "serviceType",
      key: "serviceType",
      // sorter: {
      //   compare: (a: any, b: any) => a.service - b.service,
      //   multiple: 3,
      // },
      render: (value: AppointmentServiceType) => {
        return <div>{`${value.name}`}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "appointmentTimeSlots",
      key: "appointmentTimeSlots",
      // sorter: {
      //   compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      //   multiple: 3,
      // },
      render: (value: AppointmentTimeSlots[]) => {
        let time = value?.find((time) => time.selected);
        return <div>{`${date?.formatMMMMDDYYYY(time?.startTime)} `}</div>;
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentTimeSlots",
      key: "appointmentTimeSlots",
      // sorter: {
      //   compare: (a: any, b: any) => a.timeslot - b.timeslot,
      //   multiple: 3,
      // },
      render: (value: AppointmentTimeSlots[]) => {
        let time = value?.find((time) => time.selected);
        return (
          <div>{`${date?.formathhmma(time?.startTime)} - ${date?.formathhmma(
            time?.endTime
          )}`}</div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "serviceType",
      key: "serviceType",
      // sorter: {
      //   compare: (a: any, b: any) => a.totalamount - b.totalamount,
      //   multiple: 3,
      // },
      render: (value: AppointmentServiceType) => {
        return <div>{`${value?.price}`}</div>;
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transection",
      key: "transection",
      // sorter: {
      //   compare: (a: any, b: any) => a.transection - b.transection,
      //   multiple: 3,
      // },
      render: (value: Transaction) => {
        return (
          <div>{`${
            value?.createdAt ? date?.formatMMMMDDYYYY(value?.createdAt) : "--"
          }`}</div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // sorter: {
      //   compare: (a: any, b: any) => a.status - b.status,
      //   multiple: 3,
      // },
      render: (value: string) => {
        return (
          <div>
            <Tag color="cyan">{value}</Tag>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "view",
      className: "table-action-icon",
      render: () => <EyeFilled />,
    },
  ];

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <Table columns={historyColumns} dataSource={data} onChange={onChange} />
  );
};

export default AppointmentHistoryTable;
