import React from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import AppointmentCard from "../../../../../common/components/AppointmentCard/AppointmentCard";
import Router, { useRouter } from "next/router";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import { Button, Select } from "antd";
import Link from "next/link";
import { useGetAllRequestedAppointmentsQuery } from "../../../../../generated/graphql";

const { Option } = Select;
function UpcomingAppointments() {
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
            <h2 className="mb-0">Upcoming Appointments</h2>
            <p className="text-gray mb-0">
              Suspendisse ac nulla non ante viverra feugiat. Duis
              ullamcorperequesty tortor a fringilla tempus.
            </p>
          </div>
          
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
export default UpcomingAppointments;
