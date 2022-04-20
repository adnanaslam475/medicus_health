import React, { useRef, useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import AppointmentCard from "../../../../../common/components/AppointmentCard/AppointmentCard";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "../../../../../generated/graphql";
import { Button, Empty, Select } from "antd";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import Link from "next/link";
import AppointmentModalJourney from "../../../../patient/components/AppointmentModalJourney/AppointmentModalJourney";

function RequestedAppointment() {
  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentIds, setAppointmentIds] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
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

  const { appointments } = data || {};
  const { Option } = Select;
  const [showModal, setShowModal] = useState<boolean>(false);

  console.log("showModal", showModal);
  return (
    <AppLayout>
      <>
        <div className="w-full">
          <div className="flex-none sm:flex items-center justify-between mb-5">
            <div className="pr-3 mb-3 sm:mb-0">
              <h2 className="mb-0">Requested Appointments</h2>
            </div>
            {/* <Button type="primary">Request an Appointment</Button> */}
            <div className="flex gap-3">
              <div className="lg:ml-3 mt-0 sm:mt-0">
                <Select defaultValue="List View" className="w-full sm:w-40">
                  <Option value="Calendar View">
                    <Link href="/patient/calendar">
                      <a>Calendar View</a>
                    </Link>
                  </Option>
                  <Option selected value="List View">
                    List View
                  </Option>
                </Select>
              </div>
              <Button type="primary" className="text-sm">
                <span className="text-xs sm:text-base">
                  Request an Appointment
                </span>
              </Button>
            </div>
          </div>
          <SearchFilters
            appointments={appointments}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setDataListPhysician={setDataListPhysician}
            setDoctorId={setDoctorId}
            setAppointmentIds={setAppointmentIds}
            setServiceIds={setServiceIds}
          />
          <div className="w-full">
            {appointments?.length !== 0 && appointments ? (
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
                      setShowModal={setShowModal}
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
        <AppointmentModalJourney
          visible={showModal}
          onCancel={() => setShowModal(false)}
        />
      </>
    </AppLayout>
  );
}
export default RequestedAppointment;
