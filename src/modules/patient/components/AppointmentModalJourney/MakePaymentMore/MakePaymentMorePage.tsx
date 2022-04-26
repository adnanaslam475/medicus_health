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
import {
  useCreateCardMutation,
  useGetAllCardsQuery,
} from "../../../../../generated/graphql";
import { getUserData } from "common/utils/userData";

function MakePaymentMore() {
  const stripe = useStripe();
  const elements = useElements();

  // // GET ALL CARDS API CALL
  // const [, executeGetAllCardsQuery] = useGetAllCardsQuery({
  //   variables: { userId: getUserData()?.user?.id as number },
  // });

  const [, executeCardMutation] = useCreateCardMutation();

  const handleSubmit = async () => {
    // setLoadingSubmit(true);
    try {
      if (elements == null) {
        return;
      }
      const cardElement = elements.getElement(CardNumberElement);

      const { token } =
        (await stripe?.createToken(cardElement as StripeCardNumberElement)) ||
        {};

      const { source, error } =
        (await stripe?.createSource(
          cardElement as StripeElement,
          {} as CreateSourceData
        )) || {};

      const { user } = getUserData();
      await executeCardMutation({
        input: {
          card_digits: Number(source?.card?.last4) || 0,
          card_type: source?.card?.brand || "",
          is_default: false, //data?.length === 0,
          source_id: source?.id as string,
          user_id: user?.id as number,
          exp_month: String(source?.card?.exp_month),
          exp_year: String(source?.card?.exp_year),
        },
      });

      // executeGetAllCardsQuery({ requestPolicy: "network-only" });

      if (error) {
        notification.error({
          message: error?.message || "Something went wrong",
        });
        // setLoadingSubmit(false);
      } else {
        console.log(source?.id);
        // await onSubmit(source?.id);
        // setModalVisible(false);
        cardElement?.clear();
        // setLoadingSubmit(false);
      }
    } catch (error) {
      // setModalVisible(true);
      // setLoadingSubmit(false);
    }
  };
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
