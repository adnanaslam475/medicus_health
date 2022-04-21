import React from 'react'
import MakePaymentMorePage from './MakePaymentMorePage'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../../../../config";
function index() {
    const stripePromise = loadStripe(config.stripeKey || "");
  return (
    <Elements stripe={loadStripe(config.stripeKey || "")}>
    <MakePaymentMorePage/>
    </Elements>
  )
}

export default index