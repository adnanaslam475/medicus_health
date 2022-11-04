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
import { Button, notification, Tooltip } from "antd";
import ConfirmationModal from "common/components/ConfirmationModal/ConfirmationModal";
import { currencyFormatter } from "common/utils/date";
import { getUserData } from "common/utils/userData";
import { GraphQLError } from "graphql";
import Router from "next/router";
import React from "react";
import {
  Appointment,
  AppointmentPriceResponse,
  useBookAppointmentMutation,
  useCancelAppointmentByPatientMutation,
  useCreateCardMutation,
  useGetAllCardsQuery,
  useGetAppointmentsReminderBannerQuery,
  usePatientHealthHistoryQuery,
  useReBookAppointmentMutation,
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
  appointmentDetails?: Appointment | undefined;
  totalAppointmentCharges: number | undefined | null;
};

function AppointmentModalFooter({
  onNext,
  onPrevious,
  onRequestAppointment,
  setCurrentStepName,
  stepName,
  appointmentId,
  onReject,
  appointmentDetails,
  totalAppointmentCharges,
}: Props) {
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState<boolean>(false);

  const [localStripeLoading, setLocalStripeLoading] = React.useState(false);
  // CANCEL Appointment By Patient API CALL
  const [
    { data: cancelAppointmentByPatientData, fetching: cancelFetching },
    executeCancelAppointmentByPatientData,
  ] = useCancelAppointmentByPatientMutation();
  const { cancelAppointmentByPatient } = cancelAppointmentByPatientData || {};
  const [{ fetching: createCardFetching }, executeCardMutation] =
    useCreateCardMutation();
  const { data: contextData } = useAppointmentModal();
  const [
    { data: bookAppointment, fetching: paymentFetching },
    executeBookAppointmentMutation,
  ] = useBookAppointmentMutation();

  const stripe = useStripe();
  const elements = useElements();

  const [{}, executeGetAppointmentsReminderBannerQuery] =
    useGetAppointmentsReminderBannerQuery();

  // GET ALL CARDS API CALL
  const [{ data: getAllCardsData }, executeGetAllCardsQuery] =
    useGetAllCardsQuery({
      variables: { userId: getUserData()?.user?.id as number },
    });

  async function onRejectAppointment(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number | undefined
  ) {
    if (!appointmentDetails?.appointmentTimeSlots?.length) return null;
    try {
      const res = await executeCancelAppointmentByPatientData({
        id: Number(id),
      });
      if (res?.data?.cancelAppointmentByPatient) {
        notification.success({
          message: "Appointment canceled",
        });
        setShowConfirmationModal(false);
      } else if (res?.error?.graphQLErrors) {
        setShowConfirmationModal(false);
        let graphQLError = res?.error?.graphQLErrors[0]?.extensions
          ?.response as GraphQLError;
        let customError = res?.error?.graphQLErrors[0]?.extensions
          ?.exception as GraphQLError;
        let errorMessage =
          graphQLError?.message ||
          customError?.message ||
          "Something went wrong";

        notification.error({
          message: errorMessage,
        });
      }
      onReject?.(e);
    } catch (error) {
      console.log(error);
    }
  }

  const [
    { data: rebookAppointmentData, fetching },
    executeUseReBookAppointmentMutation,
  ] = useReBookAppointmentMutation();

  async function onFinalizeTransaction() {
    const selectedSlotId = contextData?.stepOne?.selectedSlotId;
    const appointmentId = appointmentDetails?.id;
    if (!appointmentDetails?.appointmentTimeSlots?.length) return null;
    try {
      const res = await executeUseReBookAppointmentMutation({
        rebookAppointmentInput: {
          appointmentId: Number(appointmentId),
          selectedSlotId: selectedSlotId,
        },
      });
      if (res?.data) {
        // notification.success({
        //   message: "Appointment Rescheduled Successfully",
        // });
        onNext();
      } else if (res?.error?.graphQLErrors) {
        let graphQLError = res?.error?.graphQLErrors[0]?.extensions
          ?.response as GraphQLError;
        let customError = res?.error?.graphQLErrors[0]?.extensions
          ?.exception as GraphQLError;
        let errorMessage =
          graphQLError?.message ||
          customError?.message ||
          "Something went wrong";
        notification.error({
          message: errorMessage,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onPay(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number | undefined
  ) {
    const { data: bookData, error } = await executeBookAppointmentMutation({
      bookAppointmentInput: {
        appointmentId: appointmentId as number,
        cardId: contextData.stepTwo.cardId as number,
        // requestedDate: contextData.stepOne?.requestedDate,
        selectedSlotId: contextData.stepOne?.selectedSlotId,
        scheduleId: contextData.stepOne?.scheduleId,
      },
    });
    if (bookData?.bookAppointment.status === "Confirmed") {
      setCurrentStepName("stepFour");

      executeGetAppointmentsReminderBannerQuery({
        requestPolicy: "network-only",
      });
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
      setLocalStripeLoading(true);
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
          card_holder_name: "",
          currency: String(source?.currency),
          country: String(source?.card?.country),
        },
      });

      const { data: bookData, error: appointmentBookingError } =
        await executeBookAppointmentMutation({
          bookAppointmentInput: {
            appointmentId: appointmentId as number,
            cardId: data?.createCard.id as number,
            // requestedDate: contextData.stepOne?.requestedDate,
            selectedSlotId: contextData.stepOne?.selectedSlotId,
            scheduleId: contextData.stepOne?.scheduleId,
          },
        });

      if (bookData?.bookAppointment.status === "Confirmed") {
        setCurrentStepName("stepFour");
        executeGetAppointmentsReminderBannerQuery({
          requestPolicy: "network-only",
        });
      } else if (appointmentBookingError) {
        let graphQLError = appointmentBookingError?.graphQLErrors[0]?.extensions
          ?.response as GraphQLError;
        let customError = appointmentBookingError?.graphQLErrors[0]?.extensions
          ?.exception as GraphQLError;
        let errorMessage =
          graphQLError?.message ||
          customError?.message ||
          error?.message ||
          "Something went wrong";
        notification.error({
          message: errorMessage,
        });
      }
      // executeGetAllCardsQuery({ requestPolicy: "network-only" });
      setLocalStripeLoading(false);
    } catch (error) {
      onReject?.(e);
    }
  }

  const paymentStatus = appointmentDetails?.transaction?.status;
  return (
    <div>
      {stepName === "stepOne" && (
        <div className="flex justify-center gap-2">
          <Button
            danger
            className="border border-red outline w-full"
            onClick={() => setShowConfirmationModal(true)}
            disabled={
              paymentStatus !== "succeeded" &&
              !appointmentDetails?.appointmentTimeSlots?.length
            }
          >
            Reject
          </Button>
          <Button
            type="primary"
            className={`${_classes["button-background-color"]}  w-full`}
            onClick={
              paymentStatus === "succeeded" ? onFinalizeTransaction : onNext
            }
            disabled={
              paymentStatus !== "succeeded" &&
              !appointmentDetails?.appointmentTimeSlots?.length
            }
          >
            {paymentStatus === "succeeded" ? "Submit" : "Proceed to payment"}
          </Button>
          <ConfirmationModal
            visible={showConfirmationModal}
            confirmLoading={cancelFetching}
            onCancel={() => setShowConfirmationModal(false)}
            onOk={(e) => {
              onRejectAppointment(e, appointmentId);
            }}
            message="Are you sure you want to reject appointment?"
          />
        </div>
      )}
      {stepName == "stepTwo" && (
        <div className="flex justify-between ">
          <div
            className="flex items-center text-primary cursor-pointer"
            onClick={onNext}
          >
            <PlusOutlined className={`${_classes["icon-color"]}`} />
            <span className="text-primary ml-1">Add payment method</span>
          </div>
          <Tooltip
            title={
              !contextData.stepTwo?.cardId ? "Please add payment method" : ""
            }
          >
            <Button
              type="primary"
              onClick={(e) => {
                onPay(e, appointmentId);
              }}
              // className={`${_classes["button-background-color"]}`}
              disabled={!contextData.stepTwo?.cardId}
              loading={paymentFetching}
            >
              Pay {currencyFormatter(totalAppointmentCharges || 0)}
            </Button>
          </Tooltip>
        </div>
      )}
      {stepName === "stepThree" && (
        <div className="flex justify-between items-center">
          <div
            className="flex items-center text-primary cursor-pointer"
            onClick={onPrevious}
          >
            <LeftOutlined className={`${_classes["icon-color"]}`} />
            <span className="text-primary">Previous</span>
          </div>
          {/* <Button
            type="primary"
            className={`${_classes["button-background-color"]}`}
            onClick={(e) => {
              onAddAndPay(e, appointmentId);
            }}
            loading={localStripeLoading || createCardFetching}
          >
            Pay ${totalAppointmentCharges}
          </Button> */}
        </div>
      )}

      {stepName === "stepFour" && (
        <div className="flex justify-center mt-5">
          <Button
            type="primary"
            onClick={() => Router.push(`/patient/appointments/upcoming`)}
            className={`${_classes["button-background-color"]}`}
          >
            Upcoming appointments
          </Button>
        </div>
      )}
    </div>
  );
}

export default AppointmentModalFooter;
