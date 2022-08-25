import React, { useEffect, useState } from "react";
import AppLayout from "../../../../../../common/components/AppLayout/AppLayout";
import RequestedList from "modules/doctor/pages/RequestedList/RequestedList";
import SearchFilters from "common/components/SearchFilters/SearchFilters";
import {
  Appointment,
  BookingDate,
  useGetAllRequestedAppointmentsQuery,
} from "generated/graphql";
import { useTranslations } from "next-intl";

function RequestedAppointment() {
  const t = useTranslations("Common");
  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
  const [bookingDate, setBookingDate] = useState<BookingDate>({});
  const [dueDate, setDueDate] = useState<BookingDate>({});
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentId, setAppointmentId] = useState<number>();
  const [statusFilter, setStatusFilter] = useState<string>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [searchPatient, setSearchPatient] = useState<string>();
  const [clearFilter, setClearFilter] = useState<boolean>(false);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }, executeUseGetAllRequestedAppointmentsQuery] =
    useGetAllRequestedAppointmentsQuery({
      variables: {
        filter: appointmentId
          ? {
              // status: statusFilter || "Requested",
              status: "Requested",
              status2: statusFilter,
              physicianName: dataListPhysician,
              doctorId: doctorIds,
              appointmentId: appointmentId,
              serviceId: serviceIds,
              dueDate: dueDate,
              bookingDate: bookingDate,
              searchString: searchPatient || "",
            }
          : {
              // status: statusFilter || "Requested",
              status: "Requested",
              status2: statusFilter,
              physicianName: dataListPhysician,
              doctorId: doctorIds,
              serviceId: serviceIds,
              dueDate: dueDate,
              bookingDate: bookingDate,
              searchString: searchPatient || "",
            },
        pagination,
        sorting,
      },
      requestPolicy: "network-only",
    });
  const { appointments } = data || {};

  useEffect(() => {
    executeUseGetAllRequestedAppointmentsQuery({
      requestPolicy: "network-only",
    });
  }, [clearFilter]);

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order
        ? `${
            (sorter.columnKey === "name" && "appointment_service_type") ||
            (sorter.columnKey === "first_name" && "patient") ||
            (/(charges|requestedDate|createdAt|id)/.test(sorter.columnKey) &&
              "appointment") ||
            "user"
          }.${sorter.columnKey || sorter.field}`
        : "",
    });
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">Pending appointments</h2>
          </div>
        </div>
        <div className="">
          <SearchFilters
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setDataListPhysician={setDataListPhysician}
            setDoctorId={setDoctorId}
            setAppointmentId={setAppointmentId}
            setServiceIds={setServiceIds}
            setSearchPatient={setSearchPatient}
            setBookingDate={setBookingDate}
            setDueDate={setDueDate}
            isFromPhysician
            setClearFilter={setClearFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
        <RequestedList
          appointmentsData={appointments?.items as Appointment[]}
          meta={appointments?.meta}
          onChange={onChange}
          pagination={pagination}
          loading={fetching}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </AppLayout>
  );
}
export default RequestedAppointment;
