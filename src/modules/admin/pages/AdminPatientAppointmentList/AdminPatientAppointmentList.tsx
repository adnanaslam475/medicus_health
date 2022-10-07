import React, { useState } from "react";
import { Button, notification, Skeleton, Spin, Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import Router from "next/router";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentPriceResponse,
  AppointmentServiceType,
  AppointmentTimeSlots,
  GetAppointmentInput,
  useAdminPhysicianAppointmentQuery,
  useGetUserQuery,
  usePhysicianPaymentByAdminMutation,
  User,
} from "generated/graphql";
import StatusChip from "common/components/StatusChip/StatusChip";
import AdminPatientAppointmentSearchFilters from "./AdminPatientAppointmentSearchFilters";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { date } from "common/utils";
import { tableFooter } from "utils/helper";

type StatusName =
  | "UPCOMING"
  | "COMPLETED"
  | "PENDING"
  | "SUCCEEDED"
  | "CONFIRMED"
  | "REQUESTED"
  | "PROPOSED"
  | "CANCELED";

const columns = [
  {
    title: "ID#",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Physician name",
    dataIndex: "doctor",
    key: "first_name",
    sorter: true,
    render: (doctor: User) => {
      return <div>{`${doctor?.first_name} ${doctor?.last_name}`}</div>;
    },
  },
  {
    title: "Appointment type",
    dataIndex: "serviceType",
    key: "name",
    sorter: true,
    render: (serviceType: AppointmentServiceType) => {
      return <div>{serviceType?.name}</div>;
    },
  },
  {
    title: "Appointment time",
    dataIndex: "appointmentDateTime",
    key: "appointment_time_slots",
    sorter: true,
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      let formatedStartTime = date.formathhmma(
        String(appointmentDateTime?.startTime)
      );
      let formatedEndTime = date.formathhmma(
        String(appointmentDateTime?.endTime)
      );
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
    title: "Appointment date",
    dataIndex: "appointmentDateTime",
    key: "appointmentDateTime",
    sorter: true,
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      let formatedDueDate = `${appointmentDateTime?.startTime}`;
      return (
        <div>
          {appointmentDateTime?.startTime
            ? `${date?.formatDAYMMDDYY(formatedDueDate)} `
            : "--"}
        </div>
      );
    },
  },
  {
    title: "Total amount",
    dataIndex: "appointmentCharges",
    key: "appointmentCharges",
    sorter: true,
    render: (appointmentCharges: AppointmentPriceResponse) => {
      return <div>${appointmentCharges?.total}</div>;
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: StatusName | string) => {
      return <StatusChip type={status.toUpperCase() as StatusName} />;
    },
    sorter: true,
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    className: "table-action-icon",
    render: (id: string) => (
      <div className="text-primary">
        <EyeFilled
          className="text-primary"
          onClick={() => {
            return Router.push(`/admin/patients/detail/${id}`);
          }}
        />
      </div>
    ),
  },
];

function AdminPatientAppointmentList() {
  const { query } = useRouter();
  const [filterValues, setFilterValues] = useState<GetAppointmentInput>({});
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }] =
    useAdminPhysicianAppointmentQuery({
      variables: {
        filter: {
          ...filterValues,
          patientId: Number(query.id),
        },
        pagination,
        sorting,
      },
    });


    const [{ data:userData }] = useGetUserQuery({
      variables: {
        input: Number(query.id),
      },
      pause: !query.id,
    });
  
    const { user } = userData || {};
    const {
      first_name,
      last_name,
      email,
      patientProfile,
    } = user || {};


  const { appointments } = data || {};
  const patientFirstName =
    appointments?.items?.length ? appointments.items[0]?.patient?.first_name : first_name;
  const patientLastName =
    appointments?.items?.length ? appointments.items[0]?.patient?.last_name : last_name;
  const patientEmail =
    appointments?.items?.length ? appointments.items[0]?.patient?.email: email;
  const patientProfilePicture =
    appointments?.items?.length ?
    appointments?.items[0]?.patient?.patientProfile?.profileImage : patientProfile?.profileImage;

  // Physician Payment By Admin Mutatio
  // const [result, PhysicianPaymentByAdmin] =
  //   usePhysicianPaymentByAdminMutation();

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order
        ? `${
            (sorter.columnKey === "name" && "appointment_service_type") ||
            (/(status|charges)/.test(sorter.columnKey) && "appointment") ||
            (sorter.columnKey === "appointment_time_slots" &&
              "appointment_time_slots") ||
            (/first_name/.test(sorter.columnKey) && "user")
          }.${
            (sorter.columnKey === "appointment_time_slots" && "startTime") ||
            sorter.columnKey
          }`
        : "",
    });
  };

  function onChangeFilters(filterValue: GetAppointmentInput) {
    setFilterValues(filterValue);
    setPagination({ ...pagination, page: 1 });
    setSorting({ column: "", order: "" });
  }

  return  <div className="w-full">
      <CardWithProfileImageInfo
        name={`${patientFirstName || ""} ${patientLastName || ""}`}
        serviceName={patientEmail}
        imageUrl={patientProfilePicture}
      >
        <div className="flex justify-between">
          <h2 className="pb-0">Appointments</h2>
        </div>

        <AdminPatientAppointmentSearchFilters onChange={onChangeFilters} />
        <div className="w-full">
          <Table
            columns={columns}
            dataSource={appointments?.items}
            onChange={onChange}
            loading={fetching}
            footer={(currentPageCount)=>tableFooter(currentPageCount?.length,Number(appointments?.meta?.totalItems || 0))}
            pagination={{
              total: Number(appointments?.meta?.totalPages) * pagination.limit,
              current: appointments?.meta?.currentPage,
              defaultPageSize: 10,
              onChange: onPaginationChange,
              pageSizeOptions: ["10", "20", "30", "40"],
              showSizeChanger: true,
            }}
          />
        </div>
      </CardWithProfileImageInfo>
    </div>
  
}
export default AdminPatientAppointmentList;
