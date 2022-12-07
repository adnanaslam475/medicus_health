import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormInstance, notification, Steps, Tooltip } from "antd";
import {
  DoctorBillingMethod,
  useCreateDoctorBillingMethodMutation,
  useDoctorBillingMethodsQuery,
  useGetOnboardingAccountLinkMutation,
  useGetUserQuery,
  useOnboardingTosAcceptanceMutation,
  useRemoveDoctorBillingMethodMutation,
} from "generated/graphql";
import AddPaymentForm from "./AddPaymentForm";
import { getUserData } from "common/utils/userData";
import { Payment } from "common/components/AccountTabs/PaymentMethods/BillingNew";
import { useStripe } from "@stripe/react-stripe-js";

// scss
import _classes from "./BankInfo.module.scss";
import { isChrome } from "utils/helper";
import { CheckCircleFilled, CheckOutlined } from "@ant-design/icons";

function BankInfo() {
  const stripe = useStripe();
  const [isShowForm, setShowForm] = useState<boolean>(false);
  const formRef = useRef<FormInstance>();
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [tosLoading, setTosLoading] = useState<boolean>(false);
  const [{ fetching }, executeCreateDoctorBillingMethodMutation] =
    useCreateDoctorBillingMethodMutation();

  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  const [
    { data: tosData, fetching: tosFetching },
    executeUseOnboardingTosAcceptanceMutation,
  ] = useOnboardingTosAcceptanceMutation();
  const [
    { data: userData, fetching: userDataLoading },
    executeUseGetUserQuery,
  ] = useGetUserQuery({
    variables: { input: Number(id) },
    pause: id === undefined,
  });
  const { tos_acceptance } = userData?.user || {};
  const { connect_details_submitted } = userData?.user?.doctorProfile || {};

  const [
    { data: onBoardingData, fetching: onBoardingFetching },
    executeUseGetOnboardingAccountLinkMutation,
  ] = useGetOnboardingAccountLinkMutation();
  const [, executeRemoveDoctorBillingMethodMutation] =
    useRemoveDoctorBillingMethodMutation();

  const [
    { data, fetching: billingQueryFetching },
    executeDoctorBillingMethodsQuery,
  ] = useDoctorBillingMethodsQuery({
    variables: {
      doctorId: id as number,
    },
  });

  const { doctorBillingMethods } = data || {};
  const billingMethods: DoctorBillingMethod =
    (doctorBillingMethods?.[0] as DoctorBillingMethod) || {};

  useEffect(() => {
    if (billingMethods?.id) {
      setShowForm(true);
      setStepNumber(0);
    } else {
      setShowForm(false);
    }
    handleDefault();
  }, [tos_acceptance, connect_details_submitted, userData, billingMethods?.id]);

  async function onAddPayment(values: {
    bankName: string;
    accountTitle: string;
    bankAccountNumber: string;
    routingNumber: string;
  }) {
    if (stepNumber >= 1) {
      try {
        const stripeResponse = await stripe?.createToken("bank_account", {
          country: "US",
          currency: "USD",
          routing_number: values.routingNumber,
          account_number: values.bankAccountNumber,
          account_holder_name: values.accountTitle,
          account_holder_type: "individual",
        });
        const token = stripeResponse?.token;
        if (stripeResponse?.error?.message) {
          return notification.error({
            message: stripeResponse?.error?.message,
          });
        }
        if (token?.bank_account) {
          const { error } = await executeCreateDoctorBillingMethodMutation(
            {
              createDoctorBillingMethodInput: {
                ...values,
                doctorId: id as number,
                source: token.id,
                bankId: token?.bank_account?.id,
                is_default: true,
              },
            },
            { requestPolicy: "network-only" }
          );
          if (error && error?.message) {
            throw new Error(error.message.replace("[GraphQL]", ""));
          }
          executeDoctorBillingMethodsQuery({
            requestPolicy: "network-only",
          });
          setStepNumber(2);
          notification.success({
            message: "Bank information saved successfully",
          });
        }
      } catch (error: any) {
        notification.error({
          message: error?.message,
        });
      }
    } else {
      notification.warn({
        message: "Kindly Complete Step 2",
      });
    }
  }

  async function onRemoveCard(id: number) {
    try {
      const { error } = await executeRemoveDoctorBillingMethodMutation({
        id,
      });
      setShowForm(true);
      if (error && error?.message) {
        throw new Error(error.message.replace("[GraphQL]", ""));
      }
    } catch (error: any) {
      notification.error({
        message: error?.message,
      });
    }
  }

  if (billingQueryFetching) {
    return null;
  }

  const isCreateMode = isShowForm;
  function handleDefault() {
    if (tos_acceptance) {
      setStepNumber(1);
      if (billingMethods?.id) {
        setStepNumber(2);
        if (connect_details_submitted) {
          setStepNumber(3);
        }
      }
    }
    return;
  }

  const HandleTOS = () => {
    setTosLoading(true);
    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => {
        executeUseOnboardingTosAcceptanceMutation({
          ip: data?.IPv4,
          doctorId: Number(id),
        })
          .then((mutationResponse) => {
            executeUseGetUserQuery({ requestPolicy: "network-only" });
            setTosLoading(false);
            notification.success({
              message: "Successfully accepted Terms for Stripe",
            });
            setTosLoading(false);
          })
          .catch((mutationError) => {
            setTosLoading(false);
          });
      });
  };

  const HandleOnBoarding = async () => {
    if (stepNumber >= 2) {
      const { data } = await executeUseGetOnboardingAccountLinkMutation({
        doctorId: Number(id),
      });
      const url = data?.getOnboardingAccountLink?.url;
      if (url?.length) {
        window.open(String(url), "_blank");
      }
    } else {
      notification.warning({
        message: "Kindly Complete Step 2 first",
      });
    }
  };
  return (
    <div className="w-full pb-10">
      <>
        <Steps
          direction="vertical"
          current={stepNumber}
          items={[
            {
              title: "STEP-1",
              description: (
                <div>
                  <br />
                  <Button
                    type="default"
                    className={` ${isChrome && "antCustomBtn"}`}
                    onClick={HandleTOS}
                    loading={tosLoading || tosFetching || userDataLoading}
                    disabled={tos_acceptance}
                  >
                    Accept TOS
                  </Button>
                </div>
              ),

              icon: tos_acceptance && (
                <CheckCircleFilled
                  className=" text-4xl "
                  style={{ color: "#77c926" }}
                />
              ),
              subTitle: "Accept Terms and Condition",
            },
            {
              title: "STEP-2",
              description: (
                <div>
                  <br />
                  {isCreateMode ? (
                    <div>
                      <Payment
                        title={billingMethods.accountTitle}
                        description={`${billingMethods.bankName} - ${billingMethods.bankAccountNumber}`}
                        onRemove={() => {
                          return onRemoveCard(Number(billingMethods.doctorId));
                        }}
                        showRemoveBtn={false}
                      />
                    </div>
                  ) : (
                    <>
                      <AddPaymentForm
                        ref={formRef}
                        loading={fetching}
                        onFinish={onAddPayment}
                      />
                      <div className=" bg-white    border-t border-gray-4  items-center flex justify-end ">
                        <Form.Item className="">
                          <div className="items-center  -mb-5 mt-2  ">
                            <Tooltip
                              title={
                                !tos_acceptance &&
                                "Kindly Complete the Above Step"
                              }
                            >
                              {" "}
                              <Button
                                onClick={() => formRef.current?.submit()}
                                type="primary"
                                htmlType="submit"
                                className={`${isChrome && "antCustomBtn"}`}
                                loading={fetching}
                                disabled={!tos_acceptance}
                              >
                                Save changes
                              </Button>
                            </Tooltip>
                          </div>
                        </Form.Item>
                      </div>
                    </>
                  )}
                </div>
              ),
              subTitle: "Add Your bank Info",
              icon: isCreateMode && (
                <CheckCircleFilled
                  className=" text-4xl "
                  style={{ color: "#77c926" }}
                />
              ),
            },
            {
              title: "STEP-3",
              description: (
                <div>
                  <br />
                  <Tooltip
                    title={!isCreateMode && "Kindly Complete the Above Steps"}
                  >
                    <Button
                      type="default"
                      className={`${_classes["edit-button"]}  ${
                        isChrome && "antCustomBtn"
                      }`}
                      onClick={HandleOnBoarding}
                      loading={onBoardingFetching}
                      disabled={!isCreateMode}
                    >
                      Stripe connect account
                    </Button>{" "}
                  </Tooltip>
                </div>
              ),
              subTitle: "Create Stripe Connect Account",
              icon: connect_details_submitted && (
                <CheckCircleFilled
                  className=" text-4xl "
                  style={{ color: "#77c926" }}
                />
              ),
            },
          ]}
        />
      </>
      {/* {isCreateMode && (
        <div className=" bg-white    border-t border-gray-4  items-center flex justify-end ">
          <Form.Item className="">
            <div className="items-center  -mb-5 mt-2  ">
              <Button
                onClick={() => formRef.current?.submit()}
                type="primary"
                htmlType="submit"
                className={`${isChrome && "antCustomBtn"}`}
                loading={fetching}
                disabled={!connect_details_submitted}
              >
                Save changes
              </Button>
            </div>
          </Form.Item>
        </div>
      )} */}
    </div>
  );
}

export default BankInfo;
