import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { GetAllRequestedAppointmentsQuery } from "../../../../generated/graphql";
import { date } from "../../../utils";

const Demodata = [
  {
    key: "1",
    // name: "John Brown",
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    booked_on: "Jan 30, 2022",
    type: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    // status: ['completed', 'pending'],
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    key: "2",
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    booked_on: "Jan 30, 2022",
    type: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    key: "3",
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    booked_on: "Jan 30, 2022",
    type: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    key: "4",
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    booked_on: "Jan 30, 2022",
    type: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    key: "5",
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    booked_on: "Jan 30, 2022",
    type: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },

  {
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    tYpe: "First Consultation",
    booked_on: "Jan 30, 2022",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    booked_on: "Jan 30, 2022",
    type: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    booked_on: "Jan 30, 2022",
    type: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    booked_on: "Jan 30, 2022",
    type: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    booked_on: "Jan 30, 2022",
    type: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
];

interface col {
  title: string;
  dataIndex: string;
  key: "string";
  width: "30%";
}

type Props = {
  appoinmentHistory?: GetAllRequestedAppointmentsQuery | undefined;
};

const TransactionHistory = (props: Props) => {
  const { appoinmentHistory } = props || {};
  console.log("appoinmentHistory", appoinmentHistory?.appointments);
  const columns = [
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
      title: "Booked On",
      dataIndex: "requestedDate",
      key: "requestedDate",
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(value)} `}</div>
        );
      },
    },

    {
      title: "Physician",
      dataIndex: "doctor",
      key: "doctor",
      sorter: {
        compare: (a: any, b: any) => a.doctor - b.doctor,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">{`${value?.first_name} ${value?.last_name}`}</div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "serviceType",
      key: "serviceType",
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
      render: (value: any) => {
        return <div className="someclass">{`${value?.name}`}</div>;
      },
    },

    {
      title: "Date",
      dataIndex: "appointmentTimeSlots",
      key: "appointmentTimeSlots",
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        multiple: 3,
      },
      render: (value: any) => {
        let time = value?.find((time: any) => time.selected == true);
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(
            time?.startTime
          )} `}</div>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentTimeSlots",
      key: "appointmentTimeSlots",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (value: any) => {
        let time = value?.find((time: any) => time.selected == true);
        return (
          <div className="someclass">{`${date?.formathhmma(
            time?.startTime
          )} - ${date?.formathhmma(time?.endTime)}`}</div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "serviceType",
      key: "serviceType",
      sorter: {
        compare: (a: any, b: any) => a.totalamount - b.totalamount,
        multiple: 3,
      },
      render: (value: any) => {
        return <div className="someclass">{`${value?.price}`}</div>;
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transection",
      key: "transection",
      sorter: {
        compare: (a: any, b: any) => a.transection - b.transection,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">{`${
            value?.createdAt ? value?.createdAt : "--"
          }`}</div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a: any, b: any) => a.status - b.status,
        multiple: 3,
      },
      render: (value: any) => {
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
      columns={columns}
      dataSource={appoinmentHistory?.appointments}
      onChange={onChange}
    />
  );
};

export default TransactionHistory;
