import { Button } from "antd";
import React from "react";
import AppointmentCard from "../../../../../common/components/AppointmentCard";
import AppLayout from "../../../../../common/components/Layout";
import SearchFilters from "../../../../../common/components/SearchFilters";

function CancelledAppointment() {
  return (
    <AppLayout>
      <div className="w-full py-5">
        <div className="flex items-center justify-between">
          <h2 className="mb-3">Cancelled Appointments</h2>
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
          <div className="appointmentCards flex flex-wrap">
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
