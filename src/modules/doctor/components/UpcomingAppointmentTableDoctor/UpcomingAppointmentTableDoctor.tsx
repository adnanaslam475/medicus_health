import React from "react";
import Router from "next/router";
import { Table } from "antd";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  AppointmentTimeSlots,
  User,
} from "generated/graphql";
import { EyeFilled } from "@ant-design/icons";
import { date } from "common/utils";
import _classes from "./UpcomingAppointmentTableDoctor.module.scss";

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
    title: "Service",
    dataIndex: "serviceType",
    key: "name",
    sorter: true,
    render: (value: AppointmentServiceType) => {
      return <div>{value?.name}</div>;
    },
  },
  {
    title: "Booking Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (bookingDate: string) => {
      return <div>{date.formatMMMMDDYYYY(bookingDate)}</div>;
    },
    sorter: true,
  },
  {
    title: "Due Date",
    dataIndex: "requestedDate",
    key: "requestedDate",
    render: (dueDate: string) => {
      return <div>{date.formatMMMMDDYYYY(dueDate)}</div>;
    },
<<<<<<< HEAD
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
=======
    {
      title: "Due Date",
      dataIndex: "appointmentDateTime",
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        let formatedDueDate = `${
          appointmentDateTime?.startTime?.split(" ")[0]
        }`;
        return (
          <div>
            {appointmentDateTime?.startTime
              ? `${date?.formatMMMMDDYYYY(formatedDueDate)} `
              : "--"}
          </div>
        );
      },
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        // multiple: 3,
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentDateTime",
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
      sorter: {
        compare: (a: any, b: any) =>
          a.appointmentTimeSlots - b.appointmentTimeSlots,
        // multiple: 3,
      },
    },
    {
      title: "Total Amount",
      dataIndex: "charges",
      render: (value: number) => {
        return <div>{value}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.charges - b.charges,
        // multiple: 3,
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
>>>>>>> 740466185523c2e92632e96b041b6efa743f279e
        </div>
      );
    },
  },
  {
    title: "Total Amount",
    dataIndex: "charges",
    key: "charges",
    render: (value: number) => {
      return <div>{value}</div>;
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
};

function UpcomingAppointmentTableDoctor({
  dataSource,
  loading,
  meta,
  onPaginationChange,
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
<<<<<<< HEAD
      onChange={onChange}
      pagination={{
        total: meta?.totalItems,
        current: meta?.currentPage,
        defaultPageSize: 10,
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
=======
>>>>>>> 740466185523c2e92632e96b041b6efa743f279e
    />
    // </span>
  );
}

export default UpcomingAppointmentTableDoctor;
