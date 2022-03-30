import { Button } from "antd";
import React from "react";
import AppointmentCard from "../../../../../common/components/AppointmentCard";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";

function CancelledAppointment() {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2 className="mb-4">Cancelled Appointments</h2>
          <Button type="primary" size="large">
            Request an Appointment
          </Button>
        </div>
        <h5 className="text-gray">
          Suspendisse ac nulla non ante viverra feugiat. Duis ullamcorperequesty
          tortor a fringilla tempus.
        </h5>

        <div className="w-5/6">
          <SearchFilters />
        </div>

        <div className="w-full">
          <div className="appointment-cards flex flex-wrap">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="confirmed" />
          </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
