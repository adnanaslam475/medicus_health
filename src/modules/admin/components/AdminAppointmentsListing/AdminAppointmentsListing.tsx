import React, { useState } from "react";
import { Button, Table, Select } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Router from "next/router";
import AppLayout from "common/components/AppLayout/AppLayout";
import StatusChip from "common/components/StatusChip/StatusChip";
import AdminAppointmentsFilter from "../AdminAppointmentsFilter/AdminAppointmentsFilter";
import {
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

const appointmentColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Patient Name",
    dataIndex: "patient",
    key: "first_name",
    render: (value: User) => {
      return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Physician",
    dataIndex: "doctor",
    key: "first_name",
    render: (value: User) => {
      return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Type",
    dataIndex: "serviceType",
    key: "name",
    sorter: true,
    render: (serviceType: AppointmentServiceType) => {
      return <div>{`${serviceType?.name}`}</div>;
    },
  },
  {
    title: "Booking date",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (bookingDate: string) => {
      return <div>{date.formatMMMMDDYYYY(bookingDate)}</div>;
    },
  },
  {
    title: "Due Date",
    dataIndex: "appointmentDateTime",
    key: "startTime",
    sorter: true,
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
    key: "requestedDate",
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
    sorter: true,
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
    key: "status",
    className: "table-action-icon",
    sorter: true,
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
    sorter: true,
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

type AdminData = {
  patientList: User[];
  physicianList: User[];
};

type Props = {};

function AdminAppointmentsListing({}: Props) {
  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { ...filterValues },
      pagination,
      sorting,
    },
  });

  const { appointments } = data || {};
  const { items: appointmentItems, meta } = appointments || {};

  const onChangeFilters = (values: GetAppointmentInput) => {
    setSorting({ column: "", order: "" });
    setPagination({ ...pagination, page: 1 });
    setFilterValues(values);
  };

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const [{ data: physicianList }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
      pagination: { limit: -1, page: 1 },
    },
  });

  const { getPhysicians } = physicianList || {};

  const [{ data: patientList }] = useGetPatientsQuery({
    variables: {
      filter: {},
      pagination: { limit: -1, page: 1 },
    },
  });

  const { getPatients } = patientList || {};
  let adminData = {
    physicianList: getPhysicians?.items,
    patientList: getPatients?.items,
  };

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => setIsModalVisible(false);

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order:
        (["transaction", "status"].includes(sorter.field) &&
          ((sorter.order === "descend" && "asc") ||
            (sorter.order === "ascend" && "desc"))) ||
        sorter.order?.replace("end", "") ||
        "",
      column:
        `${
          (["transaction"].includes(sorter.field) && "transaction") ||
          (sorter.columnKey === "name" && "appointment_service_type") ||
          (/startTime/.test(sorter.columnKey) && "appointment_time_slots") ||
          (/(status|charges|requestedDate|createdAt|id)/.test(
            sorter.columnKey
          ) &&
            "appointment") ||
          (/doctor/.test(sorter.field) && "user") ||
          "patient"
        }.${sorter.columnKey}` || "",
    });
  };

  console.log("sorintg", sorting);

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
                dataSource={appointmentItems}
                onChange={onChange}
                loading={fetching}
                pagination={{
                  current: meta?.currentPage,
                  defaultPageSize: 10,
                  onChange: onPaginationChange,
                  pageSizeOptions: ["10", "20", "30", "40"],
                  showSizeChanger: true,
                }}
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
