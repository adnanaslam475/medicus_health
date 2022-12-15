import React from "react";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import AdminAppointmentInfo from "modules/admin/components/AdminAppointmentInfo/AdminAppointmentInfo";
import { formatMMMM_Dcoma_YYYY, getCurrentUserTimeZone } from "common/utils/date";
import { date } from "common/utils";
import { Appointment } from "generated/graphql";
import { Spin } from "antd";

type Props = {
  appointment: Appointment | undefined;
  loading?: boolean;
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

function AdminPatientAppointmentInfoTab({ appointment, loading }: Props) {
  const timeZone = getCurrentUserTimeZone();

  let selectedAppointment = appointment?.appointmentTimeSlots?.find(
    (item) => item.selected
  );
  const normalizedAppointmentData = {
    id: appointment?.id,
    bookingDate: formatMMMM_Dcoma_YYYY(selectedAppointment?.startTime) || "--",
    patient: `${appointment?.patient?.first_name + " " + appointment?.patient?.last_name
      }`,
    physician:
      appointment?.doctor?.first_name + " " + appointment?.doctor?.last_name,
    service: appointment?.serviceType?.name,
    dueDate: formatMMMM_Dcoma_YYYY(String(appointment?.appointmentDateTime?.startTime)),
    time: `${appointment?.appointmentDateTime?.startTime
        ? `${date?.formathhmma(
          appointment?.appointmentDateTime?.startTime,timeZone
        )} - ${date?.formathhmma(
          appointment?.appointmentDateTime?.startTime,timeZone
        )}`
        : "--"
      }`,
    totalAmount: appointment?.appointmentCharges?.total,
    appointmentStatus: appointment?.status,
    paymentStatus: appointment?.transaction?.status,
    appointmentTypeProposed: appointment?.appointmentTypeProposed,
    createdAt: appointment?.createdAt
  };

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

  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <CardWithProfileImageInfo
      name={`${normalizedAppointmentData.patient}`}
      serviceName={normalizedAppointmentData.service}
      imageUrl={appointment?.patient?.patientProfile?.profileImage || ""}
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

export default AdminPatientAppointmentInfoTab;
