import React from "react";
import {
  DoctorProfile,
  useGetAllAppointmentServiceTypesQuery,
} from "../../../generated/graphql";
import AppointmentBookingStepFour from "../Appointments/booking/AppointmentBookingStepFour";
import { AppointmentBookingStepOne } from "../Appointments/booking/AppointmentBookingStepOne";
import AppointmentBookingStepThree from "../Appointments/booking/AppointmentBookingStepThree";
import AppointmentBookingStepTwo from "../Appointments/booking/AppointmentBookingStepTwo";

type Props = { stepName: string; doctorData: DoctorProfile | undefined };

function CurrentStepContent({ stepName, doctorData }: Props) {

  const [data] = useGetAllAppointmentServiceTypesQuery();

  switch (stepName) {
    case "stepOne":
      return (
        <AppointmentBookingStepOne
          physicianData={doctorData}
          allAppoinments={data?.data?.appointmentServiceTypes}
        />
      );
    case "stepTwo":
      return <AppointmentBookingStepTwo />;
    case "stepThree":
      return <AppointmentBookingStepThree />;
    case "stepFour":
      return <AppointmentBookingStepFour />;

    default:
      return null;
  }
}

export default CurrentStepContent;
