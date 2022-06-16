import React from "react";
import { Empty } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import Table from "./CurrentAppointmentTable";
import CanncelledAppointmentFilter from "modules/doctor/pages/appointments/CancelAppointmentFilter";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "generated/graphql";
import {
  cancelAppointmentFilterType,
  physicianFilterType,
} from "common/types/types";
import CurrentAppointmentTable from "./CurrentAppointmentTable";
import CurrentAppointmentFilter from "modules/doctor/pages/appointments/CurrentAppointmentFilter";

type CancelledAppointmentProps = {};

function CurrentAppointment({}: CancelledAppointmentProps) {
  const [filterValues, setFilterValues] =
    React.useState<cancelAppointmentFilterType>({});

  const [{ data,fetching }, executeUseCancelledAppointmentsQuery] =
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
            <h2 className="mb-0">Current Appointments</h2>
          </div>
        </div>
        <div className="">
          <CurrentAppointmentFilter onChange={onChangeFilters} />
        </div>
        <div className="w-full">
          {/* {appointments?.length !== 0 && appointments ? (
            <Table dataSource={appointments as Appointment[]} loading={fetching}/>
          ) : (
            <div className="flex items-center justify-center w-full">
              <Empty />
            </div>
          )} */}
          {/* <Table dataSource={appointments as Appointment[]} loading={fetching}/> */}
          <CurrentAppointmentTable loading={false}/>
        </div>
      </div>
    </AppLayout>
  );
}
export default CurrentAppointment;
