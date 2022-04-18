import React from "react";
import {
  DoctorProfile,
} from "../../../generated/graphql";
import AppointmentBookingStepFour from "../Appointments/booking/AppointmentBookingStepFour";
import { AppointmentBookingStepOne } from "../Appointments/booking/AppointmentBookingStepOne";
import AppointmentBookingStepThree from "../Appointments/booking/AppointmentBookingStepThree";
import AppointmentBookingStepTwo from "../Appointments/booking/AppointmentBookingStepTwo";

type Props = { stepName: string; doctorData: DoctorProfile | undefined };

const CurrentStepContent = React.forwardRef(function CurrentStepContent(
  { stepName, doctorData }: Props,
  ref: any
) {
  switch (stepName) {
    case "stepOne":
      return <AppointmentBookingStepOne physicianData={doctorData} ref={ref} />;
    case "stepTwo":
      return <AppointmentBookingStepTwo ref={ref} />;
    case "stepThree":
      return <AppointmentBookingStepThree ref={ref} />;
    case "stepFour":
      return <AppointmentBookingStepFour />;

    default:
      return null;
  }
});

export default CurrentStepContent;
