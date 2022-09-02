import React from "react";
import Router from "next/router";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import StatusChip from "common/components/StatusChip/StatusChip";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  DateTimeSlots,
  User,
} from "generated/graphql";
import { date } from "common/utils";
import { getCurrentUserTimeZone } from "common/utils/date";

const timeZone = getCurrentUserTimeZone();

const Columns = [
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
      return (
        <div className="someclass">
          {`${value?.first_name} ${value?.last_name}`}
        </div>
      );
    },
  },
  // {
  //   title: "Booking date",
  //   dataIndex: "createdAt",
  //   key: "createdAt",
  //   sorter: true,
  //   render: (value: string) => {
  //     return <div className="someclass">{date?.formatDAYMMDDYY(value)}</div>;
  //   },
  // },
  {
    title: "Appointment type",
    // dataIndex: "serviceType",
    key: "name",
    sorter: true,
    render: (value: Appointment) => {
      const appointmentType =
        value?.appointmentTypeProposed?.type || value?.serviceType?.name || "-";
      return <div>{`${appointmentType}`}</div>;
    },
  },
  {
    title: "Appointment date ",
    // dataIndex: "appointmentDateTime",
    key: "startTime",
    sorter: true,
    render: (value: Appointment) => {
      let appointmentDateTime = value?.appointmentDateTime;
      let status = value?.status;
      return (
        <div>
          {status === "Proposed" || status === "Rescheduled"
            ? (value?.appointmentTypeProposed?.dateTime.map(
                (item: DateTimeSlots) => {
                  return (
                    <li>{`${date.formatDAYMMDDYY(
                      String(item?.date),
                      timeZone
                    )}`}</li>
                  );
                }
              ) as any)
            : status === "Requested" && value?.requestedDate
            ? `${date?.formatMMMMDDYYYY(value?.requestedDate, timeZone)} `
            : `-- `}
        </div>
      );
    },
  },
  {
    title: "Appointment time",
    // dataIndex: "appointmentDateTime",
    key: "startTime",
    sorter: true,
    render: (value: Appointment) => {
      let appointmentDateTime = value?.appointmentDateTime;
      let status = value?.status;
      return (
        <div>
          {(status === "Proposed" || status === "Rescheduled") &&
          value?.appointmentTypeProposed?.dateTime
            ? (value?.appointmentTypeProposed?.dateTime.map(
                (item: DateTimeSlots) => {
                  console.log("item is");
                  return (
                    <li>{`${date.formathhmma(
                      String(item?.startTime),
                      timeZone
                    )} - ${date.formathhmma(
                      String(item?.endTime),
                      timeZone
                    )}`}</li>
                  );
                }
              ) as any)
            : status === "Requested" &&
              appointmentDateTime?.endTime &&
              appointmentDateTime?.startTime
            ? `${date.formathhmma(
                appointmentDateTime?.startTime,
                timeZone
              )} - ${date.formathhmma(appointmentDateTime?.endTime, timeZone)} `
            : ""}
        </div>
      );
    },
  },
  {
    title: "Total amount",
    dataIndex: "appointmentCharges",
    key: "charges",
    sorter: true,
    render: (value: any) => {
      return <div className="someclass">{value ? `$${value?.total}` : ""}</div>;
    },
  },
  {
    title: "Appointment status",
    dataIndex: "status",
    key: "status",
    sorter:true,
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
              `/physician/appointments/pending/${appointmentId}`
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
  onPaginationChange: any;
  onChange: () => void;
  meta: any;
  pagination: any;
};

const RequestedList = (props: Props) => {
  const {
    appointmentsData,
    loading,
    onPaginationChange,
    pagination,
    meta,
    onChange,
  } = props || {};
  const footer = (currentPageData: any) => {
    return<div></div>
    // return appointmentsData?.length ? (
    //   <span>
    //     Showing {currentPageData?.length} out of {appointmentsData?.length}{" "}
    //     entries
    //   </span>
    // ) : (
    //   ""
    // );
  };

  return (
    <Table
      columns={Columns}
      dataSource={appointmentsData}
      footer={footer}
      onChange={onChange}
      loading={loading}
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

export default RequestedList;
