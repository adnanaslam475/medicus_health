import React from "react";
import AppointmentBookingStepFour from "../Appointments/booking/AppointmentBookingStepFour";
import AppointmentBookingStepOne from "../Appointments/booking/AppointmentBookingStepOne";
import AppointmentBookingStepThree from "../Appointments/booking/AppointmentBookingStepThree";
import AppointmentBookingStepTwo from "../Appointments/booking/AppointmentBookingStepTwo";
import SuccessMessage from "../Appointments/booking/SuccessMessage";

type Props = { stepName: string };

function CurrentStepContent({ stepName }: Props) {

  switch (stepName) {
    case "stepOne":
      return (
        <AppointmentBookingStepOne
        //   physicianData={doctorData}
        //   allAppoinments={data?.data?.appointmentServiceTypes}
        //   onFinish={getStepOneValue}
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
