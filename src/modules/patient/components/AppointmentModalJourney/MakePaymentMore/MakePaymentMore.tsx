import React from "react";
import MakePaymentMorePage from "./MakePaymentMorePage";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import config from "../../../../../../config";
type Props = {
  onPrevious?: () => void;

}
function index(props: Props) {

  const { onPrevious } = props
  // const stripePromise = loadStripe(config.stripeKey || "");
  return (
    // <Elements stripe={loadStripe(config.stripeKey || "")}>
    <MakePaymentMorePage onPrevious={onPrevious}/>
    // </Elements>
  );
}

export default index;
