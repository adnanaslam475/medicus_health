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
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  GetAppointmentInput,
  useGetPatientsQuery,
  useGetPhysiciansQuery,
  usePhysicianAppointmentsHistoryQuery,
  User,
} from "generated/graphql";
import { date } from "common/utils";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import { StatusName } from "common/types/types";

type AdminData = {
  patientList: User[];
  physicianList: User[];
};

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
      return <div>{`${serviceType?.name}`}</div>;
    },
  },
  {
    title: "Booking date",
    dataIndex: "createdAt",
    render: (bookingDate: string) => {
      return <div>{date.formatMMMMDDYYYY(bookingDate)}</div>;
    },
  },
  {
    title: "Due Date",
    dataIndex: "appointmentDateTime",
    render: (appointmentDateTime: AppointmentDateTimeResponse) => {
      let formatedDueDate = `${appointmentDateTime?.startTime?.split(" ")[0]}`;
      return (
        <div>
          {appointmentDateTime?.startTime
            ? `${date?.formatMMMMDDYYYY(formatedDueDate)} `
            : "--"}
        </div>
      );
    },
  },
  {
    title: "Appointment Time",
    dataIndex: "appointmentDateTime",
    key: "appointmentDateTime",
    sorter: {
      compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      multiple: 3,
    },
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
            ? `${formatedStartTime} - ${formatedEndTime} `
            : "--"}
        </div>
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
      let _status = null;
      if (value?.status === "succeeded") {
        _status = "paid";
      } else if (value?.status === "Refunded") {
        _status = value?.status;
      } else {
        _status = "Unpaid";
      }
      return (
        <div className="text-primary">
          <StatusChip type={_status.toUpperCase() as StatusName} />
        </div>
      );
    },
  },
  {
    title: "Total Amount",
    dataIndex: "charges",
    key: "charges",
    render: (charges: AppointmentServiceType) => <div>{`$${charges}`}</div>,
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
  const [{ data, fetching }, executeUsePhysicianAppointmentsQuery] =
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

  const [{ data: physicianList }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
    },
  });
  const { getPhysicians } = physicianList || {};

  const [{ data: patientList }] = useGetPatientsQuery({
    variables: {
      filter: {},
    },
  });

  const { getPatients } = patientList || {};

  let adminData = {
    physicianList: getPhysicians,
    patientList: getPatients,
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
                <Select
                  defaultValue="List view"
                  className="w-full sm:w-40"
                  onChange={(value) =>
                    value === "Calendar view" &&
                    Router.push("/admin/appointments/calendar")
                  }
                >
                  <Select.Option value="Calendar view">
                    <Link href="/admin/appointments/calendar">
                      <a>Calendar view</a>
                    </Link>
                  </Select.Option>
                  <Select.Option selected value="List view">
                    List view
                  </Select.Option>
                </Select>
              </div>
              <Button type="primary" className="text-sm" onClick={showModal}>
                <span className="text-xs sm:text-base">
                  Request an appointment
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
                loading={fetching}
                scroll={{x:true}}
              />
            </div>
          </div>
        </div>
      </AppLayout>
      <BookAppointmentJourney
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        adminData={adminData as AdminData}
        // doctorData={doctorData}
        // doctorData={doctorProfile as DoctorProfile}
      />
    </>
  );
}
export default AdminAppointmentsListing;
