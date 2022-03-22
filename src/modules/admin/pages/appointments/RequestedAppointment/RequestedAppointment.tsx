import React from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { Button } from "antd";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import AppointmentCard from "../../../../../common/components/AppointmentCard";

function RequestedAppointment() {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">Requested Appointments</h2>
            <p className="text-gray mb-0">Suspendisse ac nulla non ante viverra feugiat. Duis ullamcorperequesty tortor a fringilla tempus.</p>
          </div>
          <Button type="primary">Request an Appointment</Button>
        </div>
        <SearchFilters />
        <div className="w-full">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="confirmed" />
          </div>
        </div>
      </div>
    </AppLayout>

    );
}
export default RequestedAppointment;
