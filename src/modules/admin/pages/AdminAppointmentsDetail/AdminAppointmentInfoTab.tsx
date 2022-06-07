import React from "react";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import AdminAppointmentInfo from "modules/admin/components/AdminAppointmentInfo/AdminAppointmentInfo";
import { formatMMMM_Dcoma_YYYY } from "common/utils/date";
import { date } from "common/utils";
import { Appointment } from "generated/graphql";

type Props = {
  appointment: Appointment | undefined;
};

type DoctorData = {
  doctor: {
    doctor_Id: number;
    doctor_first_name: string;
    doctor_last_name: string;
  };
  patient: {
    patient_id: number;
  };
};

function AdminAppointmentInfoTab({ appointment }: Props) {
  let selectedAppointment = appointment?.appointmentTimeSlots?.find(
    (item) => item.selected
  );

  const adminApp_Details = {
    doctor: {
      doctor_Id: appointment?.doctor?.id,
      doctor_first_name: appointment?.doctor?.first_name,
      doctor_last_name: appointment?.doctor?.last_name,
    },
    patient: {
      patient_id: appointment?.patient?.id,
    },
  };

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
        <AdminAppointmentInfo
          data={normalizedAppointmentData as any}
          adminApp_Details={adminApp_Details as DoctorData}
        />
      </div>
    </CardWithProfileImageInfo>
  );
}

export default AdminAppointmentInfoTab;
