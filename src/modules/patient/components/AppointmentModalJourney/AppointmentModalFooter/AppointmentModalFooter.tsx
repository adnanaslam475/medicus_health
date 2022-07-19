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
import { getUserData } from "common/utils/userData";
import Router from "next/router";
import React from "react";
import {
  Appointment,
  AppointmentPriceResponse,
  useBookAppointmentMutation,
  useCancelAppointmentByPatientMutation,
  useCreateCardMutation,
  useGetAllCardsQuery,
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

  // GET ALL CARDS API CALL
  const [{ data: getAllCardsData }, executeGetAllCardsQuery] =
    useGetAllCardsQuery({
      variables: { userId: getUserData()?.user?.id as number },
    });

  async function onRejectAppointment(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number | undefined
  ) {
    try {
      const res = await executeCancelAppointmentByPatientData({
        id: Number(id),
      });
      if (res?.data?.cancelAppointmentByPatient) {
        notification.success({
          message: "Appointment Cancelled",
        });
        setShowConfirmationModal(false);
      } else {
        notification.error({
          message: "Something went wrong",
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
      } else {
        notification.error({
          message: "Something went wrong",
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
          card_holder_name: "",
        },
      });

      const { data: bookData } = await executeBookAppointmentMutation({
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

  const paymentStatus = appointmentDetails?.transaction?.status;
  return (
    <div>
      {stepName === "stepOne" && (
        <div className="flex justify-end gap-2">
          <Button
            danger
            className="border border-red outline"
            onClick={() => setShowConfirmationModal(true)}
          >
            Reject
          </Button>
          <Button
            type="primary"
            className={`${_classes["button-background-color"]}`}
            onClick={
              paymentStatus === "succeeded" ? onFinalizeTransaction : onNext
            }
          >
            {paymentStatus === "succeeded" ? "Submit" : "Proceed To Payment"}
          </Button>
          <ConfirmationModal
            visible={showConfirmationModal}
            confirmLoading={cancelFetching}
            onCancel={() => setShowConfirmationModal(false)}
            onOk={(e) => {
              onRejectAppointment(e, appointmentId);
            }}
            message="Are you sure you want to Cancel Appointment?"
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
            <span className="text-primary">Add Payment Method</span>
          </div>
          <Tooltip
            title={
              !contextData.stepTwo?.cardId ? "please add payment method" : ""
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
              Pay ${totalAppointmentCharges}
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
          <Button
            type="primary"
            className={`${_classes["button-background-color"]}`}
            onClick={(e) => {
              onAddAndPay(e, appointmentId);
            }}
            loading={createCardFetching}
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
