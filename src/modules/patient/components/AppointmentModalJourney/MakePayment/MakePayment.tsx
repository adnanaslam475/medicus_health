import { Form } from "antd";
import React from "react";
import Payment from "../Payment/Payment";
import visa from "./../../../../../../public/assets/images/visa.svg";
import mastercard from "./../../../../../../public/assets/images/mastercard.svg";
import _Classes from "./MakePayment.module.scss";

function MakePayment() {
  return (
    <>
      <h2>Make Payment</h2>
      <Form layout="vertical">
        <div className="mt-8">
          <Payment visa={visa} />

          <Payment visa={mastercard} />
        </div>
      </Form>
    </>
  );
}

export default MakePayment;
