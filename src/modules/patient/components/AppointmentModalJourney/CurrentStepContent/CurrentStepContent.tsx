import React from "react";
import AppointmentReschedule from "../AppointmentReschedule/AppointmentReschedule";
import AppointmentSuccess from "../AppointmentSuccess/AppointmentSuccess";
import MakePayment from "../MakePayment/MakePayment";
import MakePaymentMore from "../MakePaymentMore/MakePaymentMore";



type Props = { stepName: string};

const CurrentStepContent = React.forwardRef(function CurrentStepContent(
  { stepName }: Props,
  ref: any
) {
  switch (stepName) {
    case "stepOne":
      return <AppointmentReschedule/>;
    case "stepTwo":
      return <MakePayment />;
    case "stepThree":
      return <MakePaymentMore/>;
      case "stepFour":
        return <AppointmentSuccess/>;
   

    default:
      return null;
  }
});

export default CurrentStepContent;
