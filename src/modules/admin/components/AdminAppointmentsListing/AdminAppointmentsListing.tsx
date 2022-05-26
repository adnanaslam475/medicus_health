import React, { useState } from "react";
import { Button, Table, Tag, Modal } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Router from "next/router";
import AppLayout from "common/components/AppLayout/AppLayout";
import AimChip from "common/components/StatusChip/StatusChip";
import AdminAppointmentsFilter from "../AdminAppointmentsFilter/AdminAppointmentsFilter";
import {
  Appointment,
  AppointmentServiceType,
  GetAppointmentInput,
  usePhysicianAppointmentsHistoryQuery,
  User,
} from "generated/graphql";
import { date } from "common/utils";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";

const appointmentColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "",
    sorter: {
      compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
      multiple: 3,
    },
  },
  {
    title: "Patient Name",
    dataIndex: "patient",
    key: "patient",
    render: (value: User) => {
      return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
    },
    sorter: {
      compare: (a: any, b: any) => a.first_name - b.first_name,
      multiple: 3,
    },
  },
  {
    title: "Physician",
    dataIndex: "doctor",
    key: "doctor",
    render: (value: User) => {
      return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
    },
    sorter: {
      compare: (a: any, b: any) => a.first_name - b.first_name,
      multiple: 3,
    },
  },
  {
    title: "Type",
    dataIndex: "serviceType",
    key: "serviceType",
    render: (serviceType: AppointmentServiceType) => {
      return <div>{`${serviceType.name}`}</div>;
    },
  },
  {
    title: "Booking Date",
    dataIndex: "createdAt",
    render: (bookingDate: string) => {
      return <div>{date.formatMMMMDDYYYY(bookingDate)}</div>;
    },
  },
  {
    title: "Confirmation Date",
    dataIndex: "requestedDate",
    render: (bookingDate: string) => {
      return <div>{date.formatMMMMDDYYYY(bookingDate)}</div>;
    },
  },
  {
    title: "Scheduled Date",
    dataIndex: "createdAt",
    render: (bookingDate: string) => {
      return <div>{date.formatMMMMDDYYYY(bookingDate)}</div>;
    },
  },
  {
    title: "Schedule Time",
    dataIndex: "appointmentTimeSlots",
    key: "appointmentTimeSlots",
    sorter: {
      compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      multiple: 3,
    },
    render: (value: Appointment) => {
      let time = value?.appointmentTimeSlots?.find((time) => time.selected);
      return (
        <div>{`${date?.formatMMMMDDYYYY(
          time?.startTime
        )} - ${date?.formatMMMMDDYYYY(time?.endTime)} `}</div>
      );
    },
  },
  {
    title: "Appointment Status",
    dataIndex: "status",
    key: "status",
    className: "table-action-icon",
    render: (value: any) => {
      return (
        <div className="text-primary">
          <AimChip type={value?.toUpperCase()} />
        </div>
      );
    },
  },
  {
    title: "Payment Status",
    dataIndex: "transaction",
    key: "transaction",
    className: "table-action-icon",
    render: (value: any) => {
      return (
        <div className="text-primary">
          <AimChip type={value?.status.toUpperCase()} />
        </div>
      );
    },
  },
  {
    title: "Total Amount",
    dataIndex: "charges",
    key: "charges",
    render: (charges: AppointmentServiceType) => <div>{`$ ${charges}`}</div>,
  },
  {
    title: "",
    dataIndex: "id",
    key: "view",
    className: "table-action-icon",
    render: (appointmentId: any) => {
      return (
        <div className="text-primary">
          <EyeFilled
            onClick={() => Router.push(`/admin/appointments/${appointmentId}`)}
          />
        </div>
      );
    },
  },
];

type Props = {};

function AdminAppointmentsListing({}: Props) {
  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );
  const [{ data }, executeUsePhysicianAppointmentsQuery] =
    usePhysicianAppointmentsHistoryQuery({
      variables: {
        filter: { ...filterValues },
      },
    });

  const { appointments } = data || {};
  const onChangeFilters = (values: GetAppointmentInput) => {
    setFilterValues(values);
    executeUsePhysicianAppointmentsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  };
  function onChange() {}

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const { doctorData, loading } = props || {};

  return (
    <>
      <AppLayout>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h2 className="mb-0 pb-0">Appointments</h2>
            <Link passHref href={`/admin/physicians/addPhysician`}>
              <a>
                <Button onClick={showModal} type="primary">
                  Request an Appointment
                </Button>
              </a>
            </Link>
          </div>
          <AdminAppointmentsFilter
            filterValues={filterValues}
            onChange={onChangeFilters}
          />
          <div className="w-full">
            <div className="">
              <Table
                columns={appointmentColumns}
                dataSource={appointments}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </AppLayout>
      <BookAppointmentJourney
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        // doctorData={doctorData}
      />
    </>
  );
}
export default AdminAppointmentsListing;
