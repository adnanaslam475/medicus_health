import React, { useRef, useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { Button, Empty } from "antd";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import AppointmentCard from "../../../../../common/components/AppointmentCard/AppointmentCard";
import { Appointment, useGetAllRequestedAppointmentsQuery } from "../../../../../generated/graphql";

function RequestedAppointment() {
  const [dataList, setDataList] = useState<undefined | Appointment[]>([]);
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentIds, setAppointmentIds] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: "Requested",
        physicianName: dataListPhysician,
        doctorId: doctorIds,
        appointmentId: appointmentIds,
        serviceId: serviceIds,
      },
    },
  });

  const { appointments } = data || {};
  console.log(data, "appointments");

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">Requested Appointments</h2>
          </div>
          <Button type="primary">Request an Appointment</Button>
        </div>
        <SearchFilters
          appointments={appointments}
          setDataList={setDataList}
          setDataListPhysician={setDataListPhysician}
          setDoctorId={setDoctorId}
          setAppointmentIds={setAppointmentIds}
          setServiceIds={setServiceIds}
        />
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
              return appointments.length !== 0 ? (
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
              ) : <Empty />;
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default RequestedAppointment;
