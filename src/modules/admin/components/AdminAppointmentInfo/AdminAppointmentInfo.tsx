import React, { useEffect, useMemo, useState } from "react";
import {
  CloseOutlined,
  DeleteOutlined,
  VideoCameraFilled,
} from "@ant-design/icons";
import { Button, Form, notification, Select } from "antd";
import LabelWithText from "common/components/LabelWithText/LabelWithText";

import chat from "../../../../../public/assets/icon/chat-bubble.svg";
import _classes from "./AdminAppointmentInfo.module.scss";
import Router, { useRouter } from "next/router";
import {
  Appointment,
  AppointmentTimeSlots,
  AppointmentTypeProposedResponse,
  DateTimeSlots,
  useCancelAppointmentByDoctorMutation,
  useGetAllAppointmentServiceTypesQuery,
  useGetPatientsQuery,
  useGetPhysiciansQuery,
  useRemoveAppointmentByAdminMutation,
} from "generated/graphql";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import ConfirmationModal from "common/components/ConfirmationModal/ConfirmationModal";
import StatusChip from "common/components/StatusChip/StatusChip";
import { StatusName } from "common/types/types";
import RescheduleAppointmentModal from "common/components/RescheduleAppointment/RescheduleAppointment";
import { currencyFormatter, isAppointmentTimeValid } from "common/utils/date";
import Image from "next/image";
import { getRole } from "common/utils/userData";
import Input from "antd/lib/input/Input";
import { date } from "common/utils";
import { isChrome } from "utils/helper";
const { Option } = Select;

type Props = {
  isEdit?: boolean;
  cancelFetching?: boolean;
  formRef?: any;
  appointmentData?: Appointment;
  data?: {
    id: string;
    bookingDate: string;
    bookingTime: string;
    patient: string;
    physician: string;
    service: string;
    dueDate: string;
    time: string;
    totalAmount: string;
    appointmentStatus: string;
    paymentStatus: string;
    status: string;
    appointmentTypeProposed: AppointmentTypeProposedResponse | null | undefined;
    createdAt?: string
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
function AdminAppointmentInfo({
  data,
  adminApp_Details,
  appointmentData,
  isEdit,
  formRef,
}: Props) {
  const { query } = useRouter();
  const {
    id,
    bookingDate,
    bookingTime,
    patient,
    physician,
    service,
    dueDate,
    time,
    totalAmount,
    appointmentStatus,
    paymentStatus = "unpaid",
    status,
    appointmentTypeProposed,
    createdAt
  } = data || {};
  const [{ fetching: cancelFetching }, executeCancelRequestedAppointment] =
    useCancelAppointmentByDoctorMutation();
  const [
    { data: appointmentServiceType },
    executeUseGetAllAppointmentServiceTypesQuery,
  ] = useGetAllAppointmentServiceTypesQuery({ requestPolicy: "network-only" });

  async function onCancelRequestedAppointment() {
    try {
      const res = await executeCancelRequestedAppointment({
        id: Number(id),
      });

      if (res?.data?.cancelAppointment) {
        notification.success({
          message: "Appointment canceled",
        });
      } else {
        notification.error({
          message: "Something went wrong",
        });
      }
    } catch (error) { }
  }

  // MUTATION FOR DELETE APPOINTMENT

  const [{ fetching: deleteFetching }, removeAppointmentByAdmin] =
    useRemoveAppointmentByAdminMutation();

  const [open, setOpen] = React.useState<boolean>(false);

  const deleteModalHandler = () => setOpen(!open);
  const deleteAppointmentHandler = async () => {
    try {
      const id = query?.appointmentId || query?.id;
      const response = await removeAppointmentByAdmin({
        id: Number(id),
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

  const allAppoinments = appointmentServiceType?.appointmentServiceTypes;

  const [{ data: physicianList }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
      pagination: { limit: -1, page: 1 },
    },
  });

  const { getPhysicians } = physicianList || {};

  const [{ data: patientList }] = useGetPatientsQuery({
    variables: {
      filter: {},
      pagination: { limit: -1, page: 1 },
    },
  });

  const { getPatients } = patientList || {};

  const [formInstance] = Form.useForm();

  useEffect(() => {
    if (formRef) {
      formRef.current = formInstance;
    }
  }, []);

  return (
    <>
      <div className="max-w-[700px]">
        <Form form={formInstance}>
          <LabelWithText label="ID#" text={id} />
          <>
            {isEdit ? (
              <li className="flex border-b border-gray-5 py-3">
                <div className="w-full text-gray-1 max-w-[300px]">
                  Patient name
                </div>
                <div className="w-full table-action-icon">
                  <div className="text-primary">
                    <Form.Item name="patient">
                      <Select
                        defaultValue={patient}
                        className="max-w-[230px]"
                        showSearch
                        placeholder="Patients"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option!.children as unknown as string)
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      >
                        {getPatients?.items?.map((item, index) => (
                          <Option key={index} value={item?.id}>
                            {`${item?.first_name} ${item?.last_name}`}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </li>
            ) : (
              <LabelWithText label="Patient name" text={patient} />
            )}
            {/* <LabelWithText label="Patient" text={patient} /> */}

            {isEdit ? (
              <li className="flex border-b border-gray-5 py-3">
                <div className="w-full text-gray-1 max-w-[300px]">
                  Physician name
                </div>
                <div className="w-full table-action-icon">
                  <div className="text-primary">
                    <Form.Item name="physician">
                      <Select
                        defaultValue={physician}
                        className="max-w-[230px]"
                        showSearch
                        placeholder="Physicians"
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                          return (option!?.children as unknown as string)
                            ?.toLowerCase()
                            ?.includes(input.toLowerCase());
                        }}
                      >
                        {getPhysicians?.items
                          ?.filter((physician) => physician?.doctorProfile)
                          .map((item, index) => {
                            const firstName = item?.first_name?.includes("Dr.")
                              ? item?.first_name
                              : `Dr. ${item?.first_name}`;
                            return (
                              <Option key={index} value={`${item.id}`}>
                                {`${firstName} ${item?.last_name}`}
                              </Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </li>
            ) : (
              <LabelWithText label="Physician name" text={physician} />
            )}
            <LabelWithText label="Appointment type requested" text={service} />
          </>
          <LabelWithText
            label={
              "Date of request"
              // appointmentStatus == "Requested"
              //   ? "Requested date"
              //   : "Appointment date"
            }
            text={createdAt ? `${date.formatDAYMMDDYY(String(createdAt))}` : "-"}
          />
          <LabelWithText
            label="Booking date and time"
            // text={`${dueDate} - ${time}`}
            text={`${date.formatDAYMMDDYY(String(dueDate))} - ${time}`}
          />
          {isEdit ? (
            <li className="flex border-b border-gray-5 py-3">
              <div className="w-full text-gray-1 max-w-[300px]">
                Total amount
              </div>
              <div className="w-full table-action-icon">
                <div className="text-primary">
                  <Form.Item
                    // label="Physician*"
                    name="charges"
                    className="max-w-[230px]"
                  >
                    <Input
                      defaultValue={totalAmount ? currencyFormatter(Number(totalAmount)) : "-"}
                      placeholder="Total amount"
                      className="w-full"
                    />
                  </Form.Item>
                  {/* <Form.Item name="appointmentType">
                    <Select
                      defaultValue={service}
                      placeholder="Select appointment type"
                      className="max-w-[230px]"
                    >
                      {allAppoinments?.map((item) => (
                        <Option key={item?.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item> */}
                </div>
              </div>
            </li>
          ) : (
            <LabelWithText
              label="Total amount"
              text={totalAmount ? currencyFormatter(Number(totalAmount)) : "-"}
            />
          )}

          <li className="flex border-b border-gray-5 py-3">
            <div className="text-gray-1 w-full max-w-[150px] sm:max-w-[300px]">
              Appointment status
            </div>
            <div className="w-full table-action-icon">
              <div className="text-primary">
                <StatusChip
                  type={appointmentStatus?.toUpperCase() as StatusName}
                />
              </div>
            </div>
          </li>

          <li className="flex border-b border-gray-5 py-3">
            <div className="text-gray-1 w-full max-w-[150px] sm:max-w-[300px]">
              Payment status
            </div>
            <div className="w-full">
              <StatusChip
                type={
                  paymentStatus?.toUpperCase() === "SUCCEEDED"
                    ? "PAID"
                    : (paymentStatus?.toUpperCase() as StatusName)
                }
              />
            </div>
          </li>

          {isEdit && paymentStatus === "unpaid" ? (
            <li className="flex border-b border-gray-5 py-3">
              <div className="w-full text-gray-1 max-w-[300px]">
                Appointment type proposed
              </div>
              <div className="w-full table-action-icon">
                <div className="text-primary">
                  <Form.Item name="appointmentType">
                    <Select
                      defaultValue={appointmentTypeProposed?.type || "-"}
                      placeholder="Appointment type proposed"
                      className="max-w-[230px]"
                    >
                      {allAppoinments?.map((item) => (
                        <Option key={item?.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </li>
          ) : (
            <LabelWithText
              label="Appointment type proposed"
              text={String(appointmentTypeProposed?.type || "-")}
            />
          )}

          {appointmentTypeProposed &&
            appointmentTypeProposed?.dateTime?.length > 0 &&
            status !== "Confirmed" && (
              <LabelWithText
                label={"Appointment(s) proposed"}
                text={
                  appointmentTypeProposed.dateTime.map(
                    (item: DateTimeSlots) => {
                      return (
                        <div>{`${date.formatDAYMMDDYY(
                          String(item?.date)
                        )} - ${date.formathhmma(
                          String(item?.startTime)
                        )} - ${date.formathhmma(String(item?.endTime))}`}</div>
                      );
                    }
                  ) as any
                }
              />
            )}
        </Form>
        {(appointmentStatus === "Canceled" ||
          appointmentStatus === "Completed" ||
          appointmentStatus === "Rescheduled") && (
            <AdminAppointmentInfoFooter
              appointmentStatus={appointmentStatus}
              adminApp_Details={adminApp_Details}
            />
          )}

        {(appointmentStatus === "Requested" ||
          appointmentStatus === "Proposed") && (
            <AdminAppointmentRequestedInfoFooter
              adminApp_Details={adminApp_Details}
              onCancelRequestedAppointment={onCancelRequestedAppointment}
              cancelFetching={cancelFetching}
            />
          )}

        {appointmentStatus === "Confirmed" && (
          <AdminAppointmentConfirmedInfoFooter
            adminApp_Details={adminApp_Details}
            onCancelRequestedAppointment={onCancelRequestedAppointment}
            appointmentData={appointmentData || data as any}
            cancelFetching={cancelFetching}
          />
        )}

        {/* DELETE THIS APPOINTMENT */}
        {paymentStatus === "unpaid" && (
          <>
            {" "}
            <Button
              type="link"
              className={`ml-auto mt-10 ${isChrome && 'antCustomBtn'}`}
              danger
              loading={deleteFetching}
              disabled={deleteFetching}
              icon={
                <span className="mr-1 -mt-2.5">
                  <DeleteOutlined />
                </span>
              }
              onClick={deleteModalHandler}
            >
              Delete appointment
            </Button>
            <ConfirmationModal
              message="Are you sure You want to delete this appointment?"
              onCancel={deleteModalHandler}
              confirmLoading={deleteFetching}
              onOk={deleteAppointmentHandler}
              visible={open}
            />
          </>
        )}
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
      <div className="flex justify-between mt-6 items-center sm:items-start ">
        <div className="flex flex-wrap md:flex-nowrap flex-col sm:flex-row gap-2 flex-1 w-full">
          <Button
            icon={
              <Image
                priority={true}
                width={15}
                height={15}
                src={chat}
                alt=""
                className={`${isChrome && 'antCustomBtn'}`}
              />
            }
            className={`${_classes["appointments-btn"]} mr-0 sm:mr-3`}
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
            <span className="pl-2">Message patient</span>
          </Button>
          <Button
            icon={
              <Image
                priority={true}
                width={15}
                height={15}
                src={chat}
                alt=""
                className=""
              />
            }
            className={`${_classes["appointments-btn"]} ${isChrome && 'antCustomBtn'}`}
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
            <span className="pl-2">Message physician</span>
          </Button>
          {(appointmentStatus === "Canceled" ||
            appointmentStatus === "Completed") && (
              <Button
                type="primary"
                className={`${_classes["appointments-rebook-btn"]} ${isChrome && 'antCustomBtn'}`}
                onClick={showModal}
              >
                Rebook appointment
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
  const { cancelFetching, onCancelRequestedAppointment, adminApp_Details } =
    props || {};
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  return (
    <div className="flex justify-between mt-6 flex-wrap wrap">
      <div className="flex flex-wrap flex-1 gap-y-2 gap-x-2">
        <Button
          danger
          className={`${_classes["appointments-btn"]}  flex-1 ${isChrome && 'antCustomBtn'}`}
          onClick={() => setShowConfirmationModal(true)}
        >
          Cancel appointment
        </Button>
        <Button
          icon={
            <Image
              priority={true}
              width={15}
              height={15}
              src={chat}
              alt=""
              className=""
            />
          }
          className={`${_classes["appointments-btn"]}  flex-1 ${isChrome && 'antCustomBtn'}`}
          onClick={() => {
            Router.push({
              pathname: "/admin/messages",
              query: {
                chat: "admin",
                patientId: adminApp_Details?.patient.patient_id,
              },
            });
          }}
        >
          <span className="pl-2">Message patient</span>
        </Button>
        <Button
          icon={
            <Image
              unoptimized
              priority={true}
              width={15}
              height={15}
              src={chat}
              alt=""
              className=""
            />
          }
          className={`${_classes["appointments-btn"]} flex-1 ${isChrome && 'antCustomBtn'}`}
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
          <span className="pl-2">Message physician</span>
        </Button>
      </div>
      <ConfirmationModal
        visible={showConfirmationModal}
        confirmLoading={cancelFetching}
        onCancel={() => setShowConfirmationModal(false)}
        onOk={onCancelRequestedAppointment}
        message="Are you sure you want to cancel appointment?"
      />
    </div>
  );
}

function AdminAppointmentConfirmedInfoFooter(props: Props) {
  const {
    cancelFetching,
    onCancelRequestedAppointment,
    adminApp_Details,
    appointmentData,
  } = props || {};
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
    () => appointmentData?.appointmentTimeSlots?.find((item) => item.selected),
    [appointmentData?.appointmentTimeSlots]
  );
  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment, disabled]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <div className="flex justify-between mt-6 flex-wrap wrap">
      <div className="flex flex-wrap flex-1 gap-y-2 gap-x-2 ">
        {showRescheduleModal && (
          <RescheduleAppointmentModal
            showRescheduleModal={showRescheduleModal}
            setShowRescheduleModal={setShowRescheduleModal}
            data={appointmentData}
          />
        )}
        <Button
          type="primary"
          icon={<VideoCameraFilled />}
          target={"_blank"}
          className={`${_classes["appointments-btn"]} bg-current w-full sm:w-auto ${isChrome && 'antCustomBtn'}`}
          onClick={() =>
            window.open(
              getRole() === "User"
                ? `/patient/appointments/${appointmentData?.id}/call` : getRole() === "Doctor" ?
                  `/physician/appointments/${appointmentData?.id}/call` : `/admin/appointments/${appointmentData?.id}/call`,"_blank"
            )
          }
          disabled={disabled}
        >
          Join now
        </Button>
        <Button
          type="primary"
          icon={<VideoCameraFilled />}
          className={`${_classes["appointments-btn"]} bg-current w-full sm:w-auto ${isChrome && 'antCustomBtn'}`}
          onClick={() => setShowRescheduleModal(true)}
        >
          Reschedule appointment
        </Button>
        <Button
          icon={
            <Image
              priority={true}
              unoptimized
              width={16}
              height={16}
              src={chat}
              alt=""
              className="w-full"
            />
          }
          className={`${_classes["appointments-btn"]} ${_classes["for-msg-icon-width"]}  flex-1 ${isChrome && 'antCustomBtn'}`}
          onClick={() => {
            Router.push({
              pathname: "/admin/messages",
              query: {
                chat: "admin",
                patientId: adminApp_Details?.patient.patient_id,
              },
            });
          }}
        >
          <span className="pl-2">Message patient</span>
        </Button>
        <Button
          icon={
            <Image
              priority={true}
              width={15}
              height={15}
              src={chat}
              alt=""
              className="w-14"
            />
          }
          className={`${_classes["appointments-btn"]} ${_classes["for-msg-icon-width"]} flex-1 ${isChrome && 'antCustomBtn'}`}
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
          <span className="pl-2">Message physician</span>
        </Button>
        <Button
          danger
          className={`${_classes["appointments-btn"]} flex-1 ${isChrome && 'antCustomBtn'}`}
          onClick={() => setShowConfirmationModal(true)}
        >
          Cancel appointment
        </Button>
      </div>
      <ConfirmationModal
        visible={showConfirmationModal}
        confirmLoading={cancelFetching}
        onCancel={() => setShowConfirmationModal(false)}
        onOk={onCancelRequestedAppointment}
        message="Are you sure you want to cancel appointment?"
      />
    </div>
  );
}
