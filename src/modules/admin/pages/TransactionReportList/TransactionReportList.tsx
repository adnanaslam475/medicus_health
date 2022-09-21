import React, { useState } from "react";
import Router from "next/router";
import { Divider, Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import TransactionReportListFilter from "./TransactionReportListFilter";
import MyEarningsStats from "common/components/MyEarningsStats/MyEarningsStats";
import { useGetPhysiciansQuery, User } from "generated/graphql";
import { tableFooter } from "utils/helper";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Appointment ID#",
    dataIndex: "appointment_id",
    key: "appointment_id",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Patient name",
    dataIndex: "patient_name",
    key: "patient_name",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Physician name",
    dataIndex: "patient_name",
    key: "patient_name",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Appointment type",
    dataIndex: "service_type",
    key: "service_type",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Booking date",
    dataIndex: "booking_date",
    key: "booking_date",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Schedule date",
    dataIndex: "schedule_date",
    key: "schedule_date",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Payment status",
    dataIndex: "payment_status",
    key: "payment_status",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Gross sales ($)",
    dataIndex: "gross_sales",
    key: "gross_sales",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Refunds ($)",
    dataIndex: "refund",
    key: "refund",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Taxes ($)",
    dataIndex: "taxes",
    key: "taxes",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Total sales ($)",
    dataIndex: "total_sales",
    key: "total_sales",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },

  {
    title: "Physician fee ($)",
    dataIndex: "physician_fee",
    key: "physician_fee",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },

  {
    title: "Stripe processing fee ($)",
    dataIndex: "stripe_fee",
    key: "stripe_fee",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },

  {
    title: "Net physician fee ($)",
    dataIndex: "net_physician_fee",
    key: "net_physician_fee",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },

  {
    title: "Revenue ($)",
    dataIndex: "medicus_revenue",
    key: "medicus_revenue",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },

  {
    title: "Revenue ($) + Taxes($)",
    dataIndex: "revenue_n_tax",
    key: "revenue_n_tax",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },

  {
    title: "",
    dataIndex: "id",
    key: "view",
    className: "table-action-icon",
    render: (value: any) => (
      <div className="text-primary">
        <EyeFilled
          onClick={() => {
            return Router.push(`/admin/physicians/${value}`);
          }}
        />
      </div>
    ),
  },
];

const Ddata = [
  {
    id: "1",
    // name: "John Brown",
    appointment_id: "MD-2312",
    patient_name: "Dr. Paul Wallner",
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
    id: "2",
    appointment_id: "MD-2312",
    patient_name: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    id: "3",
    appointment_id: "MD-2312",
    patient_name: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    id: "4",
    appointment_id: "MD-2312",
    patient_name: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    id: "5",
    appointment_id: "MD-2312",
    patient_name: "Dr. Paul Wallner",
    service: "First Consultation",
    timeslot: "09:00 AM - 09:30 AM",
    date: "Jan 30, 2022",
    totalamount: "$40.00",
    transactiondate: "Jan 24, 2022",
    status: ["completed", "pending"],
    view: "Eye",
  },
];

function TransactionReportList() {
  const [filterValues, setFilterValues] = useState({});
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }, executeUseGetPhysiciansQuery] =
    useGetPhysiciansQuery({
      variables: {
        filter: filterValues,
        pagination,
        sorting,
      },
    });

  const { getPhysicians } = data || {};

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: `user.${sorter.field}` || "",
    });
  };

  function onChangeFilters(values: any) {
    setFilterValues(values);
    setPagination({ ...pagination, page: 1 });
    executeUseGetPhysiciansQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  return (
    <AppLayout>
      <div className="flex mb-0 flex-wrap">
        <MyEarningsStats
          label={"Net Gross Sales"}
          // text={String(total_number_of_consultation)}
          text={10}
        />
        <MyEarningsStats label={"Total sales"} text={10} />
        <MyEarningsStats label={"Total patients"} text={10} />
        <MyEarningsStats label={"Net physician fee"} text={10} />
        <MyEarningsStats label={"Net medicus revenue"} text={10} />
        <MyEarningsStats label={"Total unique patients"} text={10} />
        <MyEarningsStats label={"Total second opinions"} text={10} />
        <MyEarningsStats label={"Total consultations"} text={10} />
      </div>
      <Divider className="my-0 py-0" />
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-0">Transaction reports</h2>
        </div>
        <TransactionReportListFilter onChange={onChangeFilters} />
        <div className="w-full">
          <div className="">
            <Table
              columns={columns}
              dataSource={Ddata}
              footer={(currentPageCount) =>
                tableFooter(
                  currentPageCount?.length,
                  Number(getPhysicians?.meta?.totalItems || 0)
                )
              }
              onChange={onChange}
              loading={fetching}
              scroll={{ x: true }}
              pagination={{
                total:
                  Number(getPhysicians?.meta?.totalPages) * pagination.limit,
                current: getPhysicians?.meta?.currentPage,
                defaultPageSize: 10,
                onChange: onPaginationChange,
                pageSizeOptions: ["10", "20", "30", "40"],
                showSizeChanger: true,
              }}
            />{" "}
            {/* #do loading to true when api is being implemented */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default TransactionReportList;
