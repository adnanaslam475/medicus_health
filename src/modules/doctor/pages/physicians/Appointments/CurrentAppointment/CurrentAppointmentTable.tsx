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
import chat from "../../../../../../../public/assets/icon/chat-bubble.svg";
import support from "../../../../../../../public/assets/icon/support.svg";
import Image from "next/image";
import { isChrome, tableFooter } from "utils/helper";

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
    title: "Appointment type",
    dataIndex: "serviceType",
    sorter: false,
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
    sorter: false,
  },
  {
    title: "Appointment time",
    dataIndex: "appointmentScheduletime",
    key: "appointmentScheduletime",
    sorter: false,
  },
  {
    title: "",
    dataIndex: "",
    key: "",
    render: () => {
      return (
        <div className={`${_classes["button-wrap1"]}`}>
          <Button className={`${isChrome && 'antCustomBtn'}`}>Join</Button>
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
            icon={
              <Image
                priority={true}
                width={15}
                height={15}
                src={chat}
                alt=""
                className=""
              />
            }
            type="primary"
            className={`bg-primary ${isChrome && 'antCustomBtn'}`}
          >
            <span className="pl-2">Message physician</span>
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
            icon={
              <Image
                priority={true}
                width={15}
                height={15}
                src={support}
                alt=""
                className=""
              />
            }
            type="primary"
            className={`bg-primary ${isChrome && 'antCustomBtn'}`}
          >
            <span className="pl-2">Message support</span>
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
      footer={(currentPageCount) => tableFooter(currentPageCount?.length, meta?.totalItems)}
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
