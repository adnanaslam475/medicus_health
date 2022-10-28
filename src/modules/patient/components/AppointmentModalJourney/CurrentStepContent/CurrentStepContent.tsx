import React, { useEffect } from "react";
import { OperationContext } from "urql";
import { Appointment, AppointmentPriceResponse } from "../../../../../generated/graphql";
import AppointmentReschedule from "../AppointmentReschedule/AppointmentReschedule";
import AppointmentSuccess from "../AppointmentSuccess/AppointmentSuccess";
import MakePayment from "../MakePayment/MakePayment";
import MakePaymentMore from "../MakePaymentMore/MakePaymentMore";

type Props = {
  stepName: string;
  appointmentId: number | undefined;
  appointmentDetails: Appointment;
  appointmentCharges: AppointmentPriceResponse;
  onPrevious?: () => void;
  setSelectedCardId?: React.Dispatch<React.SetStateAction<undefined | number>>

};

const CurrentStepContent = React.forwardRef(function CurrentStepContent(
  { stepName, appointmentId, appointmentDetails, appointmentCharges, onPrevious, setSelectedCardId }: Props,
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
      return <MakePayment setSelectedCardId={setSelectedCardId} appointmentId={appointmentId as number} />;
    case "stepThree":
      return <MakePaymentMore onPrevious={onPrevious} />;
    case "stepFour":
      return <AppointmentSuccess />;

    default:
      return null;
  }
});

export default CurrentStepContent;
