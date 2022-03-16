import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { EyeFilled } from '@ant-design/icons';

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
      sorter: {
        compare: (a: any, b: any) => a.transactionid - b.transactionid,
        multiple: 3,
      },
      // width: "30%",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      sorter: {
        compare: (a: any, b: any) => a.doctor - b.doctor,
        multiple: 3,
      },
      // width: "20%",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
      // width: "20%",
    },
    {
      title: "Time Slot",
      dataIndex: "timeslot",
      key: "timeslot",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      // width: "20%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a: any, b: any) => a.date - b.date,
        multiple: 3,
      },
      // width: "20%",
    },
    {
      title: "Total Amount",
      dataIndex: "totalamount",
      key: "city",
      sorter: {
        compare: (a: any, b: any) => a.totalamount - b.totalamount,
        multiple: 3,
      },
      // width: "20%",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactiondate",
      key: "transactiondate",
      sorter: {
        compare: (a: any, b: any) => a.transactiondate - b.transactiondate,
        multiple: 3,
      },
      // width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a: any, b: any) => a.status - b.status,
        multiple: 3,
      },
      // width: "20%",
    },
    {
      title: "",
      dataIndex: "",
      key: "view",
      className: 'table-action-icon',
      render: () => <EyeFilled />,    
      // width: "20%",
    },
  ];
  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log('params', pagination, filters, sorter, extra);
  }
  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default TransactionHistory;
