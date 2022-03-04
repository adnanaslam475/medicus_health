import React from "react";
import AppLayout from "../../../../../common/components/Layout";
import { Button } from "antd";
import SearchFilters from "../../../../../common/components/SearchFilters";
import AppointmentCard from "../../../../../common/components/AppointmentCard";

function RequestedAppointment() {
    return (
        <AppLayout>
            <div className="w-full py-5">
        <div className="flex items-center justify-between">
          <h2 className="mb-3">Requested Appointments</h2>
          <Button type="primary" size="large">
          Request an Appointment
          </Button>
        </div>
        <h5 className="text-gray">
          Suspendisse ac nulla non ante viverra feugiat. Duis ullamcorperequesty
          tortor a fringilla tempus.
        </h5>

        <div className="w-5/6" >
        <SearchFilters/>
        </div>
        
        
        <div className="w-full">

          <div className="appointmentCards flex flex-wrap">
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />

          </div>
        </div>
      </div>
        </AppLayout>
    );
}
export default RequestedAppointment;
