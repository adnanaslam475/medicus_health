import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";



type Props = {
};

const PhysicianList = (props: Props) => {

  const Columns = [
    {
      title: "ID",
      dataIndex: "transactionid",
      key: "transactionid",
      // sorter: {
      //   compare: (a: any, b: any) => a.transactionid - b.transactionid,
      //   multiple: 3,
      // },
    },
    {
      title: "Patient",
      dataIndex: "doctor",
      key: "doctor",
      // sorter: {
      //   compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      //   multiple: 3,
      // },
    //   render: (value: Appointment) => {
    //     return (
    //       <div className="someclass">{`${date?.formatMMMMDDYYYY(
    //         value?.requestedDate
    //       )} `}</div>
    //     );
    //   },
    },
    
    {
      title: "Type",
      dataIndex: "service",
      key: "service",
      // sorter: {
      //   compare: (a: any, b: any) => a.service - b.service,
      //   multiple: 3,
      // },
    //   render: (value: Appointment) => {
    //     return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    //   },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      // sorter: {
      //   compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      //   multiple: 3,
      // },
    //   render: (value: Appointment) => {
    //     let time = value?.appointmentTimeSlots?.find((time) => time.selected);
    //     return (
    //       <div className="someclass">{`${date?.formatMMMMDDYYYY(
    //         time?.startTime
    //       )} `}</div>
    //     );
    //   },
    },
    {
      title: "Time",
      dataIndex: "timeslot",
      key: "timeslot",
      // sorter: {
      //   compare: (a: any, b: any) => a.timeslot - b.timeslot,
      //   multiple: 3,
      // },
    //   render: (value: Appointment) => {
    //     let time = value?.appointmentTimeSlots?.find((time) => time.selected);
    //     return (
    //       <div className="someclass">{`${date?.formathhmma(
    //         time?.startTime
    //       )} - ${date?.formathhmma(time?.endTime)}`}</div>
    //     );
    //   },
    },
    {
      title: "Total Amount",
      dataIndex: "totalamount",
      key: "totalamount",
      // sorter: {
      //   compare: (a: any, b: any) => a.totalamount - b.totalamount,
      //   multiple: 3,
      // },
    //   render: (value: number) => {
    //     return <div className="someclass">{`${value}`}</div>;
    //   },
    },
   
  
    {
      title: "",
      dataIndex: "",
      key: "view",
      className: "table-action-icon",
      render: () => <EyeFilled />,
    },
  ];

  const Ddata = [
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
      // status: ["completed", "pending"],
      status: ["completed", "pending"],
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
      status: ["completed", "pending"],
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
      status: ["completed", "pending"],
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
      status: ["completed", "pending"],
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
      status: ["completed", "pending"],
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
      status: ["completed", "pending"],
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
      status: ["completed", "pending"],
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
      status: ["completed", "pending"],
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
      status: ["completed", "pending"],
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
      status: ["completed", "pending"],
      view: "Eye",
    },
  ];

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <Table
      columns={Columns}
      dataSource={Ddata}
      onChange={onChange}
    />
  );
};

export default PhysicianList;
