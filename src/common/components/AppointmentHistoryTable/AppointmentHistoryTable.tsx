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

<<<<<<< HEAD
const historyColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Booked On",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (createdAt: string) => {
      return (
        <div>{createdAt ? `${date?.formatMMMMDDYYYY(createdAt)}` : "-"}</div>
      );
=======
type Props = {
  data?: Appointment[];
  loading: boolean | undefined;
};

const AppointmentHistoryTable = (props: Props) => {
  const { data, loading } = props || {};
  const historyColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Booked On",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (createdAt: string) => {
        return (
          <div className="w-full whitespace-nowrap">
            {createdAt ? `${date?.formatMMMMDDYYYY(createdAt)}` : "-"}
          </div>
        );
      },
>>>>>>> 740466185523c2e92632e96b041b6efa743f279e
    },
  },
  {
    title: "Physician",
    dataIndex: "doctor",
    key: "first_name",
    sorter: true,
    render: (doctor: User) => {
      return <div>{`${doctor.first_name} ${doctor.last_name}`}</div>;
    },
<<<<<<< HEAD
  },
  {
    title: "Type",
    dataIndex: "serviceType",
    key: "name",
    sorter: true,
    render: (serviceType: AppointmentServiceType) => {
      return <div>{`${serviceType?.name || "-"}`}</div>;
    },
  },
  {
    title: "Date",
    dataIndex: "appointmentDateTime",
    key: "appointment_time_slots",
    sorter: true,
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      return (
        <div>
          {appointmentDateTime?.startTime
            ? `${date?.formatMMMMDDYYYY(appointmentDateTime?.startTime)} `
            : "-"}
        </div>
      );
    },
  },
  {
    title: "Time",
    dataIndex: "appointmentDateTime",
    key: "appointment_time_slots",
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
    title: "Total Amount",
    dataIndex: "charges",
    key: "charges",
    sorter: true,
    render: (charges: AppointmentServiceType) => {
      return <div>{`$${charges}`}</div>;
=======
    {
      title: "Type",
      dataIndex: "serviceType",
      key: "serviceType",
      sorter: true,
      render: (serviceType: AppointmentServiceType) => {
        return <div>{`${serviceType?.name || "-"}`}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
      sorter: true,

      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        let formatedDueDate = `${
          appointmentDateTime?.startTime?.split(" ")[0]
        }`;
        return (
          <div className="w-full whitespace-nowrap">
            {appointmentDateTime?.startTime
              ? `${date?.formatMMMMDDYYYY(formatedDueDate)} `
              : "-"}
          </div>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
      sorter: true,
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        let formatedStartTime = `${
          appointmentDateTime?.startTime?.split(" ")[1]
        } ${appointmentDateTime?.startTime?.split(" ")[2]}`;
        let formatedEndTime = `${appointmentDateTime?.endTime?.split(" ")[1]} ${
          appointmentDateTime?.endTime?.split(" ")[2]
        }`;
        return (
          <div className="w-full whitespace-nowrap">
            {appointmentDateTime?.startTime && appointmentDateTime?.endTime
              ? `${formatedStartTime} - ${formatedEndTime}`
              : "-"}
          </div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "charges",
      key: "charges",
      sorter: true,
      render: (charges: AppointmentServiceType) => {
        return <div>{`$${charges}`} </div>;
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transaction",
      key: "transaction",
      sorter: true,

      render: (transaction: Transaction) => {
        return (
          <div className="w-full whitespace-nowrap">{`${
            transaction?.createdAt
              ? date?.formatMMMMDDYYYY(transaction?.createdAt)
              : "--"
          }`}</div>
        );
      },
>>>>>>> 740466185523c2e92632e96b041b6efa743f279e
    },
  },
  {
    title: "Transaction Date",
    dataIndex: "transaction",
    key: "transaction",
    sorter: true,
    render: (transaction: Transaction) => {
      return (
        <div>{`${
          transaction?.createdAt
            ? date?.formatMMMMDDYYYY(transaction?.createdAt)
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
  onPaginationChange: (values: any) => void;
};

const AppointmentHistoryTable = (props: Props) => {
  const { data, loading, meta, onPaginationChange, onChange } = props || {};

  return (
    <Table
      columns={historyColumns}
      dataSource={data}
      loading={loading}
<<<<<<< HEAD
      onChange={onChange}
      scroll={{ x: true }}
      pagination={{
        total: meta?.totalItems,
        current: meta?.currentPage,
        defaultPageSize: 10,
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
=======
      scroll={{ x: true }}
>>>>>>> 740466185523c2e92632e96b041b6efa743f279e
    />
  );
};

export default AppointmentHistoryTable;
