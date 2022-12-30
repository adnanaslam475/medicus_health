import React from "react";
import Router from "next/router";
import {  Table } from "antd";
import {
  Appointment,
  AppointmentDateTimeResponse,
  Transaction,
  User,
} from "generated/graphql";
import { EyeFilled } from "@ant-design/icons";
import { date } from "common/utils";
import StatusChip from "common/components/StatusChip/StatusChip";
import { StatusName } from "common/types/types";
import { currencyFormatter, getCurrentUserTimeZone } from "common/utils/date";
import { tableFooter } from "utils/helper";

const timeZone = getCurrentUserTimeZone();

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
    sorter: false,
    render: (value: Appointment) => {
      const appointmentType =
        value?.appointmentTypeProposed?.type || value?.serviceType?.name;
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
    key: "requestedDate",
    sorter: false,
    render: (value: any) => {
      let formatedDueDate = `${value?.appointmentDateTime?.startTime?.split(" ")[0]
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
    key: "startTime",
    sorter: false,
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
    key: "amountReceived",
    render: (transaction: Transaction) => {
      return <div>{transaction?.amountReceived ? currencyFormatter(transaction?.amountReceived) : "$0"}</div>;
    },
    sorter: true,
  },
  {
    title: "Payment status",
    dataIndex: "transaction",
    key: "status",
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
  let defaultPageSize =
    localStorage.getItem("physicianUpcommingAppointmentperPageLimit") || 10;
  return (
    // <span className={`${_classes["upcomming-appointment-doctor-table"]}`}>
    <Table
      columns={columns}
      dataSource={dataSource}
      // footer={footer}
      loading={loading}
      scroll={{ x: true }}
      onChange={onChange}
      footer={(currentPageCount) =>
        tableFooter(currentPageCount?.length, meta?.totalItems)
      }
      pagination={{
        total: meta?.totalPages * pagination.limit,
        current: meta?.currentPage,
        defaultPageSize: Number(defaultPageSize),
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
    />
    // </span>
  );
}

export default UpcomingAppointmentTableDoctor;
