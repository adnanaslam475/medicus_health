import React, { useRef, useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { Button } from "antd";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import AppointmentCard from "../../../../../common/components/AppointmentCard";
import { useGetAllRequestedAppointmentsQuery } from "../../../../../generated/graphql";

function RequestedAppointment() {
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        doctorId: 520,
        status: "Requested",
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
            <p className="text-gray mb-0">
              Suspendisse ac nulla non ante viverra feugiat. Duis
              ullamcorperequesty tortor a fringilla tempus.
            </p>
          </div>
          <Button type="primary">Request an Appointment</Button>
        </div>
        <SearchFilters />
        <div className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {appointments?.map((appointmentDetail, i) => {
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
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default RequestedAppointment;
