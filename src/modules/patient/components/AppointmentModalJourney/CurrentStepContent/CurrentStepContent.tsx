import React from "react";
import { Appointment, AppointmentPriceResponse } from "../../../../../generated/graphql";
import AppointmentReschedule from "../AppointmentReschedule/AppointmentReschedule";
import AppointmentSuccess from "../AppointmentSuccess/AppointmentSuccess";
import MakePayment from "../MakePayment/MakePayment";
import MakePaymentMore from "../MakePaymentMore/MakePaymentMore";

type Props = {
  stepName: string;
  appointmentId: number | undefined;
  appointmentDetails: Appointment;
  appointmentCharges:AppointmentPriceResponse
};

const CurrentStepContent = React.forwardRef(function CurrentStepContent(
  { stepName, appointmentId, appointmentDetails,appointmentCharges }: Props,
  ref: any
) {
  switch (stepName) {
    case "stepOne":
      return (
        <AppointmentReschedule
          appointmentId={appointmentId as number}
          appointmentDetails={appointmentDetails as Appointment}
          appointmentCharges={appointmentCharges}
        />
      );
    case "stepTwo":
      return <MakePayment />;
    case "stepThree":
      return <MakePaymentMore />;
    case "stepFour":
      return <AppointmentSuccess />;

    default:
      return null;
  }
});

export default CurrentStepContent;
