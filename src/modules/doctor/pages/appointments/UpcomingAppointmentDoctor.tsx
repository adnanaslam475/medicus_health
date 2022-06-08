import React, { useState } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Button } from "antd";
import Link from "next/link";
import UpcomingAppointmentFilter from "./UpcomingAppointmentFilter";
import { Appointment, usePhysicianAppointmentsQuery } from "generated/graphql";
import UpcomingAppointmentTableDoctor from "modules/doctor/components/UpcomingAppointmentTableDoctor/UpcomingAppointmentTableDoctor";
import { physicianFilterType } from "common/types/types";

function UpcomingAppointmentDoctor() {
  const [filterValues, setFilterValues] = useState<physicianFilterType>({});
  const [{ data: physicialData ,fetching}, executeUsePhysicianAppointmentsQuery] =
    usePhysicianAppointmentsQuery({
      variables: {
        filter: {
          ...filterValues,
          status: "Confirmed",
        },
      },
    });
  const { physicianAppointments } = physicialData || {};

  function onChangeFilters(values: physicianFilterType) {
    setFilterValues(values);
    executeUsePhysicianAppointmentsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Upcoming Appointments</h2>
          <Link passHref href={`/physician/appointments/calendar`}>
            <a>
              <Button>Calendar View</Button>
            </a>
          </Link>
        </div>

        <UpcomingAppointmentFilter onChange={onChangeFilters} />
        <UpcomingAppointmentTableDoctor
          dataSource={physicianAppointments as Array<Appointment>}
          loading={fetching}
        />
      </div>
    </AppLayout>
  );
}
export default UpcomingAppointmentDoctor;
