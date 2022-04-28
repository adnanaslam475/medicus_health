import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { date } from "../../../utils";
import { EyeFilled } from "@ant-design/icons";
import {
  Appointment,
  GetAllTransactionsQuery,
  Transection,
} from "../../../../generated/graphql";

interface col {
  title: string;
  dataIndex: string;
  key: "string";
  width: "30%";
}

type Props = {
  data: Transection[] | undefined;
};

const TransactionHistory = (props: Props) => {
  const { data } = props || {};

  const transactionsColumns = [
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
      dataIndex: "appointment",
      key: "appointment",
      // sorter: {
      //   compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      //   multiple: 3,
      // },
      render: (value: Appointment) => {
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(
            value?.requestedDate
          )} `}</div>
        );
      },
    },
    {
      title: "Physician",
      dataIndex: "appointment",
      key: "appointment",
      // sorter: {
      //   compare: (a: any, b: any) => a.appointment - b.appointment,
      //   multiple: 3,
      // },
      render: (value: Appointment) => {
        return (
          <div className="someclass">{`${value?.doctor?.first_name} ${value?.doctor?.last_name}`}</div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "appointment",
      key: "appointment",
      // sorter: {
      //   compare: (a: any, b: any) => a.service - b.service,
      //   multiple: 3,
      // },
      render: (value: Appointment) => {
        return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "appointment",
      key: "appointment",
      // sorter: {
      //   compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      //   multiple: 3,
      // },
      render: (value: Appointment) => {
        let time = value?.appointmentTimeSlots?.find((time) => time.selected);
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(
            time?.startTime
          )} `}</div>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "appointment",
      key: "appointment",
      // sorter: {
      //   compare: (a: any, b: any) => a.timeslot - b.timeslot,
      //   multiple: 3,
      // },
      render: (value: Appointment) => {
        let time = value?.appointmentTimeSlots?.find((time) => time.selected);
        return (
          <div className="someclass">{`${date?.formathhmma(
            time?.startTime
          )} - ${date?.formathhmma(time?.endTime)}`}</div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "amountReceived",
      key: "amountReceived",
      // sorter: {
      //   compare: (a: any, b: any) => a.totalamount - b.totalamount,
      //   multiple: 3,
      // },
      render: (value: number) => {
        return <div className="someclass">{`${value}`}</div>;
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "createdAt",
      key: "createdAt",
      // sorter: {
      //   compare: (a: any, b: any) => a.createdAt - b.createdAt,
      //   multiple: 3,
      // },
      render: (value: string) => {
        return (
          <div className="someclass">{`${
            value ? date?.formatMMMMDDYYYY(value) : "--"
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
          <div className="someclass">
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
    <Table
      columns={transactionsColumns}
      dataSource={data}
      onChange={onChange}
    />
  );
};

export default TransactionHistory;
