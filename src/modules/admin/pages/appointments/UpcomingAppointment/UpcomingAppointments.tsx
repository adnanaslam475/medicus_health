import React, { useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import AppointmentCard from "../../../../../common/components/AppointmentCard/AppointmentCard";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import { Empty, Select } from "antd";
import {
  AppointmentTimeSlots,
  useGetAllRequestedAppointmentsQuery,
} from "../../../../../generated/graphql";

const { Option } = Select;
function UpcomingAppointments() {
  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentIds, setAppointmentIds] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [status, setStatus] = useState<string>("Confirmed");
  const [currentAppointmentId, setCurrentAppointmentId] = useState<number>();
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: status,
        physicianName: dataListPhysician,
        doctorId: doctorIds,
        appointmentId: appointmentIds,
        serviceId: serviceIds,
        dueDate:{
          startDate:dueStartDate,
          endDate:dueEndDate,
        }
      },
    },
  });

  function onViewSuggestedSlots(id: number) {
    setCurrentAppointmentId(id);
    setShowModal(true);
  }

  const { appointments } = data || {};
  const [showModal, setShowModal] = useState<boolean>(false);

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
        <SearchFilters
          setDataListPhysician={setDataListPhysician}
          setDoctorId={setDoctorId}
          setAppointmentIds={setAppointmentIds}
          setServiceIds={setServiceIds}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <div className="w-full">
          {appointments?.length !== 0 && appointments ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {appointments?.map((appointmentDetail, i) => {
                const {
                  id,
                  requestedDate,
                  status,
                  serviceType,
                  doctor,
                  appointmentTimeSlots,
                } = appointmentDetail || {};
                return (
                  <AppointmentCard
                    appointmentId={id}
                    requestedDate={requestedDate}
                    status={status}
                    serviceType={serviceType?.name}
                    doctor={doctor?.first_name}
                    appointmentTimeSlots={
                      appointmentTimeSlots as AppointmentTimeSlots[]
                    }
                    setShowModal={setShowModal}
                    onViewSuggestedSlots={() =>
                      onViewSuggestedSlots(appointmentDetail?.id)
                    }
                  />
                );
              })}
            </div>
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
export default UpcomingAppointments;
