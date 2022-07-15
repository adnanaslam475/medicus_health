import React, { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import UpcomingAppointmentTableDoctor from "modules/doctor/components/UpcomingAppointmentTableDoctor/UpcomingAppointmentTableDoctor";
import UpcomingAppointmentFilter from "./UpcomingAppointmentFilter";
import { Appointment, usePhysicianAppointmentsQuery } from "generated/graphql";
import { physicianFilterType } from "common/types/types";

function UpcomingAppointmentDoctor() {
  const [filterValues, setFilterValues] = useState<physicianFilterType>({});
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [
    { data: physicialData, fetching },
    executeUsePhysicianAppointmentsQuery,
  ] = usePhysicianAppointmentsQuery({
    variables: {
      filter: {
        ...filterValues,
        status: "Confirmed",
      },
      pagination,
      sorting,
    },
    requestPolicy: "network-only",
  });
  const { physicianAppointments } = physicialData || {};

  function onChangeFilters(values: physicianFilterType) {
    setSorting({ column: "", order: "" });
    setPagination({ ...pagination, page: 1 });
    setFilterValues(values);
    executeUsePhysicianAppointmentsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order
        ? `${
            (sorter.columnKey === "name" && "appointment_service_type") ||
            (["charges", "requestedDate"].includes(sorter.columnKey) &&
              "appointment") ||
            "user"
          }.${sorter.columnKey || sorter.field}`
        : "",
    });
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Upcoming appointments</h2>
          <Link passHref href={`/physician/appointments/calendar`}>
            <a>
              <Button>Calendar view</Button>
            </a>
          </Link>
        </div>

        <UpcomingAppointmentFilter onChange={onChangeFilters} />
        <UpcomingAppointmentTableDoctor
          dataSource={physicianAppointments?.items as Array<Appointment>}
          loading={fetching}
          pagination={pagination}
          onChange={onChange}
          meta={physicianAppointments?.meta}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </AppLayout>
  );
}
export default UpcomingAppointmentDoctor;
