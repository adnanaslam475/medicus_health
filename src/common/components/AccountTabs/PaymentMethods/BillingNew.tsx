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
    <div className="bg-gray-4 p-5 rounded-md border-primary my-2">
      <div className="flex flex-1 flex-row justify-between items-center">
        <div className="inline-block w-full">
          <div className="flex w-full justify-between">
            <div className="">
              <div className="capitalize text-dark font-bold">{title}</div>
              <div className="text-dark">{description}</div>
            </div>
            {isDefault && (
              <div className="text-primary">
                <Tag color="#30CEC2" className="rounded-full">
                  DEFAULT
                </Tag>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isDefault && (
        <div className="mt-3">
          <span className="text-primary pl-4">
            <Button
              type="link"
              size="small"
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
          </span>
          <Button
            type="link"
            size="small"
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

  const closeModal = () => {
    setModalVisible(false);
  };

  // GET ALL CARDS API CALL
  const [, executeGetAllCardsQuery] = useGetAllCardsQuery({
    variables: { userId: getUserData()?.user?.id as number },
  });

  const [, executeCardMutation] = useCreateCardMutation();

  const handleSubmit = async () => {
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
      console.log({ source });

      const { user } = getUserData();
      await executeCardMutation({
        input: {
          card_digits: Number(source?.card?.last4) || 0,
          card_type: source?.card?.brand || "",
          is_default: false,
          source_id: source?.id as string,
          user_id: user?.id as number,
          exp_month: String(source?.card?.exp_month),
          exp_year: String(source?.card?.exp_month),
        },
      });

      executeGetAllCardsQuery({ requestPolicy: "network-only" });

      if (error) {
        notification.error({
          message: error?.message || "Something went wrong",
        });
      } else {
        await onSubmit(source?.id);
        setModalVisible(false);
        cardElement?.clear();
      }
    } catch (error) {
      setModalVisible(true);
    }
  };

  return (
    <>
      <div className="col-start-1 col-end-8 flex justify-between align-middle px-2 py-3">
        <div className="mb-8 flex flex-col w-full">
          <h5 className="font-medium text-lg mb-4">Payment Methods</h5>
          <div className="flex md:flex-row gap-0 w-full">
            <div className="user-details-list w-full py-3 rounded-lg">
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
          <div className="border  mt-1 mb-3 hover:border-primary  p-3 rounded">
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
          <div className="sm:grid  grid-cols-2 gap-4">
            <div>
              <span className="text-base">CVV*</span>
              <div className="border mt-1 mb-3 p-3 rounded hover:border-primary">
                <CardCvcElement
                  options={{
                    placeholder: "",
                  }}
                />
              </div>
            </div>
            <div>
              <span className="text-base my-2">Expiry*</span>
              <div className="border  mt-1 mb-3  p-3 rounded hover:border-primary">
                <CardExpiryElement />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Form.Item className="mx-2 my-0 gap-4">
              <Button onClick={closeModal}>Cancel</Button>
            </Form.Item>
            <Form.Item className="m-0">
              <Button type="primary" htmlType="submit">
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
