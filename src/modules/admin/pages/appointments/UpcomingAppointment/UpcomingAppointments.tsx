import React, { useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import AppointmentCard from "../../../../../common/components/AppointmentCard/AppointmentCard";
import Router, { useRouter } from "next/router";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import { Button, Empty, Select } from "antd";
import Link from "next/link";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "../../../../../generated/graphql";

const { Option } = Select;
function UpcomingAppointments() {
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
          <div className="flex gap-3">
            <div className="lg:ml-3 mt-0 sm:mt-0">
              <Select defaultValue="Calendar View" className="w-full sm:w-40">
                <Option value="Calendar View">
                  <Link href="/patient/calendar">
                    <a>Calendar View</a>
                  </Link>
                </Option>
                <Option value="List View">List View</Option>
              </Select>
            </div>
            <Button
              type="primary"
              className="text-sm"
              onClick={() => Router.push("/patient/calendar")}
            >
              <span className="text-xs sm:text-base">
                Request an Appointment
              </span>
            </Button>
          </div>
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
export default UpcomingAppointments;
