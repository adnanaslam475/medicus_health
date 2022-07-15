import { Table } from "antd";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  AppointmentTimeSlots,
  DoctorSchedule,
  User,
} from "generated/graphql";
import React from "react";

import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import { date } from "common/utils";
import { getUserData } from "common/utils/userData";
import StatusChip from "common/components/StatusChip/StatusChip";
import { StatusName } from "common/types/types";

type Props = {
  dataSource: Appointment[] | undefined;
  loading: boolean | undefined;
};

function CancelledAppointmentTable({ dataSource, loading }: Props) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
        multiple: 3,
      },
    },
    {
      title: "Name",
      dataIndex: "patient",
      render: (value: User) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },

      sorter: {
        compare: (a: any, b: any) => a.first_name - b.first_name,
        multiple: 3,
      },
    },
    {
      title: "Type",
      dataIndex: "serviceType",
      render: (value: AppointmentServiceType) => {
        return <div>{value?.name}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
    },
    {
      title: "Date",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",

      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        let formatedDueDate = `${
          appointmentDateTime?.startTime?.split(" ")[0]
        }`;

        return (
          <div>
            {appointmentDateTime?.startTime
              ? date?.formatMMMMDDYYYY(formatedDueDate)
              : "--"}
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
              : "--"}
          </div>
        );
      },
    },
    {
      title: "Appointment status",
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
      title: "Payment status",
      dataIndex: "transaction",
      key: "transaction",
      className: "table-action-icon",
      render: (value: any) => {
        let _status = null;
        if (value?.status === "succeeded") {
          _status = "paid";
        } else if (value?.status === "Refunded") {
          _status = value?.status;
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
      title: "Total amount",
      dataIndex: "charges",
      key: "charges",
      render: (value: number) => {
        return <div>{value ? `$${value}` : ""}</div>;
      },
    },
    {
      dataIndex: "id",
      className: "table-action-icon",
      key: "id",
      render: (appointmentId: number) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() => {
              return Router.push(
                `/physician/appointments/cancelled/${appointmentId}`
              );
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      scroll={{ x: true }}
    />
  );
}
export default CancelledAppointmentTable;
