import { Button, Empty } from "antd";
import React, { useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import SearchFilters from "common/components/SearchFilters/SearchFilters";
import Table from './CancelledAppointmentTable'
import {
  Appointment,
  useGetAllCancelledAppointmentsQuery,
} from "../../../../../generated/graphql";

function CancelledAppointment() {
  const [dueDates, setDueDates] = useState<Date | null>();
  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentIds, setAppointmentIds] = useState<number>();
  const [currentAppointmentId, setCurrentAppointmentId] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [status, setStatus] = useState<string>("Cancelled");
  const [{ data }] = useGetAllCancelledAppointmentsQuery({
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
      },
    },
  });

  // function onViewSuggestedSlots(id: number) {
  //   setCurrentAppointmentId(id);
  //   setShowModal(true);
  // }

  const { appointments } = data || {};
  const [showModal, setShowModal] = useState<boolean>(false);

  console.log(data, "<============cancelledappointments", dueStartDate,serviceIds,dueEndDate,doctorIds);
  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">Cancelled Appointments</h2>
            <h5 className="text-gray">
              Suspendisse ac nulla non ante viverra feugiat. Duis
              ullamcorperequesty tortor a fringilla tempus.
            </h5>
          </div>
          <Button type="primary" size="large">
            Request an Appointment
          </Button>
        </div>

        <div className="w-5/6">
           <SearchFilters
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setDataListPhysician={setDataListPhysician}
            setDoctorId={setDoctorId}
            setAppointmentIds={setAppointmentIds}
            setServiceIds={setServiceIds}
            isFromPhysician
          />
        </div>
        <div className="w-full">
          {appointments?.length !== 0 && appointments ? (
            <Table dataSource={appointments as Appointment[]} />
          ) : (
            <div className="flex items-center justify-center w-full">
              <Empty />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
