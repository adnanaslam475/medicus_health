import React, { useRef } from "react";
import CalendarView from "../../../../common/components/CalendarView";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
function AppointmentCalendar() {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="">
          <CalendarView />
        </div>
      </div>
    </AppLayout>
  );
}

export default AppointmentCalendar;
