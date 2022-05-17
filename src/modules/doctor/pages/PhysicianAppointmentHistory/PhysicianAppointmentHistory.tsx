import { Button } from "antd";
import React, { useState } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Appointment, usePhysicianAppointmentsHistoryQuery } from "generated/graphql";
import PhysicianAppointmentHistoryTable from "common/components/PhysicianAppointmentHistoryTable/PhysicianAppointmentHistoryTable";
import PhysicianHistoryFilter from "common/components/PhysicianHistoryFilter/PhysicianHistoryFilter";
import { PhysicianAppointmentInputFilter } from "common/types/types";

function PatientAppointmentHistory() {
  const [filterValues, setFilterValues] = useState({});
  const [{ data }, executeUsePhysicianAppointmentsHistoryQuery] =
    usePhysicianAppointmentsHistoryQuery({
      variables: {
        filter: { ...filterValues, status: "Completed" },
      },
    });

  const { appointments } = data || {};

  function onChange(filterValue: PhysicianAppointmentInputFilter) {
    setFilterValues(filterValue);
    executeUsePhysicianAppointmentsHistoryQuery({
      variables: {
        filter: { ...filterValues, status: "Completed" },
      },
      requestPolicy: "network-only",
    });
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">History</h2>
          </div>
          <Button type="primary" size="large">
            Request an Appointment
          </Button>
        </div>

        {/* physician History table */}
        <PhysicianHistoryFilter onChange={onChange} />
        <div className="custom-table-ui">
          <PhysicianAppointmentHistoryTable data={appointments as Appointment[]} />
        </div>
      </div>
    </AppLayout>
  );
}
export default PatientAppointmentHistory;
