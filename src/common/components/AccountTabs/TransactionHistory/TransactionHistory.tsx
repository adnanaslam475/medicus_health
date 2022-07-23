import React, { useState } from "react";
import { EyeFilled } from "@ant-design/icons";
import { Table, Input, Button, Space, Tag } from "antd";
import { date } from "../../../utils";
import {
  Appointment,
  GetAppointmentInput,
  Transaction,
} from "../../../../generated/graphql";
import StatusChip from "common/components/StatusChip/StatusChip";
import { StatusName } from "common/types/types";

const transactionsColumns = [
  {
    title: "ID#",
    dataIndex: "id",
    key: "id",
    sorter: {
      compare: (a: any, b: any) => a.id - b.id,
      multiple: 3,
    },
  },

  {
    title: "Physician",
    dataIndex: "appointment",
    key: "appointment",
    sorter: {
      compare: (a: any, b: any) => a.appointment - b.appointment,
      multiple: 3,
    },
    render: (value: Appointment) => {
      return (
        <div className="someclass">{`${value?.doctor?.first_name} ${value?.doctor?.last_name}`}</div>
      );
    },
  },
  {
    title: "Appointment type",    //change name to appointment type from service type 
    dataIndex: "appointment",
    key: "appointment",
    sorter: {
      compare: (a: any, b: any) => a.service - b.service,
      multiple: 3,
    },
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Time slot",
    dataIndex: "appointment",
    key: "appointment",
    sorter: {
      compare: (a: any, b: any) => a.timeslot - b.timeslot,
      multiple: 3,
    },
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
    title: "Appointment date",
    dataIndex: "appointment",
    key: "appointment",
    sorter: {
      compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      multiple: 3,
    },
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
    title: "Total amount",
    dataIndex: "amountReceived",
    key: "amountReceived",
    sorter: {
      compare: (a: any, b: any) => a.totalamount - b.totalamount,
      multiple: 3,
    },
    render: (value: number) => {
      return <div className="someclass">{`$${value}`}</div>;
    },
  },
  {
    title: "Transaction date",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: {
      compare: (a: any, b: any) => a.createdAt - b.createdAt,
      multiple: 3,
    },
    render: (value: string) => {
      return (
        <div className="someclass">{`${
          value ? date?.formatDAYMMDDYY(value) : "--"
        }`}</div>
      );
    },
  },
  {
    title: "Payment status",
    dataIndex: "status",
    key: "status",
    sorter: {
      compare: (a: any, b: any) => a.status - b.status,
      multiple: 3,
    },
    render: (value: string) => {
      return (
        <div className="someclass">
         
          <StatusChip type={value.toUpperCase() as StatusName} />
        </div>
      );
    },
  },
 
];

type Props = {
  data: Transaction[] | undefined;
};

const TransactionHistory = (props: Props) => {
  const { data } = props || {};

  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );

  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: `user.${sorter.field}` || "",
    });
  };

  // function onChange(pagination: any, filters: any, sorter: any, extra: any) {
  //   console.log("params", pagination, filters, sorter, extra);
  // }

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
