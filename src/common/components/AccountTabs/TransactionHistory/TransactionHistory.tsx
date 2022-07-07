import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { date } from "../../../utils";
import { EyeFilled } from "@ant-design/icons";
import { Appointment, Transaction } from "../../../../generated/graphql";

const transactionsColumns = [
  {
    title: "Transaction ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },

  {
    title: "Doctor",
    dataIndex: "appointment",
    key: "appointment",
    sorter: true,
    render: (value: Appointment) => {
      return (
        <div className="someclass">{`${value?.doctor?.first_name} ${value?.doctor?.last_name}`}</div>
      );
    },
  },
  {
    title: "Service",
    dataIndex: "appointment",
    key: "appointment",
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Time Slot",
    dataIndex: "appointment",
    key: "appointment",
    sorter: true,
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
    title: "Date",
    dataIndex: "appointment",
    key: "appointment",
    sorter: true,
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
    title: "Total Amount",
    dataIndex: "amountReceived",
    key: "amountReceived",
    sorter: true,
    render: (value: number) => {
      return <div className="someclass">{`$${value}`}</div>;
    },
  },
  {
    title: "Transaction Date",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (value: string) => {
      return (
        <div className="someclass">{`${
          value ? date?.formatDate_n_Time(value) : "--"
        }`}</div>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: true,
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
    render: () => (
      <div className="text-primary">
        <EyeFilled />
      </div>
    ),
  },
];

type Props = {
  data: Transaction[] | undefined;
};

const TransactionHistory = (props: Props) => {
  const { data } = props || {};
  // const [pagination, setPagination] = React.useState({
  //   page: 1,
  //   limit: 10,
  // });
  // const [sorting, setSorting] = React.useState({
  //   column: "",
  //   order: "",
  // });

  // const onChange = (...params: any) => {
  //   const [, , sorter] = params;
  //   setSorting({
  //     order: sorter.order?.replace("end", "") || "",
  //     column: `user.${sorter.field}` || "",
  //   });
  // };
  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <Table
      columns={transactionsColumns}
      dataSource={data}
      onChange={onChange}
      scroll={{ x: true }}
    />
  );
};

export default TransactionHistory;
