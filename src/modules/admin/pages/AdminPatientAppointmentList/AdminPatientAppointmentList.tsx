import React, { useState } from "react";
import { Button, notification, Skeleton, Spin, Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import Router from "next/router";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  AppointmentTimeSlots,
  GetAppointmentInput,
  useAdminPhysicianAppointmentQuery,
  usePhysicianPaymentByAdminMutation,
  User,
} from "generated/graphql";
import StatusChip from "common/components/StatusChip/StatusChip";
import AdminPatientAppointmentSearchFilters from "./AdminPatientAppointmentSearchFilters";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { date } from "common/utils";

type StatusName =
  | "UPCOMING"
  | "COMPLETED"
  | "PENDING"
  | "SUCCEEDED"
  | "CONFIRMED"
  | "REQUESTED"
  | "PROPOSED"
  | "CANCELLED";

const columns = [
  {
    title: "Appointment ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Physician Name",
    dataIndex: "doctor",
    key: "first_name",
    sorter: true,
    render: (doctor: User) => {
      return <div>{`${doctor?.first_name} ${doctor?.last_name}`}</div>;
    },
  },
  {
    title: "Service",
    dataIndex: "serviceType",
    key: "name",
    sorter: true,
    render: (serviceType: AppointmentServiceType) => {
      return <div>{serviceType?.name}</div>;
    },
  },
  {
    title: "Time Slot",
    dataIndex: "appointmentDateTime",
    key: "appointment_time_slots",
    sorter: true,
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
    title: "Date",
    dataIndex: "appointmentDateTime",
    key: "appointmentDateTime",
    sorter: true,
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      let formatedDueDate = `${appointmentDateTime?.startTime?.split(" ")[0]}`;
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
    title: "Total Amount",
    dataIndex: "charges",
    key: "charges",
    sorter: true,
    render: (value: User) => {
      return <div>${value}</div>;
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

  const [{ data, fetching }, executeUseAdminPhysicianAppointmentQuery] =
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

  const { appointments } = data || {};
  const patientFirstName =
    appointments?.items && appointments.items[0]?.patient?.first_name;
  const patientLastName =
    appointments?.items && appointments.items[0]?.patient?.last_name;
  const patientEmail =
    appointments?.items && appointments.items[0]?.patient?.email;
  const patientProfilePicture =
    appointments &&
    appointments?.items[0]?.patient?.patientProfile?.profileImage;

  // Physician Payment By Admin Mutatio
  // const [result, PhysicianPaymentByAdmin] =
  //   usePhysicianPaymentByAdminMutation();

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    console.log("sorter", sorter);
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
    // executeUseAdminPhysicianAppointmentQuery({
    //   filter: filterValues,
    //   requestPolicy: "network-only",
    // });
  }

  console.log(appointments, "appointmentssdaddsasd");
  return fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <div className="w-full">
      <CardWithProfileImageInfo
        name={`${patientFirstName} ${patientLastName}`}
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
  );
}
export default AdminPatientAppointmentList;
