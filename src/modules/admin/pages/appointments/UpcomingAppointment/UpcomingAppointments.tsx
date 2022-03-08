// import { Card,Button } from "antd";
import React from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
// import { VideoCameraOutlined } from '@ant-design/icons';
import AppointmentCard from "../../../../../common/components/AppointmentCard";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
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

        <div className="w-5/6">
          <SearchFilters />
        </div>

        <div className="w-full">
          <div className="appointment-cards  flex flex-wrap">
            <AppointmentCard status="confirmed" />
            <AppointmentCard status="request" />
            <AppointmentCard status="pending" />
            <AppointmentCard status="cancelled" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default UpcomingAppointments;
