import React, { useState } from "react";
import { Button, Tag, Modal, Form, Space, Spin, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeCardNumberElement } from "@stripe/stripe-js/types/stripe-js/elements";

import { CreateSourceData, StripeElement } from "@stripe/stripe-js";
import _classes from "./StripeCard.module.scss";

function MakePaymentMore() {
  const handleSubmit = async () => {};
  return (
    <Form className="" onFinish={handleSubmit} layout="vertical">
      <h1>Make Payment</h1>
      <span className="text-base text-secondary my-2">Card Number*</span>
      <div className="border border-gray-3 p-3 rounded mb-5 hover:border-primary">
        <CardNumberElement
          options={{
            placeholder: "",
            style: {
              base: {
                "::placeholder": {
                  color: "gray",
                },
              },
            },
          }}
        />
      </div>
      <div className="sm:grid grid-cols-2 gap-4">
        <div>
          <span className="text-base text-secondary">CVV*</span>
          <div className="border border-gray-3 p-3 rounded mb-5 hover:border-primary">
            <CardCvcElement
              options={{
                placeholder: "",
              }}
            />
          </div>
        </div>
        <div>
          <span className="text-base text-secondary my-2">Expiry*</span>
          <div className="border border-gray-3 p-3 rounded mb-5 hover:border-primary">
            <CardExpiryElement />
          </div>
        </div>
      </div>
    </Form>
  );
}

export default MakePaymentMore;
