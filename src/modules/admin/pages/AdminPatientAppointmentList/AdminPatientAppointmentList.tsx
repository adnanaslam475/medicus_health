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

function AdminPatientAppointmentList() {
  const { query } = useRouter();
  const [filterValues, setFilterValues] = useState<GetAppointmentInput>({});

  const [{ data, fetching }, executeUseAdminPhysicianAppointmentQuery] =
    useAdminPhysicianAppointmentQuery({
      variables: {
        filter: {
          ...filterValues,
          patientId: Number(query.id),
        },
      },
    });
  const { appointments } = data || {};
  const patientFirstName = appointments && appointments[0]?.patient?.first_name;
  const patientLastName = appointments && appointments[0]?.patient?.last_name;
  const patientEmail = appointments && appointments[0]?.patient?.email;
  const patientProfilePicture =
    appointments && appointments[0]?.patient?.patientProfile?.profileImage;

  // Physician Payment By Admin Mutatio
  const [result, PhysicianPaymentByAdmin] =
    usePhysicianPaymentByAdminMutation();

  const onPayPhysician = async (appointmentId: number) => {
    try {
      appointmentId;
      const res = await PhysicianPaymentByAdmin({
        paymeninput: {
          appointmentId: appointmentId,
        },
      });

      if (res?.data) {
        res?.data &&
          notification.success({
            message: "Payment Successfull",
          });
      }

      if (res?.error) {
        notification.error({
          message:
            res?.error?.graphQLErrors[0]?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  function onChangeFilters(filterValue: GetAppointmentInput) {
    setFilterValues(filterValue);
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
            <Table columns={columns} dataSource={appointments} />
          </div>
        </div>
      </CardWithProfileImageInfo>
    </div>
  );
}
export default AdminPatientAppointmentList;
