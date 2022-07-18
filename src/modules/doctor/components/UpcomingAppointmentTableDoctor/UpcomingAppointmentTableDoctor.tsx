import React from "react";
import Router from "next/router";
import { Pagination, Table } from "antd";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  AppointmentTimeSlots,
  Transaction,
  User,
} from "generated/graphql";
import { EyeFilled } from "@ant-design/icons";
import { date } from "common/utils";
import _classes from "./UpcomingAppointmentTableDoctor.module.scss";
import StatusChip from "common/components/StatusChip/StatusChip";
import { StatusName } from "common/types/types";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Patient",
    dataIndex: "patient",
    key: "first_name",
    sorter: true,
    render: (value: User) => {
      return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
    },
  },
  {
    title: "Service type",
    dataIndex: "serviceType",
    key: "name",
    sorter: true,
    render: (value: AppointmentServiceType) => {
      return <div>{value?.name}</div>;
    },
  },
  {
    title: "Booking date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (bookingDate: string) => {
      return <div>{date.formatMMMMDDYYYY(bookingDate)}</div>;
    },
    sorter: true,
  },
  {
    title: "Due date",
    dataIndex: "requestedDate",
    key: "requestedDate",
    render: (dueDate: string) => {
      return <div>{date.formatMMMMDDYYYY(dueDate)}</div>;
    },
    sorter: true,
  },
  {
    title: "Time",
    dataIndex: "appointmentTimeSlots",
    key: "",
    sorter: true,
    render: (value: AppointmentTimeSlots[]) => {
      let filteredVal = value?.filter(
        (val: AppointmentTimeSlots) => val?.selected
      );
      return (
        <div>
          {filteredVal[0]?.startTime &&
            `${date.formathhmma(
              filteredVal[0]?.startTime
            )} - ${date.formathhmma(filteredVal[0]?.endTime)}`}
        </div>
      );
    },
  },
  {
    title: "Total amount",
    dataIndex: "charges",
    key: "charges",
    render: (value: number) => {
      return <div>{value}</div>;
    },
    sorter: true,
  },
  {
    title: "Payment Status",
    dataIndex: "transaction",
    key: "transaction",
    render: (transaction: Transaction) => {
      return (
        <StatusChip
          type={String(transaction?.payment_status).toUpperCase() as StatusName}
        />
      );
    },
    sorter: true,
  },
  {
    dataIndex: "id",
    className: "table-action-icon",
    render: (appointmentId: number) => (
      <div className="text-primary">
        <EyeFilled
          onClick={() => {
            return Router.push(
              `/physician/appointments/upcoming/${appointmentId}`
            );
          }}
        />
      </div>
    ),
  },
];

type Props = {
  dataSource: Array<Appointment>;
  loading: boolean | undefined;
  onPaginationChange: any;
  onChange: (values: any) => void;
  meta: any;
  pagination: any;
};

function UpcomingAppointmentTableDoctor({
  dataSource,
  loading,
  meta,
  onPaginationChange,
  pagination,
  onChange,
}: Props) {
  const footer = (currentPageData: any) => {
    return dataSource?.length ? (
      <span>
        Showing {currentPageData?.length} out of {dataSource?.length} entries
      </span>
    ) : (
      ""
    );
  };

  return (
    // <span className={`${_classes["upcomming-appointment-doctor-table"]}`}>
    <Table
      columns={columns}
      dataSource={dataSource}
      footer={footer}
      loading={loading}
      scroll={{ x: true }}
      onChange={onChange}
      pagination={{
        total: meta?.totalPages * pagination.limit,
        current: meta?.currentPage,
        defaultPageSize: 10,
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
    />
    // </span>
  );
}

export default UpcomingAppointmentTableDoctor;
