import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormInstance, notification } from "antd";
import {
  DoctorBillingMethod,
  useCreateDoctorBillingMethodMutation,
  useDoctorBillingMethodsQuery,
  useRemoveDoctorBillingMethodMutation,
} from "generated/graphql";
import AddPaymentForm from "./AddPaymentForm";
import { getUserData } from "common/utils/userData";
import { Payment } from "common/components/AccountTabs/PaymentMethods/BillingNew";
import { useStripe } from "@stripe/react-stripe-js";

// scss
import _classes from "./BankInfo.module.scss";

function BankInfo() {
  const stripe = useStripe();
  const [isShowForm, setShowForm] = useState<boolean>(false);
  const formRef = useRef<FormInstance>();
  const [{ fetching }, executeCreateDoctorBillingMethodMutation] =
    useCreateDoctorBillingMethodMutation();

  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

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
      setShowForm(false);
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
    try {
      // @ts-ignore
      const { token } = await stripe?.createToken("bank_account", {
        country: "US",
        currency: "USD",
        routing_number: values.routingNumber,
        account_number: values.bankAccountNumber,
        account_holder_name: values.accountTitle,
        account_holder_type: "individual",
      });
      if (!token) {
        throw new Error("Something went wrong! Please try again.");
      }
      const { error } = await executeCreateDoctorBillingMethodMutation(
        {
          createDoctorBillingMethodInput: {
            ...values,
            doctorId: id as number,
            source: token.id,
            bankId: token.bank_account.id,
            is_default: true,
          },
        },
        { requestPolicy: "network-only" }
      );
      if (error && error?.message) {
        throw new Error(error.message);
      }
      executeDoctorBillingMethodsQuery({
        requestPolicy: "network-only",
      });
      setShowForm(false);
    } catch (error: any) {
      notification.error({
        message: error?.message,
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
        throw new Error(error.message);
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

  return (
    <div className="w-full pb-10">
      {isCreateMode && (
        <AddPaymentForm
          ref={formRef}
          loading={fetching}
          onFinish={onAddPayment}
        />
      )}
      {!isCreateMode && (
        <div>
          <Payment
            title={billingMethods.accountTitle}
            description={`${billingMethods.bankName} - ${billingMethods.bankAccountNumber}`}
            onRemove={() => onRemoveCard(Number(billingMethods.id))}
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
                className=""
                loading={fetching}
              >
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </div>
      )}
    </div>
  );
}

export default BankInfo;
