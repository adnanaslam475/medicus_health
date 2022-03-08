import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";

const data = [
  {
    key: "1",
    // name: "John Brown",
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: "Pending",
    view: "Eye",
  },
  {
    key: "2",
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: "Pending",
    view: "Eye",
  },
  {
    key: "3",
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: "Pending",
    view: "Eye",
  },
  {
    key: "4",
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: "Pending",
    view: "Eye",
  },
  {
    key: "5",
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: "Pending",
    view: "Eye",
  },

  {
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: "Pending",
    view: "Eye",
  },
  {
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: "Pending",
    view: "Eye",
  },
  {
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: "Pending",
    view: "Eye",
  },
  {
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: "Pending",
    view: "Eye",
  },
  {
    transactionid: "MD-2312",
    doctor: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: "Pending",
    view: "Eye",
  },
];

interface col {
  title: string;
  dataIndex: string;
  key: "string";
  width: "30%";
}

const TransactionHistory = () => {
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionid",
      key: "name",
      // width: "30%",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      // width: "20%",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      // width: "20%",
    },
    {
      title: "Time Slot",
      dataIndex: "timeslot",
      key: "timeslot",
      // width: "20%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      // width: "20%",
    },
    {
      title: "Total Amount",
      dataIndex: "totalamount",
      key: "city",
      // width: "20%",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactiondate",
      key: "transactiondate",
      // width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // width: "20%",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      // width: "20%",
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default TransactionHistory;
