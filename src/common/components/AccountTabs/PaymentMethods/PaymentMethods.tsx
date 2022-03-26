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

const { Panel } = Collapse;
const stripePromise = loadStripe(config.stripeKey || "");

type Props = {
  onRemove: () => void;
  onMakeDefault: () => void;
};

const PaymentMethods = () => {
  // CREATE CARDS API CALL
  // const [{ data: { createCard } = {} }] = useCreateCardMutation();
  const [{ data: createCardsData }] = useCreateCardMutation();
  const { createCard } = createCardsData || {};
  // const { createCard: createCard } = data || {};
  // console.log(data, "card created");

  // GET ALL CARDS API CALL
  // const [{ data: { getAllCards } = {} }] = useGetAllCardsQuery();
  // const { getAllCards } = data || {};
  // console.log(data, "allCards");

  // GET ALL CARDS API CALL
  const [{ data: allCardsData }] = useGetAllCardsQuery();
  const { getAllCards } = allCardsData || {};
  // console.log(data, "allCards");

  // REMOVE  CARDS API CALL
  const [{ data: removeCardData }, executeRemoveCard] = useRemoveCardMutation();
  const { removeCard } = removeCardData || {};
  // console.log(data, "card removed");

  // DEFAULT CARD SET API CALL
  const [{ data: DefaultCardData }] = useDefaultCardMutation();
  const { setAsDefaultCard } = DefaultCardData || {};
  // const [{ data:  dafaultCardData }] ] = useDefaultCardMutation();
  // const { dafaultCard: setAsDefault } = data || {};

  // Modal Event Trigger

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
  function onRemove(id) {
    debugger;
    executeRemoveCard({
      input: id,
    });
  }
  function onMakeDefault() {
    debugger;
  }
  return (
    <>
      <div className="flex justify-between items-center w-full md:w-3/4">
        <div className="w-3/4 p-3">
          <Elements stripe={loadStripe(config.stripeKey || "")}>
            <BillingNew
              // data={paymentMethod}
              data={getAllCards}
              // loading={paymentLoading}
              onMakeDefault={onMakeDefault}
              onRemove={onRemove}
              // onSubmit={(token) => {
              //   addMorePaymentService(token);
              // }}
            />
          </Elements>

          <div className="mb-5 bg-gray-4">
            <Collapse
              defaultActiveKey={["1"]}
              expandIconPosition="right"
              className="bg-primary-1 mb-3 w-full"
            >
              <Panel header={<PaymentHeader />} key="1" className="bg-gray-4">
                <BillingItem />
              </Panel>
            </Collapse>
          </div>

          {/* <Collapse
            defaultActiveKey={["2"]}
            expandIconPosition="right"
            className="bg-primary-1 mb-3 w-full mt-5"
          >
            <Panel header={<PaymentHeader2 />} key="2" className="bg-primary-1">
              <BillingItem />
            </Panel>
          </Collapse> */}

          <Button
            type="default"
            onClick={showModal}
            icon={<PlusOutlined />}
            className="text-primary mt-5"
          >
            Add Payment Method
          </Button>

          <Modal
            title="Add Payment Method"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
