import React from "react";
import Router from "next/router";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  Transaction,
  User,
} from "generated/graphql";
import { date } from "common/utils";
// import { getUserData } from "common/utils/userData";
import StatusChip from "common/components/StatusChip/StatusChip";
import { StatusName } from "common/types/types";

type Props = {
  dataSource: Appointment[] | undefined;
  loading: boolean | undefined;
  onChange: any;
  meta: any;
  onPaginationChange: any;
  pagination: any;
};

function CancelledAppointmentTable({
  dataSource,
  loading,
  meta,
  onChange,
  pagination,
  onPaginationChange,
}: Props) {
  const timeZone =
  typeof window !== "undefined" &&
  localStorage?.getItem("timeZone") !== "undefined" &&
  localStorage?.getItem("timeZone")
    ? JSON.parse(String(localStorage?.getItem("timeZone")))
    : "America/Cambridge_Bay";

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
      render: (value: User) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },
      sorter: true,
    },
    {
      title: "Appointment type",
      dataIndex: "serviceType",
      key: "name",
      sorter: true,
      render: (value: AppointmentServiceType) => {
        return <div>{value?.name}</div>;
      },
    },
    {
      title: "Appointment date",
      dataIndex: "appointmentDateTime",
      key: "appointment_time_slots",
      sorter: true,
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        let formatedDueDate = `${
          appointmentDateTime?.startTime?.split(" ")[0]
        }`;

        return (
          <div className="someclass">
            {appointmentDateTime?.startTime
              ? `${date?.formatDAYMMDDYY(formatedDueDate)} `
              : "--"}
          </div>
        );
      },
    },
    {
      title: "Appointment time",
      dataIndex: "appointmentDateTime",
      key: "appointment_time_slots",
      sorter: true,
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        let formatedStartTime = 
          date.formathhmma(String(appointmentDateTime?.startTime),timeZone);
        let formatedEndTime = date.formathhmma(String(appointmentDateTime?.endTime),timeZone);
        return (
          <div>
            {appointmentDateTime?.startTime && appointmentDateTime?.endTime
              ? `${formatedStartTime} - ${formatedEndTime} `
              : "--"}
          </div>
        );
      },
    },
    {
      title: "Total amount",
      dataIndex: "transaction",
      key: "charges",
      sorter: true,
      render: (transaction:Transaction) => {
        return <div>{transaction?.amountReceived ? `$${transaction?.amountReceived}` : "--"}</div>;
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

    // {
    //   title: "Appointment status",
    //   dataIndex: "status",
    //   key: "status",
    //   className: "table-action-icon",
    //   render: (value: any) => {
    //     return (
    //       <div className="text-primary">
    //         <StatusChip type={value?.toUpperCase()} />
    //       </div>
    //     );
    //   },
    // },

    {
      dataIndex: "id",
      className: "table-action-icon",
      key: "id",
      render: (appointmentId: number) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() => {
              return Router.push(
                `/physician/appointments/canceled/${appointmentId}`
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
export default CancelledAppointmentTable;
