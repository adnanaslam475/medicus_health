import { Select, DatePicker, Space, Button, Empty } from "antd";
import React, { useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { CloseOutlined } from "@ant-design/icons";
import TransactionHistory from "../../../../../common/components/AccountTabs/TransactionHistory/TransactionHistory";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import { useGetAllRequestedAppointmentsQuery } from "../../../../../generated/graphql";
import AppointmentCard from "../../../../../common/components/AppointmentCard/AppointmentCard";

const { RangePicker } = DatePicker;

function CancelledAppointment() {
  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
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
        <h2 className="mb-4">History</h2>
        <div className="w-5/6">
          <SearchFilters
            appointments={appointments}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setDataListPhysician={setDataListPhysician}
            setDoctorId={setDoctorId}
            setAppointmentIds={setAppointmentIds}
            setServiceIds={setServiceIds}
          />
        </div>
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

        <div className="custom-table-ui">
          <TransactionHistory />
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
