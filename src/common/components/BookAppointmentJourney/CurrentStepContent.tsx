import React from "react";
import { DoctorProfile } from "../../../generated/graphql";
import AppointmentBookingStepFour from "../Appointments/booking/AppointmentBookingStepFour";
import { AppointmentBookingStepOne } from "../Appointments/booking/AppointmentBookingStepOne";
import AppointmentBookingStepThree from "../Appointments/booking/AppointmentBookingStepThree";
import AppointmentBookingStepTwo from "../Appointments/booking/AppointmentBookingStepTwo";

type Props = { stepName: string; doctorData: DoctorProfile | undefined,admin?:boolean };

const CurrentStepContent = React.forwardRef(function CurrentStepContent(
  { stepName, doctorData,admin }: Props,
  ref: any
) {
  switch (stepName) {
    case "stepOne":
      return <AppointmentBookingStepOne physicianData={doctorData} ref={ref} admin/>;
    case "stepTwo":
      return <AppointmentBookingStepTwo ref={ref} />;
    case "stepThree":
      return (
        <AppointmentBookingStepThree physicianData={doctorData} ref={ref} />
      );
    case "stepFour":
      return <AppointmentBookingStepFour />;

    default:
      return null;
  }
});

export default CurrentStepContent;
