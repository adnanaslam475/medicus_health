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
import { isChrome } from "utils/helper";

type Props = {
  onPrevious?: () => void;
  setSelectedCardId?: React.Dispatch<React.SetStateAction<undefined | number>>;
};
function MakePaymentMore(props: Props) {
  const { onPrevious } = props || {};
  const stripe = useStripe();
  const elements = useElements();

  // GET ALL CARDS API CALL
  const [{ data: getAllCardsData }, executeGetAllCardsQuery] =
    useGetAllCardsQuery({
      variables: { userId: getUserData()?.user?.id as number },
    });

  const [, executeCardMutation] = useCreateCardMutation();

  const handleSubmit = async () => {
    setLoadingSubmit(true);
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
          is_default: getAllCardsData?.getAllCards.length === 0,
          source_id: source?.id as string,
          user_id: user?.id as number,
          exp_month: String(source?.card?.exp_month),
          exp_year: String(source?.card?.exp_year),
          card_holder_name: "",
          currency: String(source?.currency),
          country: String(source?.card?.country),
        },
      });

      executeGetAllCardsQuery({ requestPolicy: "network-only" });

      if (error) {
        notification.error({
          message: error?.message || "Something went wrong",
        });
        setLoadingSubmit(false);
      } else {
        // await onSubmit(source?.id);
        // setModalVisible(false);
        cardElement?.clear();
        setLoadingSubmit(false);
        setCardNumber(undefined);
        setCardExpiry(undefined);
        setCvv(undefined);
        formInstance.resetFields();
        onPrevious?.();
      }
    } catch (error) {
      // setModalVisible(true);
      setLoadingSubmit(false);
    }
  };
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [cardNumber, setCardNumber] = useState<boolean | undefined>();
  const [cvv, setCvv] = useState<boolean | undefined>();
  const [cardExpiry, setCardExpiry] = useState<boolean | undefined>();
  const [formInstance] = Form.useForm();
  console.log("formvalues are", formInstance.getFieldsValue(), cardNumber);
  return (
    <Form
      className=""
      onFinish={handleSubmit}
      layout="vertical"
      form={formInstance}
    >
      {/* <h1>Add card</h1> */}
      <h1>Add payment method</h1>
      <Form.Item name="cardnumber">
        <span className="text-base text-secondary my-2">Card number*</span>
        <div className="border border-gray-3 p-3 rounded  hover:border-primary">
          <CardNumberElement
            onChange={(e) => setCardNumber(e?.complete)}
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
      </Form.Item>

      <div className="sm:grid grid-cols-2 gap-4">
        <Form.Item name="cvv">
          <div>
            <span className="text-base text-secondary">CVV*</span>
            <div className="border border-gray-3 p-3 rounded  hover:border-primary">
              <CardCvcElement
                onChange={(e) => setCvv(e?.complete)}
                options={{
                  placeholder: "",
                }}
              />
            </div>
          </div>
        </Form.Item>
        <Form.Item name="expires">
          <div>
            <span className="text-base text-secondary my-2">Expires on*</span>
            <div className="border border-gray-3 p-3 rounded  hover:border-primary">
              <CardExpiryElement onChange={(e) => setCardExpiry(e?.complete)} />
            </div>
          </div>
        </Form.Item>
      </div>
      <Button
        loading={loadingSubmit}
        disabled={!cardNumber || !cvv || !cardExpiry || loadingSubmit}
        type="primary"
        htmlType="submit"
        className={`mb-4 ${isChrome && "antCustomBtn"} w-full`}
      >
        Submit
      </Button>
    </Form>
  );
}

export default MakePaymentMore;
