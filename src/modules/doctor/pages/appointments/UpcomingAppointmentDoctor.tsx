import React, { useState } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Button } from "antd";
import Link from "next/link";
import UpcomingAppointmentFilter from "./UpcomingAppointmentFilter";
import {
  GetPhysicianAppointmentInput,
  PhysicianAppointmentsQuery,
  usePhysicianAppointmentsQuery,
} from "generated/graphql";
import UpcomingAppointmentTableDoctor from "modules/doctor/components/UpcomingAppointmentTableDoctor/UpcomingAppointmentTableDoctor";
import { useDebounce } from "use-debounce";

function UpcomingAppointmentDoctor() {
  const [idOrName, setIdOrName] = useState();
  const [serviceType, setServiceType] = useState();
  const [creationDate, setCreationDate] = useState<string[]>([]);

  const [debouncedIdOrName] = useDebounce(idOrName, 1000);

  const filter: GetPhysicianAppointmentInput = {};

  if (idOrName && debouncedIdOrName) {
    if (isNaN(debouncedIdOrName)) {
      filter.patientName = debouncedIdOrName;
    } else filter.doctorId = Number(debouncedIdOrName);
  }

  if (serviceType) {
    filter.appointmentType = serviceType;
  }

  if (creationDate.length) {
    filter.bookingDate = {
      startDate: creationDate[0],
      endDate: creationDate[1],
    };
  }

  const [{ data: physicialData }, executeUsePhysicianAppointmentsQuery] =
    usePhysicianAppointmentsQuery({
      variables: {
        filter: filter,
      },
    });
  const { physicianAppointments } = physicialData || {};

  function clearFilter() {
    setIdOrName(undefined);
    setServiceType(undefined);
    setCreationDate([]);
    executeUsePhysicianAppointmentsQuery({
      requestPolicy: "network-only",
      variables: { filter: filter },
    });
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Upcoming Appointments</h2>
          <Link passHref href={`/doctor/appointments/calendar`}>
            <a>
              <Button>Calendar View</Button>
            </a>
          </Link>
        </div>

        <UpcomingAppointmentFilter
          idOrName={idOrName}
          setIdOrName={setIdOrName}
          creationDate={creationDate}
          setCreationDate={setCreationDate}
          serviceType={serviceType}
          setServiceType={setServiceType}
          clearFilter={clearFilter}
        />
        <UpcomingAppointmentTableDoctor
          dataSource={
            physicianAppointments as PhysicianAppointmentsQuery["physicianAppointments"]
          }
        />
      </div>
    </AppLayout>
  );
}
export default UpcomingAppointmentDoctor;
