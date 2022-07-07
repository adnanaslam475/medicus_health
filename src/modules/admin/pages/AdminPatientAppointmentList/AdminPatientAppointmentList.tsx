import React, { useState } from "react";
import { Button, notification, Skeleton, Spin, Table } from "antd";
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
<<<<<<< HEAD
  const patientFirstName =
    appointments?.items && appointments.items[0]?.patient?.first_name;
  const patientLastName =
    appointments?.items && appointments.items[0]?.patient?.last_name;
  const patientEmail =
    appointments?.items && appointments.items[0]?.patient?.email;
  const patientProfilePicture =
    appointments &&
    appointments?.items[0]?.patient?.patientProfile?.profileImage;
=======
  const patientFirstName = appointments && appointments[0]?.patient?.first_name;
  const patientLastName = appointments && appointments[0]?.patient?.last_name;
  const patientEmail = appointments && appointments[0]?.patient?.email;
  const patientProfilePicture =
    appointments && appointments[0]?.patient?.patientProfile?.profileImage;
>>>>>>> 740466185523c2e92632e96b041b6efa743f279e

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

<<<<<<< HEAD
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
=======
  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 3,
      },
    },
    {
      title: "Physician Name",
      dataIndex: "doctor",
      key: "doctor",
      render: (doctor: User) => {
        return <div>{`${doctor?.first_name} ${doctor?.last_name}`}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.first_name - b.first_name,
        multiple: 3,
      },
    },
    {
      title: "Service",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (serviceType: AppointmentServiceType) => {
        return <div>{serviceType?.name}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
    },
    {
      title: "Time Slot",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
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
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
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
              ? `${date?.formatMMMMDDYYYY(formatedDueDate)} `
              : "--"}
          </div>
        );
      },
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
    },
    {
      title: "Total Amount",
      dataIndex: "charges",
      key: "charges",
      render: (value: User) => {
        return <div>${value}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.charges - b.charges,
        multiple: 3,
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: StatusName | string) => {
        return <StatusChip type={status.toUpperCase() as StatusName} />;
      },
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
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
>>>>>>> 740466185523c2e92632e96b041b6efa743f279e

  function onChangeFilters(filterValue: GetAppointmentInput) {
    setFilterValues(filterValue);
    setPagination({ ...pagination, page: 1 });
    setSorting({ column: "", order: "" });
    executeUseAdminPhysicianAppointmentQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

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
          <div>
<<<<<<< HEAD
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
=======
            <Table columns={columns} dataSource={appointments} scroll={{x:true}} />
>>>>>>> 740466185523c2e92632e96b041b6efa743f279e
          </div>
        </div>
      </CardWithProfileImageInfo>
    </div>
  );
}
export default AdminPatientAppointmentList;
