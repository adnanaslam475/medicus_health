import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";

const data = [
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

const TransactionHistory = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "transactionid",
      key: "name",
      sorter: {
        compare: (a: any, b: any) => a.transactionid - b.transactionid,
        multiple: 3,
      },
    },
    {
      title: "Booked On",
      dataIndex: "booked_on",
      key: "booked_on",
      sorter: {
        compare: (a: any, b: any) => a.doctor - b.doctor,
        multiple: 3,
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
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
    },
  
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a: any, b: any) => a.date - b.date,
        multiple: 3,
      },
    },
    {
      title: "Time",
      dataIndex: "timeslot",
      key: "timeslot",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
    },
    {
      title: "Total Amount",
      dataIndex: "totalamount",
      key: "city",
      sorter: {
        compare: (a: any, b: any) => a.totalamount - b.totalamount,
        multiple: 3,
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transactiondate",
      key: "transactiondate",
      sorter: {
        compare: (a: any, b: any) => a.transactiondate - b.transactiondate,
        multiple: 3,
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
      render: () => {
        return (
          <div className="someclass">
            <Tag color="cyan">completed</Tag>
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
  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default TransactionHistory;
