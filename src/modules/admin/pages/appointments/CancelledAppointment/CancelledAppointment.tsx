import { Button, Empty } from "antd";
import React, { useState } from "react";
import AppointmentCard from "../../../../../common/components/AppointmentCard/AppointmentCard";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "../../../../../generated/graphql";

function CancelledAppointment() {
  const [dueDates, setDueDates] = useState<Date | null>();
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentIds, setAppointmentIds] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: "Cancelled",
        physicianName: dataListPhysician,
        doctorId: doctorIds,
        appointmentId: appointmentIds,
        serviceId: serviceIds,
        // dueDate: dueDates,
      },
    },
  });

  const { appointments } = data || {};

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2 className="mb-4">Cancelled Appointments</h2>
          <Button type="primary" size="large">
            Request an Appointment
          </Button>
        </div>
        <h5 className="text-gray">
          Suspendisse ac nulla non ante viverra feugiat. Duis ullamcorperequesty
          tortor a fringilla tempus.
        </h5>

        <div className="w-5/6">
          <SearchFilters
            appointments={appointments}
            setDueDates={setDueDates}
            setDataListPhysician={setDataListPhysician}
            setDoctorId={setDoctorId}
            setAppointmentIds={setAppointmentIds}
            setServiceIds={setServiceIds}
          />
        </div>

        <div className="w-full">
          <div className="appointment-cards flex flex-wrap">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {appointments?.length !== 0 && appointments ? (
              appointments?.map((appointmentDetail, i) => {
                const {
                  id,
                  patientId,
                  doctorId,
                  serviceId,
                  requestedDate,
                  status,
                  serviceType,
                  doctor,
                } = appointmentDetail || {};
                return (
                  <AppointmentCard
                    id={id}
                    patientId={patientId}
                    doctorId={doctorId}
                    serviceId={serviceId}
                    requestedDate={requestedDate}
                    status={status}
                    serviceType={serviceType?.name}
                    doctor={doctor?.first_name}
                  />
                );
              })
            ) : (
              <div className="flex lg:my-80 lg:mx-96">
                <Empty />
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
