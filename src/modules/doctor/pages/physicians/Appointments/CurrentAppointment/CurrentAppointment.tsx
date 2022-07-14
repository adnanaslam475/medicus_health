import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import CurrentAppointmentTable from "./CurrentAppointmentTable";
import CurrentAppointmentFilter from "modules/doctor/pages/appointments/CurrentAppointmentFilter";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "generated/graphql";
import {
  cancelAppointmentFilterType,
  physicianFilterType,
} from "common/types/types";

type CancelledAppointmentProps = {};

function CurrentAppointment({}: CancelledAppointmentProps) {
  const [filterValues, setFilterValues] =
    React.useState<cancelAppointmentFilterType>({});
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }, executeUseCancelledAppointmentsQuery] =
    useGetAllRequestedAppointmentsQuery({
      variables: {
        filter: {
          status: "Cancelled",
          ...filterValues,
        },
        pagination,
        sorting,
      },
    });

  const { appointments } = data || {};
  function onChangeFilters(values: physicianFilterType) {
    setPagination({ ...pagination, page: 1 });
    setSorting({ column: "", order: "" });
    setFilterValues(values);
    executeUseCancelledAppointmentsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order ? `user.${sorter.field}` : "",
    });
  };

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
          <CurrentAppointmentTable
            loading={fetching}
            onChange={onChange}
            data={appointments?.items as Appointment[]}
            meta={appointments?.meta}
            onPaginationChange={onPaginationChange}
          />
        </div>
      </div>
    </AppLayout>
  );
}
export default CurrentAppointment;
