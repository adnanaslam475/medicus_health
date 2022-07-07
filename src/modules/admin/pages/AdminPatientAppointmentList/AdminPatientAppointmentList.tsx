import React, { useState } from "react";
import { Button, notification, Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
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
import { useRouter } from "next/router";
import { date } from "common/utils";
import AdminPatientAppointmentSearchFilters from "./AdminPatientAppointmentSearchFilters";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";

type StatusName =
  | "UPCOMING"
  | "COMPLETED"
  | "PENDING"
  | "SUCCEEDED"
  | "CONFIRMED"
  | "REQUESTED"
  | "SUGGESTED"
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
    key: "doctor",
    render: (doctor: User) => {
      return <div>{`${doctor?.first_name} ${doctor?.last_name}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Service",
    dataIndex: "serviceType",
    key: "serviceType",
    render: (serviceType: AppointmentServiceType) => {
      return <div>{serviceType?.name}</div>;
    },
    sorter: true,
  },
  {
    title: "Time Slot",
    dataIndex: "appointmentDateTime",
    key: "appointmentDateTime",
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      return (
        <div>
          {appointmentDateTime?.startTime && appointmentDateTime?.endTime
            ? `${date?.formathhmma(
                appointmentDateTime?.startTime
              )} - ${date?.formathhmma(appointmentDateTime.endTime)}`
            : "--"}
        </div>
      );
    },
    sorter: true,
  },
  {
    title: "Date",
    dataIndex: "appointmentDateTime",
    key: "appointmentDateTime",
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      return (
        <div className="someclass">
          {appointmentDateTime?.startTime
            ? `${date?.formatMMMMDDYYYY(appointmentDateTime?.startTime)} `
            : "--"}
        </div>
      );
    },
    sorter: true,
  },
  {
    title: "Total Amount",
    dataIndex: "charges",
    key: "charges",
    render: (value: User) => {
      return <div>${value}</div>;
    },
    sorter: true,
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

  const [{ data }, executeUseAdminPhysicianAppointmentQuery] =
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
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: `user.${sorter.field}` || "",
    });
  };

  // const onPayPhysician = async (appointmentId: number) => {
  //   try {
  //     appointmentId;
  //     const res = await PhysicianPaymentByAdmin({
  //       paymeninput: {
  //         appointmentId: appointmentId,
  //       },
  //     });

  //     if (res?.data) {
  //       res?.data &&
  //         notification.success({
  //           message: "Payment Successfull",
  //         });
  //     }

  //     if (res?.error) {
  //       notification.error({
  //         message:
  //           res?.error?.graphQLErrors[0]?.message || "Something went wrong",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  function onChangeFilters(filterValue: GetAppointmentInput) {
    setFilterValues(filterValue);
    setPagination({ ...pagination, page: 1 });
    setSorting({ column: "", order: "" });
    executeUseAdminPhysicianAppointmentQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  return (
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
          <div>
            <Table
              columns={columns}
              dataSource={appointments?.items}
              onChange={onChange}
              pagination={{
                total: appointments?.meta?.totalItems,
                // pageSize: appointments?.meta?.itemCount,
                current: appointments?.meta?.currentPage,
                defaultPageSize: 10,
                onChange: onPaginationChange,
                pageSizeOptions: ["10", "20", "30", "40"],
                showSizeChanger: true,
              }}
            />
          </div>
        </div>
      </CardWithProfileImageInfo>
    </div>
  );
}
export default AdminPatientAppointmentList;
