import React from "react";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { date } from "../../utils";
import { AppointmentServiceType } from "generated/graphql";
import Router from "next/router";

type Props = {
  data?: any;
};

function PatientAppointmentHistoryTable(props: Props) {
  const { data } = props || {};


  const historyColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      render: (value: any) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },
    },
    {
      title: "Type",
      dataIndex: "serviceType",
      key: "type",
      render: (value: AppointmentServiceType) => {
        return <div>{`${value ? value?.name : "--"}`}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "requestedDate",
      key: "requestedDate",

      render: (value: string) => {
        return <div>{`${value ? date?.formatMMMMDDYYYY(value) : "--"}`}</div>;
      },
    },
    {
      title: "Time",
      dataIndex: "requestedDate",
      key: "requestedDate",

      render: (value: string) => {
        return <div>{`${value ? date?.formathhmma(value) : "--"}`}</div>;
      },
    },

    {
      title: "",
      dataIndex: "",
      key: "view",
      className: "table-action-icon",
      render: (data: any) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() =>
              Router.push(`/physician/appointments/history/${data?.id}`)
            }
          />
        </div>
      ),
    },
  ];

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <Table
      columns={historyColumns}
      dataSource={data}
      onChange={onChange}
      scroll={{ x: true }}
    />
  );
}

export default PatientAppointmentHistoryTable;
