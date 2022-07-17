import React from "react";
import Router from "next/router";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { date } from "../../utils";
import { AppointmentServiceType } from "generated/graphql";

type Props = {
  data?: any;
  meta?: any;
  pagination?: any;
  onPaginationChange: any;
  onChange: () => void;
};

const historyColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Doctor",
    dataIndex: "doctor",
    key: "doctor",
    sorter: true,
    render: (value: any) => {
      return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
    },
  },
  {
    title: "Service type",
    dataIndex: "serviceType",
    sorter: true,
    key: "type",
    render: (value: AppointmentServiceType) => {
      return <div>{`${value ? value?.name : "--"}`}</div>;
    },
  },
  {
    title: "Date",
    dataIndex: "requestedDate",
    key: "requestedDate",
    sorter: true,
    render: (value: string) => {
      return <div>{`${value ? date?.formatMMMMDDYYYY(value) : "--"}`}</div>;
    },
  },
  {
    title: "Time",
    dataIndex: "requestedDate",
    key: "requestedDate",
    sorter: true,
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

function PatientAppointmentHistoryTable(props: Props) {
  const { data, meta, pagination, onPaginationChange, onChange } = props || {};

  // const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
  //   {}
  // );
  // const [{ data, fetching }, executeUsePhysicianAppointmentsQuery] =
  //   usePhysicianAppointmentsHistoryQuery({
  //     variables: {
  //       filter: { ...filterValues },
  //     },
  //   });

  // const { appointments } = data || {};
  // const onChangeFilters = (values: GetAppointmentInput) => {
  //   setFilterValues(values);
  // setPagination({ ...pagination, page:1 });
  //   executeUsePhysicianAppointmentsQuery({
  //     filter: filterValues,
  //     requestPolicy: "network-only",
  //   });
  // };
  // const { data } = props || {};

  return (
    <Table
      columns={historyColumns}
      dataSource={data}
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

export default PatientAppointmentHistoryTable;
