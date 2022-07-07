import React from "react";
import Router from "next/router";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
// import {
//   AppointmentServiceType,
//   AppointmentTimeSlots,
//   Transaction,
//   User,
//   usePhysicianAppointmentsHistoryQuery,
//   GetAppointmentInput,
// } from "generated/graphql";
// import { date } from "../../utils";

type Props = {
  data?: any;
  meta?: any;
  onPaginationChange: () => void;
  onChange: () => void;
};

function PatientAppointmentHistoryTable(props: Props) {
  const { data, meta, onPaginationChange, onChange } = props || {};

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
      title: "Type",
      dataIndex: "serviceType",
      sorter: true,
      key: "type",
      render: (value: any) => {
        return <div>{`${value?.service_name}`}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      sorter: true,
      render: (value: any) => {
        return <div>{`${value?.requestedDate}`}</div>;
      },
    },
    {
      title: "Time",
      dataIndex: "requestedDate",
      key: "requestedDate",
      sorter: true,
      render: (value: any) => {
        return <div>{`${value?.requestedDate}`}</div>;
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

  return (
    <Table
      columns={historyColumns}
      dataSource={data}
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
    />
  );
}

export default PatientAppointmentHistoryTable;
