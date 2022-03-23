import React from "react";
import AppointmentTabs from "../../../../../common/components/Appointments/AppointmentTabs";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";

function AccountDetail() {
  return (
    <AppLayout>
      <div className="w-full">
        <h2 className="mb-4">Appointment Detail</h2>
        <div className="w-full">
          <AppointmentTabs />
        </div>
      </div>
    </AppLayout>
  );
}
export default AccountDetail;
