// import { Card,Button } from "antd";
import React from "react";
import AppLayout from "../../../../../common/components/Layout";
// import { VideoCameraOutlined } from '@ant-design/icons';
import AppointmentCard from "../../../../../common/components/AppointmentCard";
import SearchFilters from "../../../../../common/components/SearchFilters";
import { Button } from "antd";

function UpcomingAppointments() {
  return (
    <AppLayout>
      <div className="w-full py-5">
        <div className="flex items-center justify-between">
          <h2 className="mb-3">Upcoming Appointments</h2>
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
export default UpcomingAppointments;
