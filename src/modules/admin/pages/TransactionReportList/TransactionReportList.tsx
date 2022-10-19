import React, { useState } from "react";
import Router from "next/router";
import { Divider, Skeleton, Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import TransactionReportListFilter from "./TransactionReportListFilter";
import MyEarningsStats from "common/components/MyEarningsStats/MyEarningsStats";
import {
  Appointment,
  Transaction,
  useGetAdminTransactionReportListingQuery,
  useGetAdminTransactionReportQuery,
  useGetPhysiciansQuery,
  User,
} from "generated/graphql";
import { tableFooter } from "utils/helper";
import { date } from "common/utils";
import { currencyFormatter, numberFormatter } from "common/utils/date";
import StatusChip from "common/components/StatusChip/StatusChip";
import { StatusName } from "common/types/types";
import { addDecimaltoAmount } from "common/utils/helper";

const columns = [
  {
    title: "ID#",
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
    key: "appointment",
    render: (appointment: Appointment) => {
      const serviceType = appointment?.appointmentTypeProposed?.type || "";
      return <div>{serviceType}</div>;
    },
    sorter: true,
  },
  {
    title: "Appointment date",
    dataIndex: "appointment",
    key: "requestedDate",
    render: (appointment: Appointment) => {
      const scheduleDate = appointment?.appointmentDateTime?.startTime || "";
      return <div>{date.formatDAYMMDD(scheduleDate)}</div>;
    },
    sorter: true,
  },
  {
    title: "Status",
    dataIndex: "appointment",
    key: "status",
    render: (appointment: Appointment) => {
      return (
        <div className="w-full text-primary">
          <StatusChip type={appointment?.status?.toUpperCase() as StatusName} />
        </div>
      );
    },
    sorter: true,
  },
  {
    title: "Payment status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      let _status = null;
      if (status === "succeeded") {
        _status = "paid";
      } else if (status === "Refunded") {
        _status = status;
      } else {
        _status = "Unpaid";
      }
      return (
        <div className="text-primary">
          <StatusChip type={_status.toUpperCase() as StatusName} />
        </div>
      );
    },
    sorter: true,
  },
  {
    title: "Gross sales ($)",
    // dataIndex: "status",
    // key: "appointment",
    render: (transaction: Transaction) => {
      const refund =
        transaction?.status === "Refunded"
          ? 0
          : `${transaction?.appointmentCharges}`;
      return <div>{addDecimaltoAmount(refund as any)}</div>;
    },
    sorter: true,
  },
  {
    title: "Refunds ($)",
    // dataIndex: "appointment",
    // key: "appointment",
    render: (transaction: Transaction) => {
      const refund =
        transaction?.status === "Refunded"
          ? `-${transaction?.appointmentCharges}`
          : 0.0;
      return <div>{addDecimaltoAmount(refund as any)}</div>;
    },
    sorter: true,
  },
  {
    title: "Taxes ($)",
    dataIndex: "appointment",
    key: "tax",
    render: (appointment: Appointment) => {
      const tax = appointment?.appointmentCharges?.tax || 0;
      return <div>{addDecimaltoAmount(numberFormatter(tax))}</div>;
    },
    sorter: true,
  },

  {
    title: "System processing fee ($)",
    // dataIndex: "transaction",
    // key: "transaction",
    render: (transaction: Transaction) => {
      const stripeFee =
        transaction?.status === "Refunded" ? 0 : transaction?.stripeFee;
      return <div>{stripeFee}</div>;
    },
    sorter: true,
  },
  {
    title: "Total sales ($)",
    dataIndex: "appointment",
    key: "appointment",
    render: (appointment: any) => {
      const totalSales =
        appointment?.transaction?.status === "Refunded"
          ? `-${appointment?.transaction.amountReceived}`
          : appointment?.transaction.amountReceived;
      return <div>{addDecimaltoAmount(totalSales)}</div>;
    },
    sorter: true,
  },

  {
    title: "Net physician fee ($)",
    // dataIndex: "doctor_percentage",
    // key: "doctor_percentage",
    render: (transaction: Transaction) => {
      const physicianFee =
        transaction?.status === "Refunded"
          ? `-${transaction?.doctor_percentage}`
          : transaction?.doctor_percentage;
      return <div>{addDecimaltoAmount(physicianFee)}</div>;
    },
    sorter: true,
  },

  {
    title: "Net medicus fee($)",
    // dataIndex: "medicus_percentage",
    // key: "medicus_percentage",
    render: (transaction: Transaction) => {
      const medicusFee =
        transaction?.status === "Refunded"
          ? `-${transaction?.medicus_percentage}`
          : transaction?.medicus_percentage;
      // return <div>{medicusFee}</div>;
      return <div>{addDecimaltoAmount(medicusFee)}</div>;
    },
    sorter: true,
  },
];
function TransactionReportList() {
  const [filterValues, setFilterValues] = useState({});
  const [statisticsFilterValues, setStatisticsFilterValues] = useState({});
  let defaultPageSize =
    localStorage.getItem("adminTransactionReportPerPageLimit") || 10;
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: Number(defaultPageSize),
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
      requestPolicy: "network-only",
    });
  const [
    { data: statisticsData, fetching: statisticsLoading },
    executeUseGetAdminTransactionReportQuery,
  ] = useGetAdminTransactionReportQuery({
    variables: {
      filter: statisticsFilterValues,
    },
  });

  const { getAdminTransactionReportListing } = data || {};
  const { meta } = getAdminTransactionReportListing || {};

  const onPaginationChange = (page: number, limit: number) => {
    localStorage.setItem("adminTransactionReportPerPageLimit", String(limit));
    setPagination({ page, limit });
  };

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: `user.${sorter.field}` || "",
    });
  };

  function onChangeFilters(values: any) {
    setFilterValues(values);
    setStatisticsFilterValues(values);
    setPagination({ ...pagination, page: 1 });
    executeUseGetAdminTransactionReportListingQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });

    executeUseGetAdminTransactionReportQuery({
      filter: statisticsFilterValues,
      requestPolicy: "network-only",
    });
  }

  const { getAdminTransactionReport } = statisticsData || {};
  const {
    total_number_of_users = 0,
    total_medicus_revenue = 0,
    total_sale = 0,
    net_gross_sale = 0,
    net_physician_fee = 0,
    total_number_of_consultation = 0,
    total_number_of_second_opinions = 0,
  } = getAdminTransactionReport || {};

  const transactionStatistics = [
    {
      key: "Total sales",
      value: currencyFormatter(Number(total_sale)),
    },
    {
      key: "Total patients",
      value: numberFormatter(Number(total_number_of_users)),
    },
    {
      key: "Net physician fee",
      value: currencyFormatter(Number(net_physician_fee)),
    },
    {
      key: "Net medicus revenue",
      value: currencyFormatter(Number(total_medicus_revenue)),
    },
    {
      key: "Total consultations",
      value: numberFormatter(Number(total_number_of_consultation)),
    },
    {
      key: "Total second opinions",
      value: numberFormatter(Number(total_number_of_second_opinions)),
    },
    {
      key: "Net gross sales",
      value: currencyFormatter(Number(net_gross_sale)),
    },
  ];
  return (
    <AppLayout>
      <div className="flex mb-0 flex-wrap">
        <Skeleton loading={statisticsLoading} paragraph={{ rows: 0 }} active>
          {transactionStatistics.map((item, index) => (
            <MyEarningsStats label={item.key} text={item.value} key={index} />
          ))}
        </Skeleton>
      </div>
      <Divider className="my-0 py-0" />
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-0">Transaction reports</h2>
        </div>
        <TransactionReportListFilter onChange={onChangeFilters} />
        <div className="w-full">
          <div className="table-with-fixed-header">
            <Table
              scroll={{ x: true }}
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
              pagination={{
                total: Number(meta?.totalPages) * pagination.limit,
                current: meta?.currentPage,
                defaultPageSize: Number(defaultPageSize),
                onChange: onPaginationChange,
                pageSizeOptions: ["10", "20", "30", "40"],
                showSizeChanger: true,
              }}
              className="table-with-fixed-header"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default TransactionReportList;
