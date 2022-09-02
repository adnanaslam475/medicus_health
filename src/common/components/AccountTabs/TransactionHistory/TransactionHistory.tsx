import React, { Dispatch, SetStateAction, useState } from "react";
import { EyeFilled } from "@ant-design/icons";
import { Table, Input, Button, Space, Tag } from "antd";
import { date } from "../../../utils";
import {
  Appointment,
  GetAppointmentInput,
  Transaction,
} from "../../../../generated/graphql";
import StatusChip from "common/components/StatusChip/StatusChip";
import { StatusName } from "common/types/types";

const transactionsColumns = [
  {
    title: "ID#",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },

  {
    title: "Physician name",
    dataIndex: "appointment",
    key: "first_name",
    sorter: true,
    render: (value: Appointment) => {
      return (
        <div className="someclass">{`${value?.doctor?.first_name} ${value?.doctor?.last_name}`}</div>
      );
    },
  },
  {
    title: "Appointment type", //change name to appointment type from appointment type
    dataIndex: "appointment",
    key: "name",
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Appointment time",
    dataIndex: "appointment",
    key: "startTime",
    sorter: true,
    // sorter: {
    //   compare: (a: any, b: any) => a.timeslot - b.timeslot,
    //   multiple: 3,
    // },
    render: (value: Appointment) => {
      let time = value?.appointmentTimeSlots?.find((time) => time.selected);
      return (
        <div className="someclass">{`${date?.formathhmma(
          time?.startTime
        )} - ${date?.formathhmma(time?.endTime)}`}</div>
      );
    },
  },
  {
    title: "Appointment date",
    dataIndex: "appointment",
    key: "startTime",
    sorter: true,
    render: (value: Appointment) => {
      let time = value?.appointmentTimeSlots?.find((time) => time.selected);
      return (
        <div className="someclass">{`${date?.formatMMMMDDYYYY(
          time?.startTime
        )} `}</div>
      );
    },
  },

  {
    title: "Total amount",
    dataIndex: "amountReceived",
    key: "amountReceived",
    sorter: true,
    render: (value: number) => {
      return <div className="someclass">{`$${value}`}</div>;
    },
  },
  {
    title: "Transaction date",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (value: string) => {
      return (
        <div className="someclass">{`${
          value ? date?.formatDAYMMDDYY(value) : "--"
        }`}</div>
      );
    },
  },
  {
    title: "Payment status",
    dataIndex: "status",
    key: "status",
    sorter: true,
    render: (value: string) => {
      if (value === "succeeded") value = "Paid";
      return (
        <div className="someclass">
          <StatusChip type={value.toUpperCase() as StatusName} />
        </div>
      );
    },
  },
];

type Props = {
  data: Transaction[] | undefined;
  setSorting?: Dispatch<SetStateAction<any>> | undefined;
  meta: any;

};

const TransactionHistory = (props: Props) => {
  const { data, setSorting,meta } = props || {};

  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );

  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  // const onChange = (...params: any) => {
  //   const [, , sorter] = params;
  //   setSorting({
  //     order: sorter.order?.replace("end", "") || "",
  //     column: `user.${sorter.field}` || "",
  //   });
  // };

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting &&
      setSorting({
        order: sorter.order?.replace("end", "") || "",
        column: sorter.order
          ? `${
              (sorter.field === "transaction" && "transaction") ||
              (/(status|charges|requestedDate|createdAt|id)/.test(
                sorter.columnKey
              ) &&
                "appointment") ||
              (sorter.columnKey === "name" && "appointment_service_type") ||
              (sorter.columnKey === "startTime" && "appointment_time_slots") ||
              (sorter.columnKey === "amountReceived" && "transaction") ||
              "user"
            }.${sorter.columnKey || sorter.field}`
          : "",
      });
  };
   const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

    const footer = () => {
			return <div></div>;
		  };

  return (
    <Table
      columns={transactionsColumns}
      dataSource={data}
      onChange={onChange}
      scroll={{ x: true }}
      footer={footer}
      // pagination={{
      //   total: pagination.limit * meta?.totalPages,
      //   current: meta?.currentPage,
      //   defaultPageSize: 10,
      //   onChange: onPaginationChange,
      //   pageSizeOptions: ["10", "20", "30", "40"],
      //   showSizeChanger: true,
      // }}
    />
  );
};

export default TransactionHistory;
