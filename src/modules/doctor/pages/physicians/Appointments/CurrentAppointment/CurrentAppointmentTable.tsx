import { Button, Table } from "antd";
import {
  Appointment,
  AppointmentServiceType,
  AppointmentTimeSlots,
  DoctorSchedule,
  User,
} from "generated/graphql";
import React from "react";

import { EyeFilled, MessageOutlined } from "@ant-design/icons";
import Router from "next/router";
import { date } from "common/utils";
import _classes from "./CurrentAppointment.module.scss";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
  },
  {
    title: "Physician name",
    dataIndex: "physician",
    render: (value: User) => {
      return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Service type",
    dataIndex: "serviceType",
    sorter: true,
  },
  // {
  //   title: "Booking date",
  //   dataIndex: "requestedDate",
  //   key: "requestedDate",
  //   sorter: true,
  //   render: (value: string) => {
  //     return <div className="someclass">{date?.formatDAYMMDDYY(value)}</div>;
  //   },
  // },
  {
    title: "Appointment date",
    dataIndex: "appointmentSchedule",
    key: "appointmentSchedule",
    sorter: true,
  },
  {
    title: "Appointment time",
    dataIndex: "appointmentScheduletime",
    key: "appointmentScheduletime",
    sorter: true,
  },
  {
    title: "",
    dataIndex: "",
    key: "",
    render: () => {
      return (
        <div className={`${_classes["button-wrap1"]}`}>
          <Button>Join</Button>
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "",
    key: "",
    render: () => {
      return (
        <div className={`${_classes["button-wrap"]}`}>
          <Button
            icon={<MessageOutlined />}
            type="primary"
            className="bg-primary"
          >
            Message physician
          </Button>
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "",
    // key: "",
    render: () => {
      return (
        <div className={`${_classes["button-wrap"]}`}>
          <Button
            icon={<MessageOutlined />}
            type="primary"
            className="bg-primary"
          >
            Message support
          </Button>
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    className: "table-action-icon text-primary",
    render: (appointmentId: number) => (
      <div className="text-primary">
        <EyeFilled
          onClick={() => {
            return Router.push(
              `/physician/appointments/current/${appointmentId}`
            );
          }}
        />
      </div>
    ),
  },
];

type Props = {
  loading: boolean | undefined;
  data: Appointment[] | undefined;
  onPaginationChange: any;
  onChange: () => void;
  meta: any;
  pagination: any;
};

function CurrentAppointmentTable({
  data,
  loading,
  meta,
  pagination,
  onPaginationChange,
  onChange,
}: Props) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      onChange={onChange}
      scroll={{ x: true }}
      pagination={{
        total: meta?.totalPages * pagination.limit,
        current: meta?.currentPage,
        defaultPageSize: 10,
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
    />
  );
}
export default CurrentAppointmentTable;
