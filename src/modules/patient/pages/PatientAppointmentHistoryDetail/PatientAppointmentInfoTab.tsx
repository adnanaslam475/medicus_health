import {
  Appointment,
  GetAppointmentInput,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import DoctorAppointmentInfo from "common/components/DoctorAppointmentInfo/DoctorAppointmentInfo";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { Spin } from "antd";

function PatientAppointmentInfoTab() {
  const { query } = useRouter();
  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { appointmentId: Number(query?.id) },
      pagination,
      sorting,
    },
  });

  const { appointments } = data || {};
  const appointment = appointments?.items && appointments.items[0];
  const { patient, serviceType } = appointment || {};

  return fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <CardWithProfileImageInfo
      name={`${patient?.first_name} ${patient?.last_name}`}
      serviceName={serviceType?.name}
      imageUrl={patient?.patientProfile?.profileImage}
    >
      <DoctorAppointmentInfo data={appointment as Appointment} />
    </CardWithProfileImageInfo>
  );
}

export default PatientAppointmentInfoTab;
