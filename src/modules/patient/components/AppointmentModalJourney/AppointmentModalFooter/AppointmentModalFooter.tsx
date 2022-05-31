import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  CreateSourceData,
  StripeCardNumberElement,
  StripeElement,
} from "@stripe/stripe-js";
import { Button, notification } from "antd";
import { getUserData } from "common/utils/userData";
import Router from "next/router";
// import { StringValueNode } from "graphql";
import React, { useState } from "react";
import {
  useBookAppointmentMutation,
  useCancelAppointmentByPatientMutation,
  useCreateCardMutation,
  useGetAllCardsQuery,
} from "../../../../../generated/graphql";
import { useAppointmentModal } from "../AppointmentModalProvider";
import _classes from "../AppointmentReschedule/AppointmentReschedule.module.scss";

type Props = {
  onNext: () => void;
  onPrevious: () => void;
  onRequestAppointment: () => void;
  stepName: string;
  setCurrentStepName: (param: string) => void;
  appointmentId: number | undefined;
  onReject?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

function AppointmentModalFooter({
  onNext,
  onPrevious,
  onRequestAppointment,
  setCurrentStepName,
  stepName,
  appointmentId,
  onReject,
}: Props) {
  // CANCEL Appointment By Patient API CALL
  const [
    { data: cancelAppointmentByPatientData },
    executeCancelAppointmentByPatientData,
  ] = useCancelAppointmentByPatientMutation();
  const { cancelAppointmentByPatient } = cancelAppointmentByPatientData || {};
  const [, executeCardMutation] = useCreateCardMutation();
  const { data: contextData } = useAppointmentModal();
  const [{ data: bookAppointment }, executeBookAppointmentMutation] =
    useBookAppointmentMutation();

  const stripe = useStripe();
  const elements = useElements();

  // GET ALL CARDS API CALL
  const [{ data: getAllCardsData }, executeGetAllCardsQuery] =
    useGetAllCardsQuery({
      variables: { userId: getUserData()?.user?.id as number },
    });

  function onRejectAppointment(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number | undefined
  ) {
    executeCancelAppointmentByPatientData({
      id: Number(id),
    });
    onReject?.(e);
  }

  async function onPay(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number | undefined
  ) {
    const { data: bookData, error } = await executeBookAppointmentMutation({
      bookAppointmentInput: {
        appointmentId: appointmentId as number,
        cardId: contextData.stepTwo.cardId as number,
        requestedDate: contextData.stepOne?.requestedDate,
        selectedSlotId: contextData.stepOne?.selectedSlotId,
        scheduleId: contextData.stepOne?.scheduleId,
        adminSettingId:123
      },
    });
    if (bookData?.bookAppointment.status === "Confirmed") {
      setCurrentStepName("stepFour");
    } else {
      notification.error({
        message:
          (error && error.message.split("]")[1]) || "Something went wrong",
      });
    }
  }

  async function onAddAndPay(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number | undefined
  ) {
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
      const { data } = await executeCardMutation({
        input: {
          card_digits: Number(source?.card?.last4) || 0,
          card_type: source?.card?.brand || "",
          is_default: getAllCardsData?.getAllCards.length === 0,
          source_id: source?.id as string,
          user_id: user?.id as number,
          exp_month: String(source?.card?.exp_month),
          exp_year: String(source?.card?.exp_year),
        },
      });

      const { data: bookData } = await executeBookAppointmentMutation({
        bookAppointmentInput: {
          appointmentId: appointmentId as number,
          cardId: data?.createCard.id as number,
          requestedDate: contextData.stepOne?.requestedDate,
          selectedSlotId: contextData.stepOne?.selectedSlotId,
          scheduleId: contextData.stepOne?.scheduleId,
          adminSettingId:123
        },
      });

      console.log(bookData);
      if (bookData?.bookAppointment.status === "Confirmed") {
        setCurrentStepName("stepFour");
      } else {
        notification.error({
          message: "Something went wrong",
        });
      }
      // executeGetAllCardsQuery({ requestPolicy: "network-only" });

      if (error) {
        notification.error({
          message: error?.message || "Something went wrong",
        });
      }
    } catch (error) {
      onReject?.(e);
    }
  }

  return (
    <div>
      {stepName === "stepOne" && (
        <div className="flex justify-end gap-2">
          <Button
            danger
            className="border border-red outline"
            onClick={(e) => {
              onRejectAppointment(e, appointmentId);
            }}
          >
            Reject
          </Button>
          <Button
            type="primary"
            className={`${_classes["button-background-color"]}`}
            onClick={onNext}
          >
            Proceed To Payment
          </Button>
        </div>
      )}
      {stepName == "stepTwo" && (
        <div className="flex justify-between ">
          <div className="flex items-center text-primary" onClick={onNext}>
            <PlusOutlined className={`${_classes["icon-color"]}`} />
            <span className="text-primary">Add Payment Method</span>
          </div>
          <Button
            type="primary"
            onClick={(e) => {
              onPay(e, appointmentId);
            }}
            className={`${_classes["button-background-color"]}`}
          >
            Pay ${contextData?.stepOne?.charges}
          </Button>
        </div>
      )}
      {stepName === "stepThree" && (
        <div className="flex justify-between items-center">
          <div className="flex items-center text-primary" onClick={onPrevious}>
            <LeftOutlined className={`${_classes["icon-color"]}`} />
            <span className="text-primary">Previous</span>
          </div>
          <Button
            type="primary"
            className={`${_classes["button-background-color"]}`}
            onClick={(e) => {
              onAddAndPay(e, appointmentId);
            }}
          >
            Pay ${contextData?.stepOne?.charges}
          </Button>
        </div>
      )}

      {stepName === "stepFour" && (
        <div className="flex justify-center mt-5">
          <Button
            type="primary"
            onClick={() => Router.push(`/patient/appointments/upcoming`)}
            className={`${_classes["button-background-color"]}`}
          >
            Upcoming Appointments
          </Button>
        </div>
      )}
    </div>
  );
}

export default AppointmentModalFooter;
