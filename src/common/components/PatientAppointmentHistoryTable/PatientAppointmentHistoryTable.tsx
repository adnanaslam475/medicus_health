import React from "react";
import Router from "next/router";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { date } from "../../utils";
import { AppointmentServiceType } from "generated/graphql";
import { tableFooter } from "utils/helper";
import {getCurrentUserTimeZone} from "common/utils/date"
type Props = {
  data?: any;
  meta?: any;
  pagination?: any;
  onPaginationChange: any;
  onChange: () => void;
  loading?: boolean;
};

const historyColumns = [
  {
    title: "ID #",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Physician name",
    dataIndex: "doctor",
    key: "doctor",
    sorter: true,
    render: (value: any) => {
      return <div>{`Dr. ${value?.first_name} ${value?.last_name}`}</div>;
    },
  },
  {
    title: "Appointment type",
    dataIndex: "serviceType",
    sorter: false,
    key: "type",
    render: (value: AppointmentServiceType) => {
      return <div>{`${value ? value?.name : "--"}`}</div>;
    },
  },
  {
    title: "Appointment date",
    dataIndex: "appointmentDateTime",
    key: "appointmentDateTime",
    sorter: false,
    render: (value: any) => {
      let timeZone = getCurrentUserTimeZone()

      return <div>{`${value ? date?.formatDAYMMDDYY(value.startTime,timeZone) : "--"}`}</div>;
    },
  },
  { 
    title: "Appointment time",
    dataIndex: "appointmentDateTime",
    key: "appointmentDateTime",
    sorter: false,
    render: (value: any) => {
      let timeZone = getCurrentUserTimeZone()
      
      return <div>{`${date.formathhmma(
        value?.startTime,
        timeZone
      )} - ${date.formathhmma(
        value?.endTime,
        timeZone)}`}</div>;
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
  const { data, meta, pagination, onPaginationChange, onChange, loading } =
    props || {};

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

  let defaultPageSize =
    localStorage.getItem("physicianPatientAppointmentperPageLimit") || 10;
  return (
    <Table
      columns={historyColumns}
      dataSource={data}
      onChange={onChange}
      footer={(currentPageCount)=>tableFooter(currentPageCount?.length,meta?.totalItems)}
      scroll={{ x: true }}
      pagination={{
        total: meta?.totalPages * pagination.limit,
        current: meta?.currentPage,
        defaultPageSize: Number(defaultPageSize),
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
      loading={loading}
    />
  );
}

export default PatientAppointmentHistoryTable;
