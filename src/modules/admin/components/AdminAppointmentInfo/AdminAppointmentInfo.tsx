import React, { useState } from "react";
import { CloseOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, notification, Tag } from "antd";
import LabelWithText from "common/components/LabelWithText/LabelWithText";

// scss
import _classes from "./AdminAppointmentInfo.module.scss";
import Router, { useRouter } from "next/router";
import {
  useCancelAppointmentByDoctorMutation,
  useRemoveAppointmentByAdminMutation,
} from "generated/graphql";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import ConfirmationModal from "common/components/ConfirmationModal/ConfirmationModal";
import { date } from "common/utils";

type Props = {
  data?: {
    id: string;
    bookingDate: string;
    patient: string;
    physician: string;
    service: string;
    dueDate: string;
    time: string;
    totalAmount: string;
    appointmentStatus: string;
    paymentStatus: string;
    status: string;
  };
  adminApp_Details?: DoctorData;
  onCancelRequestedAppointment?: () => void;
};
type DoctorData = {
  doctor: {
    doctor_Id: number;
    doctor_first_name: string;
    doctor_last_name: string;
  };
  patient: {
    patient_id: number;
  };
};
function AdminAppointmentInfo({ data, adminApp_Details }: Props) {
  const { query } = useRouter();
  const {
    id,
    bookingDate,
    patient,
    physician,
    service,
    dueDate,
    time,
    totalAmount,
    appointmentStatus,
    paymentStatus,
    status,
  } = data || {};

  const [, executeCancelRequestedAppointment] =
    useCancelAppointmentByDoctorMutation();

  async function onCancelRequestedAppointment() {
    try {
      const res = await executeCancelRequestedAppointment({
        id: Number(id),
      });

      if (res?.data?.cancelAppointment) {
        notification.success({
          message: "Appointment Cancelled",
        });
      } else {
        notification.error({
          message: "Something went wrong",
        });
      }
    } catch (error) {}
  }

  // MUTATION FOR DELETE APPOINTMENT

  const [{ fetching: deleteFetching }, removeAppointmentByAdmin] =
    useRemoveAppointmentByAdminMutation();

  const [open, setOpen] = React.useState<boolean>(false);

  const deleteModalHandler = () => setOpen(!open);
  const deleteAppointmentHandler = async () => {
    try {
      const response = await removeAppointmentByAdmin({
        id: Number(query.appointmentId),
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        notification.success({
          message: "Appointment Delete Successfully",
        });
        Router.back();
        deleteModalHandler();
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something Went Wrong",
      });
    }
  };

  return (
    <>
      <div className="max-w-[700px]">
        <div>
          <LabelWithText label="ID" text={id} />
          <LabelWithText
            label="Booking Date"
            text={date?.formatMMMMDDYYYY(bookingDate as string)}
          />
          <LabelWithText label="Patient" text={patient} />
          <LabelWithText label="Physician" text={physician} />
          <LabelWithText label="Service" text={service} />
          <LabelWithText label="Due Date" text={dueDate} />
          <LabelWithText label="Time" text={time} />
          <LabelWithText label="Total Amount" text={totalAmount} />

          <li className="flex border-b border-gray-5 py-3">
            <div className="w-full text-gray-1 max-w-[300px]">
              Appointment Status
            </div>
            <div className="w-full text-secondary">
              <Tag
                color="#e2f8f7"
                className="ant-typography ant-typography-secondary"
              >
                {appointmentStatus}
              </Tag>
            </div>
          </li>

          <li className="flex border-b border-gray-5 py-3">
            <div className="w-full text-gray-1 max-w-[300px]">
              Payment Status
            </div>
            <div className="w-full text-secondary">
              <Tag
                color="#e2f8f7"
                className="ant-typography ant-typography-secondary"
              >
                {paymentStatus}
              </Tag>
            </div>
          </li>
        </div>
        {(appointmentStatus === "Confirmed" ||
          appointmentStatus === "Cancelled" ||
          appointmentStatus === "Completed") && (
          <AdminAppointmentInfoFooter
            appointmentStatus={appointmentStatus}
            adminApp_Details={adminApp_Details}
          />
        )}

        {(appointmentStatus === "Requested" ||
          appointmentStatus === "Suggested") && (
          <AdminAppointmentRequestedInfoFooter
            adminApp_Details={adminApp_Details}
            onCancelRequestedAppointment={onCancelRequestedAppointment}
          />
        )}

        {/* DELETE THIS APPOINTMENT */}
        <Button
          type="link"
          className="ml-auto mt-10"
          danger
          loading={deleteFetching}
          disabled={deleteFetching}
          icon={<CloseOutlined />}
          onClick={deleteModalHandler}
        >
          Delete Appointment
        </Button>
        <ConfirmationModal
          message="Are You Sure You want to delete this appointment?"
          onCancel={deleteModalHandler}
          confirmLoading={deleteFetching}
          onOk={deleteAppointmentHandler}
          visible={open}
        />
      </div>
    </>
  );
}

export default AdminAppointmentInfo;

function AdminAppointmentInfoFooter({
  appointmentStatus,
  adminApp_Details,
}: {
  appointmentStatus: string;
  adminApp_Details?: DoctorData;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="flex justify-between mt-6">
        <div className="flex">
          <Button
            icon={<MessageOutlined />}
            className={`${_classes["appointments-btn"]} mr-3`}
            onClick={() =>
              Router.push({
                pathname: "/admin/messages",
                query: {
                  chat: "admin",
                  patientId: adminApp_Details?.patient.patient_id,
                },
              })
            }
          >
            Message Patient
          </Button>
          <Button
            icon={<MessageOutlined />}
            className={`${_classes["appointments-btn"]}`}
            onClick={() =>
              Router.push({
                pathname: "/admin/messages",
                query: {
                  chat: "admin",
                  doctorId: adminApp_Details?.doctor.doctor_Id,
                },
              })
            }
          >
            Message Physician
          </Button>
          {(appointmentStatus === "Cancelled" ||
            appointmentStatus === "Completed") && (
            <Button
              type="primary"
              className={`${_classes["appointments-rebook-btn"]}`}
              onClick={showModal}
            >
              Rebook Appointment
            </Button>
          )}
        </div>
      </div>
      <BookAppointmentJourney
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        adminApp_Details={adminApp_Details}
      />
    </>
  );
}

function AdminAppointmentRequestedInfoFooter(props: Props) {
  const { onCancelRequestedAppointment, adminApp_Details } = props || {};
  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        <Button
          danger
          className={`${_classes["appointments-btn"]} mr-3`}
          onClick={onCancelRequestedAppointment}
        >
          Cancel Appointment
        </Button>
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn"]} mr-3`}
          onClick={() =>
            Router.push({
              pathname: "/admin/messages",
              query: {
                chat: "admin",
                patientId: adminApp_Details?.patient.patient_id,
              },
            })
          }
        >
          Message Patient
        </Button>
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn"]}`}
          onClick={() =>
            Router.push({
              pathname: "/admin/messages",
              query: {
                chat: "admin",
                doctorId: adminApp_Details?.doctor.doctor_Id,
              },
            })
          }
        >
          Message Physician
        </Button>
      </div>
    </div>
  );
}
