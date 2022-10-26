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
import {
  useCreateCardMutation,
  useGetAllCardsQuery,
  UserCard,
} from "../../../../generated/graphql";
import { getUserData } from "../../../utils/userData";
import { CreateSourceData, StripeElement } from "@stripe/stripe-js";
import _classes from "./StripeCard.module.scss";
import { GraphQLError } from "graphql";
import { isChrome } from "utils/helper";

type Props = {
  title: string;
  description: string;
  isDefault: boolean;
  onRemove?: (() => void) | undefined;
  onMakeDefault?: (() => void) | undefined;
};
export const Payment = (props: Props) => {
  const { title, description, isDefault, onRemove, onMakeDefault } = props;

  return (
    <div
      className={`${_classes["stripeCard"]} bg-gray-4 p-5 rounded-md border-primary mb-4`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-dark font-medium pb-0 mb-0">
            <h6 className="text-md mb-0 pb-0">{title}</h6>
          </div>
          <div className="text-dark font-normal pb-0 mb-0">
            <p className="text-sm mb-0 pb-0 text-secondary ">{description}</p>
          </div>
        </div>
        <div>{isDefault && <Tag>Default</Tag>}</div>
      </div>
      {!isDefault && (
        <div className={`${_classes["btn-stripe-card"]} mt-3 flex gap-2`}>
          {onMakeDefault && (
            <Button
              type="link"
              size="small"
              className={`text-primary p-0 ${isChrome && 'antCustomBtn'}`}
              onClick={() => {
                Modal.confirm({
                  content: "Do you want to make this card default?",
                  okText: "Yes",
                  onOk() {
                    onMakeDefault?.();
                  },
                  onCancel() {},
                });
              }}
            >
              <p className="text-sm pb-0 mb-0"> Make default</p>
            </Button>
          )}
          <Button
            type="link"
            size="small"
            className={`text-red-2 p-0 text-sm ${isChrome && 'antCustomBtn'}`}
            onClick={() => {
              Modal.confirm({
                content: "Do you want to remove this card?",
                okText: "Remove",
                onOk() {
                  onRemove?.();
                },
                onCancel() {},
              });
            }}
          >
            <p className="text-red-2 text-sm pb-0 mb-0"> Remove</p>
          </Button>
        </div>
      )}
    </div>
  );
};

Payment.defaultProps = {
  title: "Visa ending with ****",
  description: "MM/YYYY",
  isDefault: false,
  // onRemove: () => {},
  // onMakeDefault: () => {},
};

type propsBilling = {
  data: UserCard[] | any;
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
  const [formInstance] = Form.useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [cardNumber, setCardNumber] = useState<boolean | undefined>();
  const [cvv, setCvv] = useState<boolean | undefined>();
  const [cardExpiry, setCardExpiry] = useState<boolean | undefined>();
  const closeModal = () => {
    formInstance.resetFields();
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

      const { source, error } =
        (await stripe?.createSource(
          cardElement as StripeElement,
          {} as CreateSourceData
        )) || {};

      const { user } = getUserData();
      const res = await executeCardMutation({
        input: {
          card_digits: Number(source?.card?.last4) || 0,
          card_type: source?.card?.brand || "",
          is_default: data?.length === 0,
          source_id: source?.id as string,
          user_id: user?.id as number,
          exp_month: String(source?.card?.exp_month),
          exp_year: String(source?.card?.exp_year),
          card_holder_name: "",
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
        if (res?.error) {
          let graphQLError = res?.error?.graphQLErrors[0]?.extensions
            ?.response as GraphQLError;
          let customError = res?.error?.graphQLErrors[0]?.extensions
            ?.exception as GraphQLError;
          let errorGraphQLMessage = res?.error?.graphQLErrors[0]?.message;
            let errorMessage =
            errorGraphQLMessage ||
            graphQLError?.message ||
            customError?.message ||
            "Something went wrong";
          notification.error({
            message: errorMessage,
          });
        }
      }
    } catch (error) {
      setModalVisible(true);
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="col-start-1 col-end-8 flex justify-between align-middle">
        <div
          className={`${_classes["payment_method_head"]} mb-8 flex flex-col w-full`}
        >
          <h4 className=" text-lg mt-5">Payment methods</h4>
          <div className="flex md:flex-row gap-0 w-full">
            <div className="user-details-list w-full rounded-lg">
              {loading ? (
                <div className="w-full bg-gray-4 rounded-md border-primary my-2 h-20 flex flex-col justify-center items-center">
                  <Space size="middle">
                    <Spin size="small" />
                  </Space>
                </div>
              ) : (
                data.map((card: any) => (
                  <Payment
                    isDefault={card?.is_default}
                    title={`${card?.card_type} ending with ${card?.card_digits}`}
                    description={`Expires on: ${card?.exp_month}/${card?.exp_year}`}
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
                className={`text-primary cursor-pointer ${isChrome && 'antCustomBtn'}`}
                onClick={() => setModalVisible(true)}
              >
                Add payment method
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Add card"
        centered
        visible={modalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={formInstance}
          className=""
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item name="cardnumber">
            <span className="text-base text-secondary my-2">Card number*</span>
            <div className="border border-gray-3 p-3 rounded mb-5 hover:border-primary">
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
                <div className="border border-gray-3 p-3 rounded mb-5 hover:border-primary">
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
                <span className="text-base text-secondary my-2">
                  Expires on*
                </span>
                <div className="border border-gray-3 p-3 rounded mb-5 hover:border-primary">
                  <CardExpiryElement
                    onChange={(e) => setCardExpiry(e?.complete)}
                  />
                </div>
              </div>
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <Button
                onClick={closeModal}
                className={`${_classes["btn-stripe-cancel"]} ${isChrome && 'antCustomBtn'}`}
              >
                Cancel
              </Button>
              <Button
                loading={loadingSubmit}
                disabled={!cardNumber || !cvv || !cardExpiry || loadingSubmit}
                type="primary"
                htmlType="submit"
                className={`ml-4 ${isChrome && 'antCustomBtn'}`}
              >
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
  onSubmit: async () => {},
  loading: false,
};

export default Billing;
