import React from "react";
import AppLayout from '../../../../../../common/components/AppLayout/AppLayout'
import AppointmentTabs from "../../../../../../../src/modules/doctor/pages/physicians/Appointments/Tabs/AppointmentTabs";

function RequestedAppointment() {

  return (
    <AppLayout>
        <div className="w-full">
          <div className="flex-none sm:flex items-center justify-between mb-5">
            <div className="pr-3 mb-3 sm:mb-0">
              <h2 className="mb-0">Requested Appointments</h2>
            </div>
          </div>
          <AppointmentTabs />
        </div>
    </AppLayout>
  );
}
export default RequestedAppointment;
