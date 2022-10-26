import React, { useState } from "react";
import { Button, Table, Select } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Router from "next/router";
import AppLayout from "common/components/AppLayout/AppLayout";
import StatusChip from "common/components/StatusChip/StatusChip";
import AdminAppointmentsFilter from "../AdminAppointmentsFilter/AdminAppointmentsFilter";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentPriceResponse,
  AppointmentServiceType,
  DateTimeSlots,
  GetAppointmentInput,
  useGetPatientsQuery,
  useGetPhysiciansQuery,
  usePhysicianAppointmentsHistoryQuery,
  User,
} from "generated/graphql";
import { date } from "common/utils";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import { StatusName } from "common/types/types";
import { isChrome, tableFooter } from "utils/helper";
import _classes from "./AdminAppointmentsListing.module.scss"

const appointmentColumns = [
  {
    title: "ID#",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Patient name",
    dataIndex: "patient",
    key: "first_name",
    render: (value: User) => {
      return (
        <div>
          {value?.first_name && value?.last_name
            ? `${value?.first_name} ${value?.last_name}`
            : "-"}
        </div>
      );
    },
    sorter: true,
  },
  {
    title: "Physician name",
    dataIndex: "doctor",
    key: "",
    render: (value: User) => {
      return (
        <div>
          {value?.first_name && value?.last_name
            ? `${value?.first_name} ${value?.last_name}`
            : "-"}
        </div>
      );
    },
    sorter: true,
  },
  {
    title: "Appointment type",
    sorter: true,
    render: (value: Appointment) => {
      const appointmentType =
        value?.appointmentTypeProposed?.type || value?.serviceType?.name || "-";
      return <div>{appointmentType}</div>;
    },
  },
  // {
  //   title: "Booking date",
  //   dataIndex: "createdAt",
  //   key: "createdAt",
  //   sorter: true,
  //   render: (bookingDate: string) => {
  //     return <div>{date.formatDAYMMDDYY(bookingDate)}</div>;
  //   },
  // },
  {
    title: "Appointment date ",
    // dataIndex: "appointmentDateTime",
    key: "requestedDate",
    sorter: true,
    render: (value: Appointment) => {
      let appointmentDateTime = value?.appointmentDateTime;
      let status = value?.status;
      let formatedDueDate = date?.formatDAYMMDDYY(
        String(appointmentDateTime?.startTime)
      );
      return (
        <div>
          {status === "Proposed" || status === "Rescheduled"
            ? (value?.appointmentTypeProposed?.dateTime.map(
              (item: DateTimeSlots) => {
                return (
                  <li>{`${date.formatDAYMMDDYY(
                    String(item?.date))}`}</li>
                );
              }
            ) as any)
            : status === "Requested" && value?.requestedDate
              ? `${date?.formatMMMMDDYYYY(value?.requestedDate)} `
              : formatedDueDate}
        </div>
      );
    },
  },
  {
    title: "Appointment time",
    dataIndex: "appointmentDateTime",
    key: "requestedDate",
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
            ? `${formatedStartTime} - ${formatedEndTime} `
            : "-"}
        </div>
      );
    },
  },
  {
    title: "Appointment status",
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
    title: "Payment status",
    dataIndex: "transaction",
    key: "transaction",
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
    title: "Total amount",
    dataIndex: "appointmentCharges",
    key: "appointmentCharges",
    sorter: true,
    render: (appointmentCharges: AppointmentPriceResponse) => (
      <div>{`$${appointmentCharges?.total}`}</div>
    ),
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
            onClick={() =>
              Router.push(`/admin/appointments/${appointmentId}?activeTab=1`)
            }
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

function AdminAppointmentsListing({ }: Props) {
  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );
  let defaultPageSize =
    localStorage.getItem("adminAppointmentListingPerPageLimit") || 10;
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: Number(defaultPageSize),
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

  const onPaginationChange = (page: number, limit: number) => {
    localStorage.setItem("adminAppointmentListingPerPageLimit", String(limit));
    setPagination({ page, limit });
  };

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
        (/(status|transaction)/.test(sorter.field) &&
          ((sorter.order === "descend" && "asc") ||
            (sorter.order === "ascend" && "desc"))) ||
        sorter.order?.replace("end", "") ||
        "",
      column:
        `${(["status"].includes(sorter.field) && "appointment") ||
        (["transaction"].includes(sorter.field) && "transaction") ||
        (sorter.columnKey === "name" && "appointment_service_type") ||
        (/startTime/.test(sorter.columnKey) && "appointment_time_slots") ||
        (/(status|charges|requestedDate|createdAt|id)/.test(
          sorter.columnKey
        ) &&
          "appointment") ||
        (/doctor/.test(sorter.field) && "user") ||
        "patient"
        }.${/(doctor|patient)/.test(sorter.field)
          ? "first_name"
          : /(transaction)/.test(sorter.field)
            ? "status"
            : sorter.columnKey
        }` || "",
    });
  };
  return (
    <>
      <AppLayout>
        <div className="w-full">
          <div className="flex-none sm:flex items-center justify-between mb-5">
            <div className="pr-3 mb-3 sm:mb-0">
              <h2 className="mb-0 pb-0">Appointments</h2>
            </div>
            <div className={"flex gap-3 flex-wrap "}>
              <Link passHref href={`/admin/appointments/calendar`}>
                <a className={`text-sm ${isChrome && 'antCustomBtn'}  ${_classes["requestAppointmentBtn"]}`}>
                  <Button className={`bg-primary ${isChrome && 'antCustomBtn'} ${_classes["requestAppointmentBtn"]}`} type="primary">
                    Calendar view
                  </Button>
                </a>
              </Link>
              <Button type="primary" className={`text-sm ${isChrome && 'antCustomBtn'}  ${_classes["requestAppointmentBtn"]}`} onClick={showModal}>
                <span className="long-btn">
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
                scroll={{ x: true }}
                loading={fetching}
                footer={(currentPageCount) =>
                  tableFooter(currentPageCount?.length, meta?.totalItems || 0)
                }
                pagination={{
                  total: pagination.limit * Number(meta?.totalPages),
                  current: meta?.currentPage,
                  defaultPageSize: Number(defaultPageSize),
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
