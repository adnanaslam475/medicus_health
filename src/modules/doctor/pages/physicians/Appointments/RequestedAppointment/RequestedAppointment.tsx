import React, { useEffect, useState } from "react";
import AppLayout from "../../../../../../common/components/AppLayout/AppLayout";
import AppointmentTabs from "../../../../../../../src/modules/doctor/pages/physicians/Appointments/Tabs/AppointmentTabs";
import RequestedList from "modules/doctor/pages/RequestedList/RequestedList";
import {
  Appointment,
  BookingDate,
  useGetAllRequestedAppointmentsQuery,
} from "generated/graphql";
import SearchFilters from "common/components/SearchFilters/SearchFilters";

function RequestedAppointment() {
  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
  const [bookingDate, setBookingDate] = useState<BookingDate>({});
  const [dueDate, setDueDate] = useState<BookingDate>({});
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentId, setAppointmentId] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [status, setStatus] = useState<string>("Requested");
  const [searchPatient, setSearchPatient] = useState<string>();
  const [clearFilter, setClearFilter] = useState<boolean>(false);

  const [{ data,fetching },executeUseGetAllRequestedAppointmentsQuery] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: status,
        physicianName: dataListPhysician,
        doctorId: doctorIds,
        appointmentId: appointmentId,
        serviceId: serviceIds,
        dueDate: dueDate,
        bookingDate: bookingDate,
        searchString: searchPatient,
      },
    },
    requestPolicy:"network-only"
  });
  const { appointments } = data || {};

  useEffect(()=>{
    executeUseGetAllRequestedAppointmentsQuery({requestPolicy:"network-only"})
  },[clearFilter])
  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">Requested Appointments</h2>
          </div>
        </div>
        <div className="">
          <SearchFilters
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setDataListPhysician={setDataListPhysician}
            setDoctorId={setDoctorId}
            setAppointmentId={setAppointmentId}
            setServiceIds={setServiceIds}
            setSearchPatient={setSearchPatient}
            setBookingDate={setBookingDate}
            setDueDate={setDueDate}
            isFromPhysician
            setClearFilter={setClearFilter}
          />
        </div>
        <RequestedList appointmentsData={appointments as Appointment[]}  loading={fetching}/>
      </div>
    </AppLayout>
  );
}
export default RequestedAppointment;
