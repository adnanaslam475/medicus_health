import React, { useState } from "react";
import AppLayout from "../../../../../../common/components/AppLayout/AppLayout";
import AppointmentTabs from "../../../../../../../src/modules/doctor/pages/physicians/Appointments/Tabs/AppointmentTabs";
import RequestedList from "modules/doctor/pages/RequestedList/RequestedList";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "generated/graphql";
import SearchFilters from "common/components/SearchFilters/SearchFilters";

function RequestedAppointment() {
  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentIds, setAppointmentIds] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [status, setStatus] = useState<string>("Requested");
  const [searchPatient, setSearchPatient] = useState<string>();


  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: status,
        physicianName: dataListPhysician,
        doctorId: doctorIds,
        appointmentId: appointmentIds,
        serviceId: serviceIds,
        dueDate: {
          startDate: dueStartDate,
          endDate: dueEndDate,
        },
        searchPatient:searchPatient
      },
    },
  });
  const { appointments } = data || {};

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">Requested Appointments</h2>
          </div>
        </div>
        <div className="w-5/6">
          <SearchFilters
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setDataListPhysician={setDataListPhysician}
            setDoctorId={setDoctorId}
            setAppointmentIds={setAppointmentIds}
            setServiceIds={setServiceIds}
            setSearchPatient={setSearchPatient}
            isFromPhysician
          />
        </div>
        <RequestedList appointmentsData={appointments as Appointment[]} />
      </div>
    </AppLayout>
  );
}
export default RequestedAppointment;
