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
import {
  GetAllCardsQuery,
  useCreateCardMutation,
  useGetAllCardsQuery,
  UserCard,
} from "../../../../generated/graphql";
import { getUserData } from "../../../utils/userData";
import { CreateSourceData, StripeElement } from "@stripe/stripe-js";
import _classes from "./StripeCard.module.scss";

type Props = {
  title: string;
  description: string;
  isDefault: boolean;
  onRemove: () => void;
  onMakeDefault: () => void;
};
export const Payment = (props: Props) => {
  const { title, description, isDefault, onRemove, onMakeDefault } = props;
  return (
    <div className={`${_classes["stripeCard"]} bg-gray-4 p-5 rounded-md border-primary mb-4`}>
      <div className="text-md capitalize text-dark font-bold">{title}</div>
      <div className="text-gray-2">{description}</div>
      {isDefault && (
        <div className="mt-3">
          <Tag color="#30CEC2" className={`${_classes["btn-stripe-card "]} rounded-full`}>
            DEFAULT
          </Tag>
        </div>
      )}
      {!isDefault && (
        <div className={`${_classes["btn-stripe-card"]} mt-3`}>
          <Button
            type="link"
            size="small"
            className="text-primary p-0"
            onClick={() => {
              Modal.confirm({
                content: "Do you want to make this card default?",
                okText: "Yes",
                onOk() {
                  onMakeDefault();
                },
                onCancel() {},
              });
            }}
          >
            Make Default
          </Button>
          <Button
            type="link"
            size="small"
            className="text-danger ml-2 p-0"
            danger
            onClick={() => {
              Modal.confirm({
                content: "Do you want to remove this card?",
                okText: "Remove",
                onOk() {
                  onRemove();
                },
                onCancel() {},
              });
            }}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Payment.defaultProps = {
  title: "Visa Ending with ****",
  description: "MM/YYYY",
  isDefault: false,
  onRemove: () => {},
  onMakeDefault: () => {},
};

type propsBilling = {
  data: UserCard[];
  loading: string;
  onSubmit: (id: {} | undefined) => void;
  onRemove: (id: number) => void;
  onMakeDefault: (id: number) => void;
};

function Billing({
  data,
  loading,
  onRemove,
  onMakeDefault,
  onSubmit,
}: propsBilling) {
  const stripe = useStripe();
  const elements = useElements();
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  // GET ALL CARDS API CALL
  const [, executeGetAllCardsQuery] = useGetAllCardsQuery({
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
          is_default: data?.length === 0,
          source_id: source?.id as string,
          user_id: user?.id as number,
          exp_month: String(source?.card?.exp_month),
          exp_year: String(source?.card?.exp_year),
        },
      });

      executeGetAllCardsQuery({ requestPolicy: "network-only" });

      if (error) {
        notification.error({
          message: error?.message || "Something went wrong",
        });
        setLoadingSubmit(false);
      } else {
        await onSubmit(source?.id);
        setModalVisible(false);
        cardElement?.clear();
        setLoadingSubmit(false);
      }
    } catch (error) {
      setModalVisible(true);
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="col-start-1 col-end-8 flex justify-between align-middle">
        <div className="mb-8 flex flex-col w-full">
          <h4 className="font-medium text-lg mt-5">Payment Methods</h4>
          <div className="flex md:flex-row gap-0 w-full">
            <div className="user-details-list w-full rounded-lg">
              {loading ? (
                <div className="w-full bg-gray-4 rounded-md border-primary my-2 h-20 flex flex-col justify-center items-center">
                  <Space size="middle">
                    <Spin size="small" />
                  </Space>
                </div>
              ) : (
                data.map((card) => (
                  <Payment
                    isDefault={card?.is_default}
                    title={`${card?.card_type} Ending with ${card?.card_digits}`}
                    description={`Expires at: ${card?.exp_month}/${card?.exp_year}`}
                    onRemove={() => {
                      onRemove(card?.id);
                    }}
                    onMakeDefault={() => {
                      onMakeDefault(card?.id);
                    }}
                  />
                ))
              )}
              <Button
                icon={<PlusOutlined />}
                className="text-primary"
                onClick={() => setModalVisible(true)}
              >
                Add a Payment Method
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Add Payment Method"
        centered
        visible={modalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form className="" onFinish={handleSubmit} layout="vertical">
          <span className="text-base my-2">Card Number*</span>
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
              <span className="text-base">CVV*</span>
              <div className="border border-gray-3 p-3 rounded mb-5 hover:border-primary">
                <CardCvcElement
                  options={{
                    placeholder: "",
                  }}
                />
              </div>
            </div>
            <div>
              <span className="text-base my-2">Expiry*</span>
              <div className="border border-gray-3 p-3 rounded mb-5 hover:border-primary">
                <CardExpiryElement />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <Button onClick={closeModal}>Cancel</Button>
              <Button loading={loadingSubmit} disabled={loadingSubmit} type="primary" htmlType="submit"  className={`${_classes["btn-stripe-primary"]} ml-4`}>
                Submit
              </Button>            
              </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}

Billing.defaultProps = {
  data: [],
  onRemove: () => {},
  onMakeDefault: () => {},
  onSubmit: async () => {},
  loading: false,
};

export default Billing;
