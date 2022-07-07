import React from "react";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  User,
} from "generated/graphql";
import { date } from "common/utils";
import StatusChip from "common/components/StatusChip/StatusChip";

const Columns = [
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
      return (
        <div className="someclass">
          {`${value?.first_name} ${value?.last_name}`}
        </div>
      );
    },
  },
  {
    title: "Booking Date",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (value: string) => {
      return <div className="someclass">{date?.formatMMMMDDYYYY(value)}</div>;
    },
<<<<<<< HEAD
  },
  {
    title: "Type",
    dataIndex: "serviceType",
    key: "name",
    sorter: true,
    render: (value: AppointmentServiceType) => {
      return <div>{`${value?.name}`}</div>;
    },
  },
  {
    title: "Due Date ",
    dataIndex: "appointmentDateTime",
    key: "appointment_time_slots",
    sorter: true,
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      return (
        <div>
          {" "}
          {appointmentDateTime?.startTime
            ? `${date?.formatMMMMDDYYYY(appointmentDateTime?.startTime)} `
            : "-"}
        </div>
      );
=======
    {
      title: "Due Date ",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        multiple: 3,
      },
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
      key: "appointmentDateTime",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        let formatedStartTime = `${
          appointmentDateTime?.startTime?.split(" ")[1]
        } ${appointmentDateTime?.startTime?.split(" ")[2]}`;
        let formatedEndTime = `${appointmentDateTime?.endTime?.split(" ")[1]} ${
          appointmentDateTime?.endTime?.split(" ")[2]
        }`;
        return (
          <div>
            {appointmentDateTime?.startTime && appointmentDateTime?.endTime
              ? `${formatedStartTime} - ${formatedEndTime}`
              : "-"}
          </div>
        );
      },
>>>>>>> 740466185523c2e92632e96b041b6efa743f279e
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
    render: (value: number) => {
      return <div className="someclass">{value ? `$${value}` : ""}</div>;
    },
  },
  {
    title: "Appointment Status",
    dataIndex: "status",
    key: "status",
    className: "table-action-icon",
    render: (value: any) => {
      return (
        <div className="text-primary">
          <StatusChip type={value?.toUpperCase()} />
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
              `/physician/appointments/requested/${appointmentId}`
            );
          }}
        />
      </div>
    ),
  },
];

type Props = {
  appointmentsData?: Appointment[] | undefined;
  loading: boolean | undefined;
  onPaginationChange: () => void;
  onChange: () => void;
  meta: any;
};

const RequestedList = (props: Props) => {
  const { appointmentsData, loading, onPaginationChange, meta, onChange } =
    props || {};

  return (
    <Table
      columns={Columns}
      dataSource={appointmentsData}
      onChange={onChange}
      loading={loading}
      scroll={{ x: true }}
      pagination={{
        total: meta?.totalItems,
        current: meta?.currentPage,
        defaultPageSize: 10,
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
    />
  );
};

export default RequestedList;
