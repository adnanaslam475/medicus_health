import React from "react";
import PatientAppointmentHistoryTable from "common/components/PatientAppointmentHistoryTable/PatientAppointmentHistoryTable";
import { useGetAllRequestedAppointmentsQuery } from "../../../../../generated/graphql";

function AppointmentHistory() {
  // GET ALL APPOINMENTS
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching: loading }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: "Completed",
      },
      pagination,
      sorting,
    },
  });

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order ? `user.${sorter.columnKey}` : "",
    });
  };

  const { appointments } = data || {};

  return (
    <div className="w-full">
      <div className="flex-none sm:flex items-center justify-between mb-5">
        <div className="pr-3 mb-3 sm:mb-0">
          <h2 className="mb-0">Appointment history</h2>
        </div>
      </div>
      <div className="custom-table-ui">
        <PatientAppointmentHistoryTable
          data={appointments?.items}
          pagination={pagination}
          meta={appointments?.meta}
          onChange={onChange}
          onPaginationChange={onPaginationChange}
          loading={loading}
        />
      </div>
    </div>
  );
}
export default AppointmentHistory;
