import { Empty } from "antd";
import React from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import Table from "./CancelledAppointmentTable";
import {
  Appointment,
  useGetAllAppointmentServiceTypesQuery,
  // useGetAllCancelledAppointmentsQuery,
} from "../../../../../generated/graphql";
import UpcomingAppointmentFilter from "modules/doctor/pages/appointments/UpcomingAppointmentFilter";
import { cancelAppointmentFilterType } from "common/types/types";

type CancelledAppointmentProps = {
  // onChange: (value: physicianFilterType) => void;
};

function CancelledAppointment({}: CancelledAppointmentProps) {
  const [filterValues, setFilterValues] =
    React.useState<cancelAppointmentFilterType>({});

  const [{ data: serviceTypes }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = serviceTypes || {};
  // const [{ data }, executeUseCancelledAppointmentsQuery] =
  // useGetAllCancelledAppointmentsQuery({
  //   variables: {
  //     filter: { status: "Cancelled", ...filterValues },
  //   },
  // });
  // const { appointments } = data || {};
  function onChangeFilters(values: any) {
    setFilterValues(values);
    // executeUseCancelledAppointmentsQuery({
    //   filter: filterValues,
    //   requestPolicy: "network-only",
    // });
  }
  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">Cancelled Appointments</h2>
          </div>
        </div>
        <div className="w-5/6">
          <UpcomingAppointmentFilter
            serviceTypes={appointmentServiceTypes}
            onChange={onChangeFilters}
          />
        </div>
        <div className="w-full">
          {/* {appointments?.length !== 0 && appointments ? (
            <Table dataSource={appointments as Appointment[]} />
          ) : (
            <div className="flex items-center justify-center w-full">
              <Empty />
            </div>
          )} */}
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
