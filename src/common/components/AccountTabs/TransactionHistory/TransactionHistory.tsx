import React, { Dispatch, SetStateAction, useState } from "react";
import { Table } from "antd";
import { date } from "../../../utils";
import {
  Appointment,
  GetAppointmentInput,
  Transaction,
} from "../../../../generated/graphql";
import StatusChip from "common/components/StatusChip/StatusChip";
import { StatusName } from "common/types/types";
import { tableFooter } from "utils/helper";
import { currencyFormatter, getCurrentUserTimeZone } from "common/utils/date";

const timeZone = getCurrentUserTimeZone();
const transactionsColumns = [
  {
    title: "ID#",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },

  {
    title: "Physician name",
    dataIndex: "appointment",
    key: "first_name",
    sorter: true,
    render: (value: Appointment) => {
      return (
        <div className="someclass">{`${value?.doctor?.first_name} ${value?.doctor?.last_name}`}</div>
      );
    },
  },
  {
    title: "Appointment type", //change name to appointment type from appointment type
    dataIndex: "appointment",
    key: "name",
    sorter: false,

    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Appointment time",
    dataIndex: "appointment",
    key: "startTime",
    sorter: false,
    // sorter: {
    //   compare: (a: any, b: any) => a.timeslot - b.timeslot,
    //   multiple: 3,
    // },
    render: (value: Appointment) => {
      let time = value?.appointmentTimeSlots?.find((time) => time.selected);
      return (
        <div className="someclass">{`${date?.formathhmma(
          time?.startTime,
          timeZone
        )} - ${date?.formathhmma(time?.endTime, timeZone)}`}</div>
      );
    },
  },
  {
    title: "Appointment date",
    dataIndex: "appointment",
    key: "requestedDate",
    sorter: false,
    render: (value: Appointment) => {
      let time = value?.appointmentTimeSlots?.find((time) => time.selected);
      return (
        <div className="someclass">{`${date?.formatMMMMDDYYYY(
          time?.startTime,
          timeZone
        )} `}</div>
      );
    },
  },

  {
    title: "Total amount",
    dataIndex: "amountReceived",
    key: "amountReceived",
    sorter: true,
    render: (value: number) => {
      return <div>{value ? currencyFormatter(value) : "-"}</div>;
    },
  },
  {
    title: "Transaction date",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (value: string) => {
      return (
        <div className="someclass">{`${
          value ? date?.formatDAYMMDDYY(value) : "--"
        }`}</div>
      );
    },
  },
  {
    title: "Payment status",
    dataIndex: "status",
    key: "status",
    sorter: true,
    render: (value: string) => {
      if (value === "succeeded") value = "Paid";
      return (
        <div className="someclass">
          <StatusChip type={value.toUpperCase() as StatusName} />
        </div>
      );
    },
  },
];

type Props = {
  data: Transaction[] | undefined;
  setSorting?: Dispatch<SetStateAction<any>> | undefined;
  meta: any;
  loading?: boolean | undefined;
};

const TransactionHistory = (props: Props) => {
  const { data, setSorting, meta, loading } = props || {};

  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );

  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  // const onChange = (...params: any) => {
  //   const [, , sorter] = params;
  //   setSorting({
  //     order: sorter.order?.replace("end", "") || "",
  //     column: `user.${sorter.field}` || "",
  //   });
  // };

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting &&
      setSorting({
        order: sorter.order?.replace("end", "") || "",
        column: sorter.order
          ? `${
              (sorter.field === "transaction" && "transaction") ||
              (/(charges|requestedDate|createdAt|id)/.test(sorter.columnKey) &&
                "appointment") ||
              (sorter.columnKey === "name" && "appointment_service_type") ||
              (sorter.columnKey === "startTime" && "appointment_time_slots") ||
              (sorter.columnKey === "amountReceived" && "transaction") ||
              (sorter.columnKey === "requestedDate" && "appointment") ||
              (sorter.columnKey === "status" && "transaction") ||
              "user"
            }.${sorter.columnKey || sorter.field}`
          : "",
      });
  };
  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  return (
    <Table
      columns={transactionsColumns}
      dataSource={data}
      onChange={onChange}
      scroll={{ x: true }}
      footer={(currentPageCount) =>
        tableFooter(currentPageCount?.length, meta?.totalItems)
      }
      loading={loading}
      // pagination={{
      //   total: pagination.limit * meta?.totalPages,
      //   current: meta?.currentPage,
      //   defaultPageSize: 10,
      //   onChange: onPaginationChange,
      //   pageSizeOptions: ["10", "20", "30", "40"],
      //   showSizeChanger: true,
      // }}
    />
  );
};

export default TransactionHistory;
