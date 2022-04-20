import { Select, DatePicker, Space, Button } from "antd";
import React, { useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { CloseOutlined } from "@ant-design/icons";
import TransactionHistory from "../../../../../common/components/AccountTabs/TransactionHistory/TransactionHistory";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import { useGetAllRequestedAppointmentsQuery } from "../../../../../generated/graphql";

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
        status: "Cancelled",
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

        <div className="custom-table-ui">
          <TransactionHistory />
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
