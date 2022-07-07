import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";

const Columns = [
  {
    title: "ID",
    dataIndex: "transactionid",
    key: "transactionid",
    sorter: true,
  },
  {
    title: "Patient",
    dataIndex: "doctor",
    key: "doctor",
    sorter: true,
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
    sorter: true,
    //   render: (value: Appointment) => {
    //     return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    //   },
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: true,
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
    sorter: true,
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
    sorter: true,
    //   render: (value: number) => {
    //     return <div className="someclass">{`${value}`}</div>;
    //   },
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

type Props = {};
const PhysicianList = (props: Props) => {
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
      order:
        (sorter.order === "ascend" && "asc") ||
        (sorter.order === "descend" && "desc") ||
        "",
      column: (!!sorter.order && `user.${sorter.field}`) || "",
    });
  };

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  return (
    <Table
      columns={Columns}
      dataSource={Ddata}
      onChange={onChange}
      pagination={{
        // total: meta?.totalItems,
        // current: meta?.currentPage,
        defaultPageSize: 10,
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
    />
  );
};

export default PhysicianList;
