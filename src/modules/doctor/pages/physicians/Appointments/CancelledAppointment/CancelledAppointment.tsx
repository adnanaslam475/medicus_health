import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import CancelledAppointmentTable from "./CancelledAppointmentTable";
import CanncelledAppointmentFilter from "modules/doctor/pages/appointments/CancelAppointmentFilter";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "generated/graphql";
import {
  cancelAppointmentFilterType,
  physicianFilterType,
} from "common/types/types";
import { useTranslations } from "next-intl";

type CancelledAppointmentProps = {};

function CancelledAppointment({}: CancelledAppointmentProps) {
  const t = useTranslations("Common");
  const [filterValues, setFilterValues] =
    React.useState<cancelAppointmentFilterType>({});
  let defaultPageSize =
    localStorage.getItem("physicianCanceledAppointmentperPageLimit") || 10;
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: Number(defaultPageSize),
  });
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }, executeUseCancelledAppointmentsQuery] =
    useGetAllRequestedAppointmentsQuery({
      variables: {
        filter: {
          status: "Canceled",
          ...filterValues,
        },
        pagination,
        sorting,
      },
    });
  const { appointments } = data || {};

  function onChangeFilters(values: physicianFilterType) {
    setPagination({ ...pagination, page: 1 });
    setFilterValues(values);
    setSorting({ column: "", order: "" });
    executeUseCancelledAppointmentsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  const onPaginationChange = (page: number, limit: number) => {
    localStorage.setItem(
      "physicianCanceledAppointmentperPageLimit",
      String(limit)
    );
    setPagination({ page, limit });
  };

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
            (sorter.columnKey === "startTime" && "appointment_time_slots") ||
            (sorter.columnKey === "requestedDate" && "appointment") ||
            "patient"
          }.${sorter.columnKey}`
        : "",
    });
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">
              {t("canceled_appointments")}
              {/* Canceled appointments */}
            </h2>
          </div>
        </div>
        <div className="">
          <CanncelledAppointmentFilter onChange={onChangeFilters} />
        </div>
        <div className="w-full">
          {/* {appointments?.length !== 0 && appointments ? (
            <Table dataSource={appointments as Appointment[]} loading={fetching}/>
          ) : (
            <div className="flex items-center justify-center w-full">
              <Empty />
            </div>
          )} */}
          <CancelledAppointmentTable
            dataSource={appointments?.items as Appointment[]}
            loading={fetching}
            pagination={pagination}
            onChange={onChange}
            onPaginationChange={onPaginationChange}
            meta={appointments?.meta}
          />
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
