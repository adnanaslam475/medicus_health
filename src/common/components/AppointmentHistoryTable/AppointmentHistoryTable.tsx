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
    title: "Physician",
    dataIndex: "doctor",
    key: "first_name",
    sorter: true,
    render: (doctor: User) => {
      return (
        <div className="capitalize">{`Dr.${doctor.first_name} ${doctor.last_name}`}</div>
      );
    },
  },
  {
    title: "Service type",
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
      return (
        <div>
          {appointmentDateTime?.startTime
            ? `${date?.formatDAYMMDDYY(appointmentDateTime?.startTime)} `
            : "-"}
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
            ? `${date?.formathhmma(
                appointmentDateTime?.startTime
              )} - ${date?.formathhmma(appointmentDateTime?.endTime)}`
            : "-"}
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
            ? date?.formatDAYMMDDYY(transaction?.createdAt)
            : "--"
        }`}</div>
      );
    },
  },
  {
    title: "Status",
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
