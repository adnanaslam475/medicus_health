import React from "react";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import AdminAppointmentInfo from "modules/admin/components/AdminAppointmentInfo/AdminAppointmentInfo";
import { formathhmma, formatMMMM_Dcoma_YYYY, getCurrentUserTimeZone } from "common/utils/date";
import { date } from "common/utils";
import { Appointment } from "generated/graphql";
import { Spin } from "antd";

type Props = {
  formRef?: any;
  appointment: Appointment | undefined;
  loading?: boolean;
  isEdit: boolean;
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

function AdminAppointmentInfoTab({
  appointment,
  loading,
  isEdit,
  formRef,
}: Props) {
  let selectedAppointment = appointment?.appointmentTimeSlots?.find(
    (item) => item.selected
  );
  const timeZone = getCurrentUserTimeZone()

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
  let formatedStartTime = date.formathhmma(
  String(appointment?.appointmentDateTime?.startTime),timeZone
  );

  let formatedEndTime = date.formathhmma(
    String(appointment?.appointmentDateTime?.endTime),timeZone
  );

  const normalizedAppointmentData = {
    id: appointment?.id,
    bookingDate: formatMMMM_Dcoma_YYYY(appointment?.requestedDate),
    patient: `${
      appointment?.patient?.first_name + " " + appointment?.patient?.last_name
    }`,
    physician: `${
      appointment?.doctor?.last_name?.includes("Dr.")
        ? appointment?.doctor?.last_name
        : `Dr. ${appointment?.doctor?.last_name}`
    }`,
    service: appointment?.serviceType?.name,
    dueDate: formatMMMM_Dcoma_YYYY(
      appointment?.appointmentDateTime?.startTime ||
        selectedAppointment?.startTime
    ),

    time: `${
      appointment?.appointmentDateTime?.startTime &&
      appointment?.appointmentDateTime?.endTime
        ? `${formatedStartTime} - ${formatedEndTime}`
        : "--"
    }`,
    totalAmount: appointment?.appointmentCharges?.total || appointment?.charges,
    appointmentStatus: appointment?.status,
    paymentStatus: appointment?.transaction?.status,
    profilePicture: appointment?.patient?.patientProfile?.profileImage,
    appointmentTypeProposed: appointment?.appointmentTypeProposed,
    createdAt:appointment?.createdAt
  };
  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <CardWithProfileImageInfo
      name={`${normalizedAppointmentData.patient}`}
      serviceName={normalizedAppointmentData.service}
      imageUrl={normalizedAppointmentData?.profilePicture}
    >
      <div className="max-w-[800px]">
        <AdminAppointmentInfo
          data={normalizedAppointmentData as any}
          adminApp_Details={adminApp_Details as DoctorData}
          appointmentData={appointment as Appointment}
          isEdit={isEdit}
          formRef={formRef}
        />
      </div>
    </CardWithProfileImageInfo>
  );
}

export default AdminAppointmentInfoTab;
