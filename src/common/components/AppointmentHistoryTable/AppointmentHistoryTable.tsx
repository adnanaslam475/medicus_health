import React from "react";
import Router from "next/router";
import { Table, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { date } from "../../utils";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  Transaction,
  User,
} from "generated/graphql";

const timeZone = typeof window !== "undefined" && JSON.parse(String(localStorage?.getItem("timeZone")) || "");

const historyColumns = [
  {
    title: "ID#",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  // {
  //   title: "Booked On",
  //   dataIndex: "createdAt",
  //   key: "createdAt",
  //   sorter: true,
  //   render: (createdAt: string) => {
  //     return (
  //       <div>{createdAt ? `${date?.formatDAYMMDDYY(createdAt)}` : "-"}</div>
  //     );
  //   },
  // },
  {
    title: "Physician name",
    dataIndex: "doctor",
    key: "first_name",
    sorter: true,
    render: (doctor: User) => {
      let formatedDoctorFirstName = `${
        doctor?.first_name?.includes("Dr.")
          ? doctor?.first_name
          : `Dr. ${doctor?.first_name}`
      }`;
      return (
        <div className="capitalize">{`${formatedDoctorFirstName} ${doctor.last_name}`}</div>
      );
    },
  },
  {
    title: "Appointment type",
    dataIndex: "serviceType",
    key: "name",
    sorter: true,
    render: (serviceType: AppointmentServiceType) => {
      return <div>{`${serviceType?.name || "-"}`}</div>;
    },
  },
  {
    title: "Appointment date",
    dataIndex: "appointmentDateTime",
    key: "startTime",
    sorter: true,
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      // let formatedDueDate = `${appointmentDateTime?.startTime?.split(" ")[0]}`;
      return (
        <div>
          {appointmentDateTime?.startTime
            ? `${date?.formatDAYMMDDYY(
                appointmentDateTime?.startTime,
                timeZone
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
    sorter: true,
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      return (
        <div>
          {appointmentDateTime?.startTime && appointmentDateTime?.endTime
            ? `${date.formathhmma(appointmentDateTime?.startTime,timeZone)} - ${date.formathhmma(appointmentDateTime?.endTime,timeZone)} `
            : "--"}
        </div>
      );
    },
  },
  {
    title: "Total amount",
    dataIndex: "transaction",
    key: "transaction",
    sorter: true,
    render: (transaction: Transaction) => {
      return <div>{`$${transaction?.amountReceived || "-"}`}</div>;
    },
  },
  {
    title: "Transaction date",
    dataIndex: "transaction",
    key: "createdAt",
    sorter: true,
    render: (transaction: Transaction) => {
      return (
        <div>{`${
          transaction?.createdAt
            ? date?.formatDAYMMDDYY(transaction?.createdAt,timeZone)
            : "--"
        }`}</div>
      );
    },
  },
  {
    title: "Appointment status",
    dataIndex: "status",
    key: "status",
    sorter: true,
    render: (status: string) => {
      return (
        <div>
          <Tag color="cyan">{status}</Tag>
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    className: "table-action-icon",
    render: (id: string) => (
      <div className="text-primary">
        <EyeFilled
          onClick={() => {
            return Router.push(`/patient/appointments/history/${id}`);
          }}
        />
      </div>
    ),
  },
];

type Props = {
  data?: Appointment[];
  loading: boolean | undefined;
  meta: any;
  onChange: (values: any) => void;
  onPaginationChange: any;
  pagination: any;
};

const AppointmentHistoryTable = (props: Props) => {
  const { data, loading, meta, onPaginationChange, pagination, onChange } =
    props || {};

  return (
    <Table
      columns={historyColumns}
      dataSource={data}
      loading={loading}
      onChange={onChange}
      scroll={{ x: true }}
      pagination={{
        total: pagination.limit * meta?.totalPages,
        current: meta?.currentPage,
        defaultPageSize: 10,
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
    />
  );
};

export default AppointmentHistoryTable;
