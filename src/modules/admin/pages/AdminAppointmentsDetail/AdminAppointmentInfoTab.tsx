import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import LabelWithTextDiv from "common/components/LabelWithTextDiv/LabelWithTextDiv";
import { date } from "common/utils";
import {
  useDoctorAppointmentDetailPatientInfoQuery,
  useGetCityByIdQuery,
  useGetCountryByIdQuery,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import AdminAppointmentInfo from "modules/admin/components/AdminAppointmentInfo/AdminAppointmentInfo";
import { useRouter } from "next/router";
import React from "react";

function PatientInfoTab() {



const data={
  id:"1",
  bookingDate:"20-2-2021",
  patient:"usama",
  physician:"jordan",
  service:"consultation",
  dueDate:"20-2-2021",
  time:"2am",
  totalAmount:"22020202",
  appointmentStatus:"confirmed",
  paymentStatus:"paid",
}

  return (
    <CardWithProfileImageInfo
      name="usama"
      serviceName="consultation"
    >
      <div className="max-w-[800px]">
        <AdminAppointmentInfo data={data}/>
      </div>
    </CardWithProfileImageInfo>
  );
}

export default PatientInfoTab;
