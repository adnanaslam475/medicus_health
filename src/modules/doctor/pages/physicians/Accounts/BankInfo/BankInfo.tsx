import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormInstance, notification, Steps } from "antd";
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

  // pointer

  const [
    { data: tosData, fetching: tosFetching },
    executeUseOnboardingTosAcceptanceMutation,
  ] = useOnboardingTosAcceptanceMutation();
  const [
    { data: userData, fetching: userDataLoading },
    executeUseGetUserQuery,
  ] = useGetUserQuery({
    // variables: { input: Number(doctorId) },
    // pause: doctorId === undefined,
    variables: { input: Number(id) },
    pause: id === undefined,
  });
  const { tos_acceptance } = userData?.user || {};

  console.log("tos_acceptance", tos_acceptance);
  // Stripe connect account Function
  const [
    { data: onBoardingData, fetching: onBoardingFetching },
    executeUseGetOnboardingAccountLinkMutation,
  ] = useGetOnboardingAccountLinkMutation();
  // endpointer
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
    handleDefault();
  }, [tos_acceptance, billingMethods?.id]);

  useEffect(() => {
    if (billingMethods?.id) {
      setShowForm(false);
      setStepNumber(3);
    } else {
      setShowForm(true);
    }
  }, [billingMethods?.id]);

  async function onAddPayment(values: {
    bankName: string;
    accountTitle: string;
    bankAccountNumber: string;
    routingNumber: string;
  }) {
    console.log("onAddPayment", onAddPayment);
    if (stepNumber >= 2) {
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
          setStepNumber(3);
          // setShowForm(true);
          notification.success({
            message: "Card saved successfully",
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
  // pointer
  function handleDefault() {
    if (tos_acceptance) {
      setStepNumber(1);
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
          // doctorId: Number(doctorId),
          doctorId: Number(id),
        })
          .then((mutationResponse) => {
            executeUseGetUserQuery({ requestPolicy: "network-only" });
            setTosLoading(false);
            notification.success({
              message: "Successfully accepted Terms for Stripe",
            });
            setTosLoading(false);
            setStepNumber(1);
          })
          .catch((mutationError) => {
            setTosLoading(false);
          });
      });
  };

  const HandleOnBoarding = async () => {
    if (stepNumber >= 1) {
      setStepNumber(2);
      const { data } = await executeUseGetOnboardingAccountLinkMutation({
        doctorId: Number(id),
      });
      const url = data?.getOnboardingAccountLink?.url;
      if (url?.length) {
        window.open(String(url), "_blank");
      }
    } else {
      notification.warning({
        message: "Kindly Complete Step 1",
      });
    }
  };
  console.log("billingMethods", billingMethods);
  // Endpointer
  return (
    <div className="w-full pb-10">
      {isCreateMode && (
        <>
          <Steps
            direction="vertical"
            current={stepNumber}
            items={[
              {
                title: "STEP-1",
                description: (
                  <div>
                    <div>Accept Terms and Condition</div>
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
              },
              {
                title: "STEP-2",
                description: (
                  <div>
                    <div>Create Stripe Connect Account</div>
                    <Button
                      type="default"
                      className={`${_classes["edit-button"]}  ${
                        isChrome && "antCustomBtn"
                      }`}
                      onClick={HandleOnBoarding}
                      loading={onBoardingFetching}
                    >
                      Stripe connect account
                    </Button>
                  </div>
                ),
              },
              {
                title: "STEP-3",
                description: (
                  <div>
                    <div>Add Your bank Info</div>
                    <AddPaymentForm
                      ref={formRef}
                      loading={fetching}
                      onFinish={onAddPayment}
                    />
                  </div>
                ),
              },
            ]}
          />
          {/* <div className="flex-grow">
              <div className="flex-col  justify-center items-center ">
                <div>
                  <Button
                    type="default"
                    className={`${_classes["edit-button"]}  ${
                      isChrome && "antCustomBtn"
                    }`}
                    onClick={HandleTOS}
                    loading={tosLoading || tosFetching || userDataLoading}
                  >
                    Accept TOS
                  </Button>
                </div>
                <div>
                  <Button
                    type="default"
                    className={`${_classes["edit-button"]}  ${
                      isChrome && "antCustomBtn"
                    }`}
                    onClick={HandleOnBoarding}
                    loading={onBoardingFetching}
                  >
                    Stripe connect account
                  </Button>
                </div>
                <AddPaymentForm
                  ref={formRef}
                  loading={fetching}
                  onFinish={onAddPayment}
                />
              </div>
            </div> */}
        </>
      )}
      {!isCreateMode && (
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
      )}

      {isCreateMode && (
        <div className=" bg-white    border-t border-gray-4  items-center flex justify-end ">
          <Form.Item className="">
            <div className="items-center  -mb-5 mt-2  ">
              <Button
                onClick={() => formRef.current?.submit()}
                type="primary"
                htmlType="submit"
                className={`${isChrome && "antCustomBtn"}`}
                className={`${isChrome && "antCustomBtn"}`}
                loading={fetching}
              >
                Save changes
              </Button>
            </div>
          </Form.Item>
        </div>
      )}
    </div>
  );
}

export default BankInfo;
