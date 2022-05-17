import { DatePicker } from "antd";
import React from "react";
import { useGetAllRequestedAppointmentsQuery } from "../../../../../generated/graphql";
import PatientAppointmentHistoryTable from "common/components/PatientAppointmentHistoryTable/PatientAppointmentHistoryTable";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";

function AppointmentHistory() {
  // GET ALL APPOINMENTS
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: "Completed",
      },
    },
  });

  const { appointments } = data || {};
  return (
    <CardWithProfileImageInfo name="usama" serviceName="consultation">
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">Appointment History</h2>
          </div>
        </div>
        <div className="custom-table-ui">
          <PatientAppointmentHistoryTable data={appointments} />
        </div>
      </div>
    </CardWithProfileImageInfo>
  );
}
export default AppointmentHistory;
