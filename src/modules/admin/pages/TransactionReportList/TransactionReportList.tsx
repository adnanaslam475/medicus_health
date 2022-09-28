import React, { useState } from "react";
import Router from "next/router";
import { Divider, Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import TransactionReportListFilter from "./TransactionReportListFilter";
import MyEarningsStats from "common/components/MyEarningsStats/MyEarningsStats";
import {
  Appointment,
  useGetAdminTransactionReportListingQuery,
  useGetPhysiciansQuery,
  User,
} from "generated/graphql";
import { tableFooter } from "utils/helper";
import { date } from "common/utils";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Appointment ID#",
    dataIndex: "appointmentId",
    key: "appointmentId",
    render: (value: string) => {
      return <div>{value}</div>;
    },
    sorter: true,
  },
  {
    title: "Patient name",
    dataIndex: "appointment",
    key: "patient",
    render: (appointment: Appointment) => {
      const patientName = `${appointment?.patient?.first_name || ""} ${
        appointment?.patient?.last_name || ""
      }`;
      return <div>{patientName}</div>;
    },
    sorter: true,
  },
  {
    title: "Physician name",
    dataIndex: "appointment",
    key: "physician",
    render: (appointment: Appointment) => {
      const physicianName = `${appointment?.doctor?.first_name || ""} ${
        appointment?.doctor?.last_name || ""
      }`;
      return <div>{physicianName}</div>;
    },
    sorter: true,
  },
  {
    title: "Appointment type",
    dataIndex: "appointment",
    key: "serviceType",
    render: (appointment: Appointment) => {
      const serviceType = appointment?.serviceType?.name || "";
      return <div>{serviceType}</div>;
    },
    sorter: true,
  },
  {
    title: "Booking date",
    dataIndex: "appointment",
    key: "requestedDate",
    render: (appointment: Appointment) => {
      const bookingDate = appointment?.requestedDate || "";
      return <div>{date.formatDAYMMDD(bookingDate)}</div>;
    },
    sorter: true,
  },
  {
    title: "Schedule date",
    dataIndex: "appointment",
    key: "requestedDate",
    render: (appointment: Appointment) => {
      const bookingDate = appointment?.requestedDate || "";
      return <div>{date.formatDAYMMDD(bookingDate)}</div>;
    },
    sorter: true,
  },
  {
    title: "Status",
    dataIndex: "appointment",
    key: "status",
    render: (appointment: Appointment) => {
      const status = appointment?.status || "";
      return <div>{status}</div>;
    },
    sorter: true,
  },
  {
    title: "Payment status",
    dataIndex: "payment_status",
    key: "payment_status",
    render: (value: string) => {
      return <div>{value}</div>;
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
    dataIndex: "appointment",
    key: "tax",
    render: (appointment: Appointment) => {
      const tax = appointment?.appointmentCharges?.tax || 0;
      return <div>{tax}</div>;
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
    dataIndex: "stripeFee",
    key: "stripeFee",
    render: (stripeFee: string) => {
      return <div>{stripeFee}</div>;
    },
    sorter: true,
  },

  {
    title: "Net physician fee ($)",
    dataIndex: "doctor_percentage",
    key: "doctor_percentage",
    render: (value: string) => {
      return <div>{value}</div>;
    },
    sorter: true,
  },

  {
    title: "Revenue ($)",
    dataIndex: "medicus_percentage",
    key: "medicus_percentage",
    render: (value: string) => {
      return <div>{value}</div>;
    },
    sorter: true,
  },

  {
    title: "Revenue ($) + Taxes($)",
    dataIndex: "appointment",
    key: "appointmentCharges",
    render: (appointment: Appointment) => {
      const appointmentCharges = appointment?.appointmentCharges?.total || 0;
      return <div>{appointmentCharges}</div>;
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

  const [{ data, fetching }, executeUseGetAdminTransactionReportListingQuery] =
    useGetAdminTransactionReportListingQuery({
      variables: {
        filter: filterValues,
        pagination,
        sorting,
      },
    });

  const { getAdminTransactionReportListing } = data || {};
  const { meta } = getAdminTransactionReportListing || {};

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
    executeUseGetAdminTransactionReportListingQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }
  console.log(
    "getAdminTransactionReportListing",
    getAdminTransactionReportListing?.items
  );

  return (
    <AppLayout>
      <div className="flex mb-0 flex-wrap">
        <MyEarningsStats
          label={"Net gross sales"}
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
              dataSource={getAdminTransactionReportListing?.items}
              footer={(currentPageCount) =>
                tableFooter(
                  currentPageCount?.length,
                  Number(meta?.totalItems || 0)
                )
              }
              onChange={onChange}
              loading={fetching}
              scroll={{ x: true }}
              pagination={{
                total: Number(meta?.totalPages) * pagination.limit,
                current: meta?.currentPage,
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
