import React, { useState } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import PhysicianAppointmentHistoryTable from "common/components/PhysicianAppointmentHistoryTable/PhysicianAppointmentHistoryTable";
import PhysicianHistoryFilter from "common/components/PhysicianHistoryFilter/PhysicianHistoryFilter";
import {
  Appointment,
  GetAppointmentInput,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";

function PatientAppointmentHistory() {
  const [filterValues, setFilterValues] = useState({});
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });
  const [{ data, fetching }, executeUsePhysicianAppointmentsHistoryQuery] =
    usePhysicianAppointmentsHistoryQuery({
      variables: {
        filter: { ...filterValues, status: "Completed" },
        pagination,
        sorting,
      },
    });

  const { appointments } = data || {};

  function onChangeFilters(filterValue: GetAppointmentInput) {
    setPagination({ ...pagination, page: 1 });
    setSorting({ order: "", column: "" });
    setFilterValues(filterValue);
    executeUsePhysicianAppointmentsHistoryQuery({
      variables: {
        filter: { ...filterValues, status: "Completed" },
      },
      requestPolicy: "network-only",
    });
  }

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
            (["charges", "status", "createdAt"].includes(sorter.columnKey) &&
              "appointment") ||
            (sorter.columnKey === "appointment_time_slots" &&
              "appointment_time_slots") ||
            "user"
          }.${
            (sorter.columnKey === "appointment_time_slots" && "startTime") ||
            sorter.columnKey
          }`
        : "",
    });
  };

  console.log("sroting", sorting);
  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">History</h2>
          </div>
        </div>

        {/* physician History table */}
        <PhysicianHistoryFilter onChange={onChangeFilters} />
        <div className="custom-table-ui">
          <PhysicianAppointmentHistoryTable
            data={appointments?.items as Appointment[]}
            loading={fetching}
            onChange={onChange}
            meta={appointments?.meta}
            onPaginationChange={onPaginationChange}
          />
        </div>
      </div>
    </AppLayout>
  );
}
export default PatientAppointmentHistory;
