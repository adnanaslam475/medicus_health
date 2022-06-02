import React from "react";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import AdminAppointmentInfo from "modules/admin/components/AdminAppointmentInfo/AdminAppointmentInfo";
import { formatMMMM_Dcoma_YYYY } from "common/utils/date";
import { date } from "common/utils";
import { Appointment } from "generated/graphql";

type Props = {
  appointment: Appointment | undefined;
};

function AdminAppointmentInfoTab({ appointment }: Props) {
  let selectedAppointment = appointment?.appointmentTimeSlots?.find(
    (item) => item.selected
  );
  const normalizedAppointmentData = {
    id: appointment?.id,
    bookingDate: appointment?.requestedDate,
    patient: `${
      appointment?.patient?.first_name + " " + appointment?.patient?.last_name
    }`,
    physician:
      appointment?.doctor?.first_name + " " + appointment?.doctor?.last_name,
    service: appointment?.serviceType?.name,
    dueDate: formatMMMM_Dcoma_YYYY(selectedAppointment?.startTime),
    time: `${
      selectedAppointment?.startTime
        ? `${date?.formathhmma(
            selectedAppointment?.startTime
          )} - ${date?.formathhmma(selectedAppointment?.endTime)}`
        : "--"
    }`,
    totalAmount: appointment?.charges,
    appointmentStatus: appointment?.status,
    paymentStatus: appointment?.transaction?.status,
  };

  return (
    <CardWithProfileImageInfo
      name={`${normalizedAppointmentData.patient}`}
      serviceName={normalizedAppointmentData.service}
    >
      <div className="max-w-[800px]">
        <AdminAppointmentInfo data={normalizedAppointmentData as any} />
      </div>
    </CardWithProfileImageInfo>
  );
}

export default AdminAppointmentInfoTab;
