import React from "react";
import DoctorCard from "../../../../../common/components/DoctorCards/DoctorCards";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
// import { useDoctorProfilesQuery } from "../../../../../generated/graphql";
import { Button, Table, Tag, Modal } from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
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
    // status: ['completed', 'pending'],
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

interface col {
  title: string;
  dataIndex: string;
  key: "string";
  width: "30%";
}

function AdminPhysicianList() {
  // const [{ data }] = useDoctorProfilesQuery();
  // const { doctorProfiles } = data || {};

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionid",
      key: "name",
      sorter: {
        compare: (a: any, b: any) => a.transactionid - b.transactionid,
        multiple: 3,
      },
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      sorter: {
        compare: (a: any, b: any) => a.doctor - b.doctor,
        multiple: 3,
      },
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
    },
    {
      title: "Time Slot",
      dataIndex: "timeslot",
      key: "timeslot",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
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

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Admin Physicians</h2>
          <Link passHref href={`/admin/physicians/addPhysician`}>
            <a>
              <Button type="primary">
                <PlusOutlined />
                Add a Physician
              </Button>
            </a>
          </Link>
        </div>
        <SearchFilters />
        <div className="w-full">
          <div className="">
            <Table columns={columns} dataSource={data} onChange={onChange} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPhysicianList;
