import React from "react";
import { Empty } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import Table from "./CancelledAppointmentTable";
import CanncelledAppointmentFilter from "modules/doctor/pages/appointments/CancelAppointmentFilter";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "generated/graphql";
import {
  cancelAppointmentFilterType,
  physicianFilterType,
} from "common/types/types";

type CancelledAppointmentProps = {};

function CancelledAppointment({}: CancelledAppointmentProps) {
  const [filterValues, setFilterValues] =
    React.useState<cancelAppointmentFilterType>({});

  const [{ data, fetching }, executeUseCancelledAppointmentsQuery] =
    useGetAllRequestedAppointmentsQuery({
      variables: {
        filter: {
          status: "Cancelled",
          ...filterValues,
        },
      },
    });
  const { appointments } = data || {};

  function onChangeFilters(values: physicianFilterType) {
    setFilterValues(values);
    executeUseCancelledAppointmentsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }
  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between">
          <div className="pr-3 mb-3 sm:mb-0">
<<<<<<< HEAD
            <h2 className="mb-0">Cancelled appointments</h2>
=======
            <h2 className="mb-0">Canceled appointments</h2>
>>>>>>> 63a203ce1900f690a3a4f4b0fe5f17cea16e337f
          </div>
        </div>
        <div className="">
          <CanncelledAppointmentFilter onChange={onChangeFilters} />
        </div>
        <div className="w-full">
          {/* {appointments?.length !== 0 && appointments ? (
            <Table dataSource={appointments as Appointment[]} loading={fetching}/>
          ) : (
            <div className="flex items-center justify-center w-full">
              <Empty />
            </div>
          )} */}
          <Table
            dataSource={appointments as Appointment[]}
            loading={fetching}
          />
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
