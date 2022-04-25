import React from "react";
import AppointmentTabs from "../../../../../common/components/Appointments/AppointmentTabs";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";

function AccountDetail() {
  const { query } = useRouter();

  return (
    <AppLayout>
      <div className="w-full">
        <h2 className="mb-4">Appointment Detail</h2>
        <div className="w-full">
          <AppointmentTabs appointmentId={Number(query?.id)} />
        </div>
      </div>
    </AppLayout>
  );
}
export default AccountDetail;
