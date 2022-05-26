import React, { useState } from "react";
import { Button, Table, Tag, Modal, Select } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Router from "next/router";
import AppLayout from "common/components/AppLayout/AppLayout";
import StatusChip from "common/components/StatusChip/StatusChip";
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
          <StatusChip type={value?.toUpperCase()} />
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
          <StatusChip type={value?.status.toUpperCase()} />
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
          <div className="flex-none sm:flex items-center justify-between mb-5">
            <div className="pr-3 mb-3 sm:mb-0">
              <h2 className="mb-0 pb-0">Appointments</h2>
            </div>
            <div className="flex gap-3">
              <div className="lg:ml-3 mt-0 sm:mt-0">
                <Select defaultValue="List View" className="w-full sm:w-40">
                  <Select.Option value="Calendar View">
                    <Link href="/admin/appointments/calendar">
                      <a>Calendar View</a>
                    </Link>
                  </Select.Option>
                  <Select.Option selected value="List View">
                    List View
                  </Select.Option>
                </Select>
              </div>
              <Button type="primary" className="text-sm">
                <span className="text-xs sm:text-base">
                  Request an Appointment
                </span>
              </Button>
            </div>
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
