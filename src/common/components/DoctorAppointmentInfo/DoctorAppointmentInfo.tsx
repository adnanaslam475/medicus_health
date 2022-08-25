import React, { useEffect, useMemo, useState } from "react";
import {
  CheckOutlined,
  MessageOutlined,
  RetweetOutlined,
  DeleteOutlined,
  VideoCameraFilled,
} from "@ant-design/icons";
import support from "./../../../../public/assets/icon/support.svg";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Space,
  Tag,
} from "antd";
import LabelWithText from "common/components/LabelWithText/LabelWithText";
import { useRouter } from "next/router";

// scss
import _classes from "./DoctorAppointmentInfo.module.scss";
import Router from "next/router";
import {
  Appointment,
  AppointmentServiceType,
  AppointmentTimeSlots,
  DateTimeSlots,
  useCancelAppointmentByDoctorMutation,
  useDoctorSchedulesQuery,
  useGetAllAppointmentServiceTypesQuery,
  useProposeNewTimeMutation,
} from "generated/graphql";
import {
  formatMMMM_Dcoma_YYYY,
  getDayJsObject,
  isAppointmentTimeValid,
  UTCPrettierTime,
} from "common/utils/date";
import { date } from "common/utils";
import { getRole } from "common/utils/userData";
import dayjs from "dayjs";
import { FormInstance } from "rc-field-form";
import { FORMAT_D_T_W_AM_PM } from "common/constants/date";
import TimeSlotPickerForm from "../TimeSlotPickerForm/TimeSlotPickerForm";
import { CustomTimeSlot, StatusName } from "common/types/types";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import MessageButtons from "../MessageButtons/MessageButtons";
import { getUserData } from "common/utils/userData";
import BookAppointmentJourney from "../BookAppointmentJourney/BookAppointmentJourney";
import RescheduleAppointmentModal from "../RescheduleAppointment/RescheduleAppointment";
import moment from "moment";
import StatusChip from "../StatusChip/StatusChip";
import Link from "next/link";
import Image from "next/image";
import VideoCamera from "../../../../public/assets/icon/video.svg";
import { GraphQLError } from "graphql";

type Props = {
  data: Appointment | undefined;
  onCancelRequestedAppointment?: () => void;
  cancelFetching?: boolean;
};

type dateArray = {
  endDate: Date | string | moment.Moment;
  startDate: Date | string | moment.Moment;
};

function DoctorAppointmentInfo({ data }: Props) {
  const {
    id,
    patient,
    serviceType,
    transaction,
    charges,
    status,
    requestedDate,
    appointmentTimeSlots,
    appointmentSchedule,
    appointmentDateTime,
    appointmentCharges,
    createdAt,
    doctor,
    appointmentTypeProposed,
  } = data || {};

  const { id: doctorIdForChat } = doctor || {};
  // FOR CHAT MESSAGE BUTTON PATIENT ID
  const { id: patientID } = patient || {};
  const timeZone =
    typeof window !== "undefined" &&
    localStorage?.getItem("timeZone") !== "undefined" &&
    localStorage?.getItem("timeZone")
      ? JSON.parse(String(localStorage?.getItem("timeZone")))
      : "America/Cambridge_Bay";

  // FOR CHAT MESSAGE BUTTON PHYSICIAN ID

  const { user } = getUserData();
  const { id: doctorId } = user || {};

  const [{ fetching: cancelFetching }, executeCancelAppointment] =
    useCancelAppointmentByDoctorMutation();
  function timeSlots() {
    if (appointmentTimeSlots) {
      let selectedTimeSlots = appointmentTimeSlots?.find(
        (item) => item?.selected == true
      );

      return selectedTimeSlots;
    }
  }
  let formatedDueDate = date.formatMMMMDDYYYY(
    String(appointmentDateTime?.startTime),
    timeZone
  );

  async function onCancelRequestedAppointment() {
    try {
      const res = await executeCancelAppointment({
        id: Number(id),
      });

      if (res?.data?.cancelAppointment) {
        Router.push("/physician/appointments/pending");
        notification.success({
          message: "Appointment canceled",
        });
      } else {
        notification.error({
          message: "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onCancelUpcomingAppointment() {
    try {
      const res = await executeCancelAppointment({
        id: Number(id),
      });

      if (res?.data?.cancelAppointment) {
        notification.success({
          message: "Appointment canceled",
        });
      }
      Router.push({
        pathname: "/physician/appointments/upcoming",
      });
      if (res?.error) {
        notification.error({
          message:
            res?.error?.graphQLErrors[0]?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-[700px]">
      <div className="message-button mb-3">
        {(status === "Requested" ||
          status === "Confirmed" ||
          status === "Canceled" ||
          status === "Proposed" ||
          status === "Rescheduled" ||
          status === "Completed") && (
          <MessageButtons patientID={patientID} doctorId={doctorIdForChat} />
        )}
      </div>
      <div>
        <LabelWithText label="ID#" text={Number(id)} />
        <LabelWithText
          label="Booking date"
          text={date?.formatDAYMMDDYY(createdAt)}
        />
        {/* <LabelWithText
          label="Patient name"
          text={
            patient?.first_name
              ? `${patient?.first_name} ${patient?.last_name}`
              : "--"
          }
        /> */}
        <LabelWithText
          label={
            status === "Completed"
              ? "Appointment type"
              : "Appointment type requested"
          }
          text={serviceType?.name ? serviceType?.name : "--"}
        />
        <LabelWithText
          label={
            status === "Completed"
              ? "Appointment date "
              : "Appointment date requested"
          }
          text={!appointmentDateTime?.startTime ? "--" : `${formatedDueDate} `}
        />

        {/* <LabelWithText
          label="Requested date"
          text={date?.formatDAYMMDDYY(requestedDate)}
        /> */}
        <LabelWithText
          label={
            status === "Completed"
              ? "Appointment time"
              : "Appointment time requested"
          }
          text={
            !appointmentDateTime?.startTime || !appointmentDateTime?.endTime
              ? "--"
              : `${date.formathhmma(
                  appointmentDateTime?.startTime,
                  timeZone
                )} - ${date.formathhmma(
                  appointmentDateTime?.endTime,
                  timeZone
                )}`
          }
        />
        <LabelWithText
          label="Total amount"
          text={appointmentCharges ? `$${appointmentCharges?.total}` : "-"}
        />
        {/* {(status === "Confirmed" || status === "Completed") && (
          <LabelWithText
            label="Total amount"
            text={charges ? `$${charges}` : "--"}
          />
        )}

        {status === "Requested" && (
          <LabelWithText
            label="Total amount"
            text={charges ? `$${charges}` : "--"}
          />
        )}
        {status === "Canceled" && (
          <LabelWithText
            label="Total amount"
            text={charges ? `$${charges}` : "--"}
          />
        )} */}

        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1 max-w-[300px]">
            Appointment status
          </div>
          {console.log("status", status)}
          <div className="w-full text-primary">
            <StatusChip type={status?.toUpperCase() as StatusName} />
          </div>
        </li>
        {status === "Proposed" && (
          <LabelWithText
            label={"Appointment type proposed"}
            text={appointmentTypeProposed?.type || ""}
          />
        )}
        {status === "Proposed" && appointmentTypeProposed?.dateTime?.length && (
          <LabelWithText
            label={"Appointment(s) proposed"}
            text={
              appointmentTypeProposed.dateTime.map((item: DateTimeSlots) => {
                console.log("item is");
                return (
                  <li>{`${date.formatDAYMMDDYY(
                    String(item?.date)
                  )} - ${date.formathhmma(
                    String(item?.startTime)
                  )} - ${date.formathhmma(String(item?.endTime))}`}</li>
                );
              }) as any
            }
          />
        )}
        {status === "Canceled" && (
          <li className="flex border-b border-gray-5 py-3">
            <div className="w-full text-gray-1 max-w-[300px]">
              Payment status
            </div>
            <div className="w-full text-secondary">
              {transaction?.status ? (
                <StatusChip
                  type={transaction?.status?.toUpperCase() as StatusName}
                />
              ) : (
                <StatusChip type={"Unpaid".toUpperCase() as StatusName} />
              )}
            </div>
          </li>
        )}
      </div>
      {status === "Confirmed" && (
        <DoctorUpcomingAppointmentInfoFooter
          appointmentId={Number(id)}
          data={data}
          onCancelUpcomingAppointment={onCancelUpcomingAppointment}
          cancelFetching={cancelFetching}
        />
      )}
      {status === "Completed" && (
        <DoctorAppointmentInfoFooter appointmentId={Number(id)} data={data} />
      )}
      {(status === "Requested" || status === "Proposed") && (
        <>
          <DoctorRequestedAppointmentInfoFooter
            onCancelRequestedAppointment={onCancelRequestedAppointment}
            data={data}
            cancelFetching={cancelFetching}
          />
        </>
      )}
    </div>
  );
}

export default DoctorAppointmentInfo;

function DoctorAppointmentInfoFooter({
  appointmentId,
  data,
}: {
  appointmentId: number | undefined;
  data?: Appointment;
}) {
  // GET USER ID
  const { user } = getUserData();
  const doctorId = user?.id;
  const { appointmentTimeSlots, patient, doctor } = data || {};

  const { id: patientId } = patient || {};
  const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
    () => appointmentTimeSlots?.find((item) => item.selected),
    [appointmentTimeSlots]
  );
  const [disabled, setDisabled] = useState(true);

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

  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment, disabled]);

  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        {/* {getRole() === "User" ||
          (getRole() === "Doctor" && (
            <Button
              icon={
                <Image
                  priority={true}
                  width={15}
                  height={15}
                  src={support}
                  alt=""
                  className=""
                />
              }
              className={`${_classes["appointments-btn"]} mr-3`}
              onClick={() =>
                Router.push({
                  pathname: "/physician/messages",
                  query: {
                    chat: "admin",
                    doctorId: doctorId,
                    // patientId: patientId,
                  },
                })
              }
            >
              <span className="pl-2"> Message support</span>
            </Button>
          ))} */}

        {/* {getRole() === "Admin" ||
          (getRole() === "Patient" && (
            <Button
              icon={<MessageOutlined />}
              className={`${_classes["appointments-btn"]}`}
              onClick={() =>
                Router.push({
                  pathname: "/physician/messages",
                  query: {
                    chat: "patient",
                    doctorId: doctorId,
                    patientId: patientId,
                  },
                })
              }
            >
              Message Patient
            </Button>
          ))} */}

        {/* {getRole() === "Admin" ||
          (getRole() === "Doctor" && (
            <Button
              icon={<MessageOutlined />}
              className={`${_classes["appointments-btn"]} mr-3`}
              onClick={() =>
                Router.push({
                  pathname: "/physician/messages",
                  query: {
                    chat: "patient",
                    doctorId: doctorId,
                    patientId: patientId,
                  },
                })
              }
            >
              Message patient
            </Button>
          ))} */}
      </div>
      {data?.status === "Confirmed" && (
        // <Button
        //   type="primary"
        //   icon={<VideoCameraFilled />}
        //   className={`${_classes["appointments-btn"]} bg-current`}
        //   onClick={() =>
        //     Router.push(`/physician/appointments/${appointmentId}/call`)
        //   }
        //   disabled={disabled}
        // >
        //   Join now
        // </Button>
        <Link passHref href={`/physician/appointments/${appointmentId}/call`}>
          <Button
            type="primary"
            icon={<VideoCameraFilled />}
            className={`${_classes["appointments-btn"]} flex `}
            disabled={disabled}
            target={"_blank"}
          >
            <span>Join now</span>
          </Button>
        </Link>
      )}
      {getRole() === "User" && data?.status === "Completed" && (
        <Button
          type="primary"
          className={`${_classes["appointments-rebook-btn"]}`}
          onClick={showModal}
        >
          Rebook appointment
        </Button>
      )}
      <BookAppointmentJourney
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        rebookData={data}
      />
    </div>
  );
}
function DoctorUpcomingAppointmentInfoFooter({
  appointmentId,
  data,
  onCancelUpcomingAppointment,
  cancelFetching,
}: {
  appointmentId: number | undefined;
  data?: Appointment;
  onCancelUpcomingAppointment?: () => void;
  cancelFetching?: boolean;
}) {
  // GET USER ID
  const { user } = getUserData();
  const doctorId = user?.id;
  const { appointmentTimeSlots, patient, doctor } = data || {};

  const { id: patientId } = patient || {};
  const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
    () => appointmentTimeSlots?.find((item) => item.selected),
    [appointmentTimeSlots]
  );
  const [disabled, setDisabled] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment, disabled]);

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  return (
    <div className="flex justify-center sm:justify-between mt-6 flex-wrap gap-y-2 gap-x-2 ">
      <div className="flex">
        <Button
          danger
          className={`${_classes["appointments-btn"]}`}
          onClick={() => setShowConfirmationModal(true)}
        >
          Cancel appointment
        </Button>
      </div>
      {data?.status === "Confirmed" && (
        <>
          <Button
            type="primary"
            className={`${_classes["appointments-btn"]} bg-current`}
            onClick={() => setShowRescheduleModal(true)}
          >
            <Image
              priority={true}
              src={VideoCamera}
              alt="espanolFlag"
              width={20}
              height={11}
            />
            <span className="ml-2">Reschedule appointment</span>
          </Button>
          <Link passHref href={`/patient/appointments/${appointmentId}/call`}>
            <Button
              type="primary"
              icon={<VideoCameraFilled />}
              className={`${_classes["appointments-btn"]} flex `}
              disabled={disabled}
              target={"_blank"}
            >
              <span>Join now</span>
            </Button>
          </Link>
        </>
      )}
      {getRole() === "User" && data?.status === "Completed" && (
        <Button
          type="primary"
          className={`${_classes["appointments-rebook-btn"]}`}
          onClick={showModal}
        >
          Rebook appointment
        </Button>
      )}
      <BookAppointmentJourney
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        doctorData={doctor?.doctorProfile}
      />
      <ConfirmationModal
        visible={showConfirmationModal}
        confirmLoading={cancelFetching}
        onCancel={() => setShowConfirmationModal(false)}
        onOk={onCancelUpcomingAppointment}
        message="Are you sure you want to cancel appointment?"
      />
      {showRescheduleModal && (
        <RescheduleAppointmentModal
          showRescheduleModal={showRescheduleModal}
          setShowRescheduleModal={setShowRescheduleModal}
          data={data}
        />
      )}
    </div>
  );
}

function DoctorRequestedAppointmentInfoFooter(props: Props) {
  const { onCancelRequestedAppointment, data, cancelFetching } = props || {};
  const {
    id,
    patient,
    serviceType,
    charges,
    status,
    requestedDate,
    appointmentTimeSlots,
    appointmentDateTime,
  } = data || {};

  const [slot, setSlot] = useState<dateArray>({
    startDate: "",
    endDate: "",
  });
  const [slots, setSlots] = useState<Array<dateArray | any>>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // FOR PROPOSE NEW TIME
  const [{ data: appointmentServiceTypes }] =
    useGetAllAppointmentServiceTypesQuery();
  const allAppoinments = appointmentServiceTypes?.appointmentServiceTypes;

  const [formInstance] = Form.useForm();
  const [datePickerInstance] = Form.useForm();

  const [serviceInfo, setServiceInfo] = useState<AppointmentServiceType>();
  const [visible, setVisible] = useState<boolean>(true);
  const [endDateValue, setEndDateValue] = useState<string>("");

  useEffect(() => {
    if (data) {
      prepareAndSetEditPayload();
    }
  }, [data]);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      service: serviceType?.id,
      requestedDate: getDayJsObject(requestedDate),
    });

    setServiceInfo(serviceType as AppointmentServiceType);
  }

  function handleServiceChange(value: any) {
    let charge = allAppoinments?.find(
      (serviceType) => serviceType.id === value
    );
    setServiceInfo(charge as any);
  }

  const onChangeDatePicker = (dateString: string, name: string): void => {
    let formatedDate = moment(dateString, "MM-DD-YYYY hh:mm A")
      .add(30, "minutes")
      .local()
      .format("MM-DD-YYYY hh:mm A");
    setEndDateValue(formatedDate);
    setSlot({ startDate: dateString, endDate: formatedDate });
  };

  function onOkDatePicker(value: any) {}

  // API CALL

  const [{ fetching }, executeProposeTimeSlotMutation] =
    useProposeNewTimeMutation();

  async function onProposeNewTimeSlot() {
    const serviceTypeSelected =
      formInstance.getFieldValue("service") || serviceType?.id;
    try {
      const { error } = await executeProposeTimeSlotMutation({
        proposeNewTimeInput: {
          id: id as number,
          serviceId: serviceTypeSelected,
          charges: serviceInfo?.price as number,
          proposedTimeSlots: slots.map((timeSlot) => {
            const [startDate, ...startTime] = timeSlot.startDate.split(" ");
            const [endDate, ...endTime] = timeSlot.endDate.split(" ");
            return {
              startTime: UTCPrettierTime(
                startTime.join(" "),
                dayjs(startDate, "MM-DD-YYYY")
              ),
              endTime: UTCPrettierTime(
                endTime.join(" "),
                dayjs(endDate, "MM-DD-YYYY")
              ),
            };
          }) as any,
        },
      });
      if (error && error?.message) {
        let graphQLError = error?.graphQLErrors[0]?.extensions
          ?.response as GraphQLError;
        let customError = error?.graphQLErrors[0]?.extensions
          ?.exception as GraphQLError;
        let errorMessage =
          graphQLError?.message ||
          customError?.message ||
          "Something went wrong";
        notification.error({
          message: errorMessage,
        });
      } else {
        formInstance.resetFields();
        setSlots([]);
        notification.success({
          message: "Successfully updated",
        });
        closeModal();
      }
    } catch (error: any) {
      console.log("error", error);
      // notification.error({
      //   message: error?.message,
      // });
    }
  }

  function deleteTimeSlot(index: number) {
    setSlots(slots.filter((_, i) => i !== index));
  }

  function visibleFalse() {
    setVisible(false);
  }

  function addTimeSlot() {
    setSlots([
      ...slots,
      {
        startDate: slot.startDate,
        endDate: slot.endDate,
      },
    ]);
    setSlot({ startDate: "", endDate: "" });
    setEndDateValue("");
    datePickerInstance.resetFields(["start_time", "end_time"]);
  }
  const timeZone =
    typeof window !== "undefined" &&
    localStorage?.getItem("timeZone") !== "undefined" &&
    localStorage?.getItem("timeZone")
      ? JSON.parse(String(localStorage?.getItem("timeZone")))
      : "America/Cambridge_Bay";

  let formatedDueDate = date.formatMMMMDDYYYY(
    String(appointmentDateTime?.startTime),
    timeZone
  );

  let formatedStartTime = date.formathhmma(
    String(appointmentDateTime?.startTime),
    timeZone
  );
  let formatedEndTime = date.formathhmma(
    String(appointmentDateTime?.endTime),
    timeZone
  );

  return (
    <>
      <div className=" flex-col sm:flex-row  flex justify-between mt-6 flex-wrap">
        <Button
          danger
          // className="border border-red outline"
          className={`${_classes["appointments-btn"]}`}
          onClick={() => setShowConfirmationModal(true)}
        >
          Reject
        </Button>
        <div className="flex-col sm:flex-row flex flex-wrap">
          <Button
            icon={<RetweetOutlined />}
            className={`${_classes["appointments-btn"]} my-2 sm:my-0`}
            onClick={showModal}
          >
            Propose/edit appointment
          </Button>
        </div>
      </div>

      <ConfirmationModal
        visible={showConfirmationModal}
        confirmLoading={cancelFetching}
        onCancel={() => setShowConfirmationModal(false)}
        onOk={onCancelRequestedAppointment}
        message="Are you sure you want to reject appointment?"
      />

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h2>Propose/edit appointment</h2>
        <Form
          layout="vertical"
          form={formInstance}
          onFinish={onProposeNewTimeSlot}
        >
          <div className="flex">
            <div className="w-5/6">
              <Form.Item label="Appointment type*" name="service">
                <Select
                  placeholder="Appointment Type"
                  className="w-full"
                  onChange={handleServiceChange}
                >
                  {allAppoinments?.map((item) => (
                    <Select.Option key={item?.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="w-1/6 ml-4">
              <Form.Item label="Charges" name="charges">
                <div className="text-primary bg-gray-6 rounded flex items-center	justify-center h-12 w-full">
                  ${serviceInfo?.price || ""}
                </div>
              </Form.Item>
            </div>
          </div>

          {/* <Form.Item label="Requested Date*" name="requestedDate">
            <DatePicker
              placeholder="mm/dd/yy"
              format={"MM-DD-YYYY"}
              className="w-full pointer-events-none"
            />
          </Form.Item> */}
          {appointmentDateTime?.startTime && appointmentDateTime?.endTime && (
            <Form.Item
              label="Appointment date & time requested by patient"
              name="requestedDate"
              className="font-semibold"
            >
              <div className="flex justify-between items-center bg-gray-6 p-3 mb-3 rounded-lg">
                <div className="font-normal">
                  <div className="text-sm mb-0 w-full">
                    Date : {`${formatedDueDate}`}
                  </div>
                  <br />
                  <div className="text-sm mb-0 w-full">
                    Time :{` ${formatedStartTime} - ${formatedEndTime}`}
                  </div>
                </div>
                <span className="hover:bg-white p-2 rounded-xl"></span>
              </div>
            </Form.Item>
          )}

          <label>Propose appointment date & time</label>
          <div className="date-time-picker block mb-3">
            <AvailabilityTimeSlots
              form={datePickerInstance}
              onChangeDatePicker={onChangeDatePicker}
              endDateValue={endDateValue}
            />
            {slots?.map((v, index) => (
              <div className="flex justify-between items-center bg-gray-6 p-3 mb-3 rounded-lg">
                <div className="flex gap-2  rounded leading-3 max-w-max">
                  <p className="text-sm mb-0">
                    {dayjs(v?.startDate, "MM-DD-YYYY hh:mm A").format(
                      "MMMM, D, YYYY"
                    )}{" "}
                    -{" "}
                    {dayjs(v?.startDate, "MM-DD-YYYY hh:mm A").format("h:mm A")}
                  </p>{" "}
                  -
                  <p className="text-sm mb-0">
                    {dayjs(v?.endDate, "MM-DD-YYYY hh:mm A").format(
                      "MMMM, D, YYYY"
                    )}{" "}
                    - {dayjs(v?.endDate, "MM-DD-YYYY hh:mm A").format("h:mm A")}
                  </p>
                </div>
                <span className="hover:bg-white p-2 rounded-xl">
                  <DeleteOutlined onClick={() => deleteTimeSlot(index)} />
                </span>
              </div>
            ))}
          </div>
          <div className="text-primary flex">
            <Button
              onClick={addTimeSlot}
              disabled={Object.values(slot).some((value) => value === "")}
              type="link"
            >
              + Add slots
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
              loading={fetching}
              className={`${_classes["appointments-btn"]}`}
              onClick={onProposeNewTimeSlot}
              type="primary"
              disabled={slots.length > 0 ? false : true}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

function AvailabilityTimeSlots({
  form,
  onChangeDatePicker,
  endDateValue,
}: {
  form: FormInstance<any>;
  onChangeDatePicker?: (dateString: string, name: string) => void;
  endDateValue?: string;
}) {
  const { user } = getUserData();
  const doctorId = (user?.role === "Doctor" && user?.id) || 0;
  const [{ data: scheduleDetails }, executeUseDoctorSchedulesQuery] =
    useDoctorSchedulesQuery({
      variables: {
        doctorId: doctorId,
      },
      pause: !doctorId,
    });
  const doctorAvailableDaysList = scheduleDetails?.doctorSchedules?.map(
    (item) => item.day
  );
  // function disabledDate(current: any) {
  //   const weekDays = [0, 1, 2, 3, 4, 5, 6];
  //   // Remove duplicates from array
  //   let doctorAvailableDays = [
  //     ...(new Set(doctorAvailableDaysList) as unknown as number[]),
  //   ];

  //   // Returns list of days in which doctor is not available
  //   const filteredDays = weekDays.filter(
  //     (currentEl) => !doctorAvailableDays.includes(currentEl)
  //   );
  //   const isSunday = filteredDays.includes(0) ? 0 : NaN;
  //   const disabledDates =
  //     current < dayjs().startOf("day") ||
  //     new Date(current).getDay() === isSunday ||
  //     filteredDays?.find((day) => day === new Date(current).getDay());
  //   return disabledDates;
  // }
  return (
    <div className="block mb-10">
      {/* <TimeSlotPickerForm onChangeDatePicker={onChangeDatePicker} /> */}
      <Form
        layout="vertical"
        form={form as any}
        className="flex mt-2 mb-3 border-gray-8 gap-3"
      >
        <div className="w-50">
          <Form.Item label="Start date & time" name="start_time">
            <Space direction="vertical" size={12}>
              <DatePicker
                // disabledDate={disabledDate as any}
                className="w-full"
                showTime
                format={FORMAT_D_T_W_AM_PM}
                showNow={false}
                onChange={(_, date: string) => {
                  onChangeDatePicker?.(date, "startDate");
                }}
              />
            </Space>
          </Form.Item>
        </div>
        <div className="w-50">
          <Form.Item label="End date & time" name="end_time">
            <Space direction="vertical" size={12}>
              {endDateValue === "Invalid date" || !endDateValue ? (
                <DatePicker
                  disabled={true}
                  className="w-full"
                  showTime
                  placeholder="--"
                />
              ) : (
                <DatePicker
                  value={moment(endDateValue, "MM-DD-YYYY hh:mm A")}
                  disabled={true}
                  className="w-full"
                  showTime
                  format={FORMAT_D_T_W_AM_PM}
                  showNow={false}
                />
              )}
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
