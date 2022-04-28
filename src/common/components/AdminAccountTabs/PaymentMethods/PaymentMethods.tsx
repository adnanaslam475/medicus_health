import React, { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import { Collapse, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BillingItem from "./BillingItem/BillingItem";
import PaymentHeader from "./PaymentHeader/PaymentHeader";
import PaymentHeader2 from "./PaymentHeader2/PaymentHeader2";
import { Elements } from "@stripe/react-stripe-js";
// import { BillingNew } from "./BillingNew";
import {
  useGetAllCardsQuery,
  useCreateCardMutation,
  useRemoveCardMutation,
  useDefaultCardMutation,
} from "../../../../generated/graphql";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../../../config";
import BillingNew from "./BillingNew";
import { getUserData } from "../../../utils/userData";

const { Panel } = Collapse;
const stripePromise = loadStripe(config.stripeKey || "");

const PaymentMethods = () => {
  // GET USER ID
  const { user } = getUserData();
  const id: number = user?.id;

  const [{ data: createCardsData }, executeCardMutation] =
    useCreateCardMutation();
  const { createCard } = createCardsData || {};

  // GET ALL CARDS API CALL
  const [{ data: allCardsData }] = useGetAllCardsQuery({
    variables: { userId: id },
  });
  const { getAllCards } = allCardsData || {};

  // REMOVE  CARDS API CALL
  const [{ data: removeCardData }, executeRemoveCard] = useRemoveCardMutation();
  const { removeCard } = removeCardData || {};

  // DEFAULT CARD SET API CALL
  const [{ data: DefaultCardData }, setDefaultCard] = useDefaultCardMutation();
  const { setAsDefaultCard } = DefaultCardData || {};

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [paymentMethod, setPaymentMethod] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);

  function onRemove(id: number) {
    executeRemoveCard({
      input: id,
    });
  }
  function onMakeDefault(id: number) {
    setDefaultCard({
      input: id,
    });
  }

  const getPaymentMethodsData = async () => {};

  return (
    <>
      <div className="flex justify-between items-center w-full md:w-3/4">
        <div className="w-full md:w-3/4">
          <Elements stripe={loadStripe(config.stripeKey || "")}>
            <BillingNew
              data={getAllCards}
              onMakeDefault={onMakeDefault}
              onRemove={onRemove}
            />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
