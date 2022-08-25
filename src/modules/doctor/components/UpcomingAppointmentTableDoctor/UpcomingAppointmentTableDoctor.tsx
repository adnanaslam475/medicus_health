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

const timeZone =
  typeof window !== "undefined" &&
  localStorage?.getItem("timeZone") !== "undefined" &&
  localStorage?.getItem("timeZone")
    ? JSON.parse(String(localStorage?.getItem("timeZone")))
    : "America/Cambridge_Bay";
    
const columns = [
  {
    title: "ID#",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Patient name",
    dataIndex: "patient",
    key: "first_name",
    sorter: true,
    render: (value: User) => {
      return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
    },
  },
  {
    title: "Appointment type",
    // dataIndex: "serviceType",
    key: "name",
    sorter: true,
    render: (value: Appointment) => {
      const appointmentType = value?.appointmentTypeProposed?.type || value?.serviceType?.name
      return <div>{appointmentType}</div>;
    },
  },
  // {
  //   title: "Booking date",
  //   dataIndex: "createdAt",
  //   key: "createdAt",
  //   render: (bookingDate: string) => {
  //     return <div>{date.formatDAYMMDDYY(bookingDate)}</div>;
  //   },
  //   sorter: true,
  // },
  {
    title: "Appointment date",
    // dataIndex: "appointmentDateTime",
    // key: "requestedDate",
    sorter: true,
    render: (value: any) => {
      let formatedDueDate = `${
        value?.appointmentDateTime?.startTime?.split(" ")[0]
      }`;
      return (
        <div>
          {value?.appointmentDateTime?.startTime
            ? `${date?.formatDAYMMDDYY(
                value?.appointmentDateTime?.startTime,
                value?.doctor?.timeZone?.timeZone
              )} `
            : "--"}
        </div>
      );
    },
  },
  {
    title: "Appointment time",
    dataIndex: "appointmentDateTime",
    key: "appointmentDateTime",
    sorter: true,
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      return (
        <div>
          {appointmentDateTime?.startTime && appointmentDateTime?.endTime
            ? `${date.formathhmma(
                appointmentDateTime?.startTime,
                timeZone
              )} - ${date.formathhmma(appointmentDateTime?.endTime, timeZone)} `
            : "--"}
        </div>
      );
    },
  },
  {
    title: "Total amount",
    dataIndex: "transaction",
    key: "transaction",
    render: (transaction: Transaction) => {
      return <div>${transaction?.amountReceived || "0"}</div>;
    },
    sorter: true,
  },
  {
    title: "Payment status",
    dataIndex: "transaction",
    key: "transaction",
    className: "table-action-icon",
    render: (transaction: Transaction) => {
      let _status = null;
      if (transaction?.status === "succeeded") {
        _status = "paid";
      } else if (transaction?.status === "Refunded") {
        _status = transaction?.status;
      } else {
        _status = "Unpaid";
      }
      return (
        <div className="text-primary">
          <StatusChip type={_status.toUpperCase() as StatusName} />
        </div>
      );
    },
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
