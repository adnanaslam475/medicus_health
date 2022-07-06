import React, { useEffect, useMemo, useState } from "react";
import {
  CheckOutlined,
  MessageOutlined,
  RetweetOutlined,
  DeleteOutlined,
  VideoCameraFilled,
} from "@ant-design/icons";
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
  useCancelAppointmentByDoctorMutation,
  useGetAllAppointmentServiceTypesQuery,
  useProposeNewTimeMutation,
} from "generated/graphql";
import {
  formatMMMM_Dcoma_YYYY,
  getDayJsObject,
  isAppointmentTimeValid,
} from "common/utils/date";
import { date } from "common/utils";
import { getRole } from "common/utils/userData";
import dayjs from "dayjs";
import { FormInstance } from "rc-field-form";
import { FORMAT_D_T_W_AM_PM } from "common/constants/date";
import TimeSlotPickerForm from "../TimeSlotPickerForm/TimeSlotPickerForm";
import { CustomTimeSlot } from "common/types/types";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import MessageButtons from "../MessageButtons/MessageButtons";
import { getUserData } from "common/utils/userData";
import BookAppointmentJourney from "../BookAppointmentJourney/BookAppointmentJourney";
import RescheduleAppointmentModal from "../RescheduleAppointment/RescheduleAppointment";

type Props = {
  data: Appointment | undefined;
  onCancelRequestedAppointment?: () => void;
  cancelFetching?: boolean;
};

type dateArray = {
  endDate: string;
  startDate: string;
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
    createdAt,
  } = data || {};

  // FOR CHAT MESSAGE BUTTON PATIENT ID
  const { id: patientID } = patient || {};

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

  let dueDate = appointmentDateTime?.startTime || timeSlots()?.startTime;
  let startTime = appointmentDateTime?.startTime || timeSlots()?.startTime;
  let endTime = appointmentDateTime?.startTime || timeSlots()?.startTime;
  async function onCancelRequestedAppointment() {
    try {
      const res = await executeCancelAppointment({
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
          message: "Appointment Cancelled",
        });
      }
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
        {(status === "Requested" || status === "Confirmed") && (
          <MessageButtons patientID={patientID} doctorId={doctorId} />
        )}
      </div>
      <div>
        <LabelWithText label="ID" text={Number(id)} />
        <LabelWithText
          label="Patient"
          text={
            patient?.first_name
              ? `${patient?.first_name} ${patient?.last_name}`
              : "--"
          }
        />
        <LabelWithText
          label="Type"
          text={serviceType?.name ? serviceType?.name : "--"}
        />
        <LabelWithText
          label="Due Date"
          text={dueDate ? `${formatMMMM_Dcoma_YYYY(dueDate)} ` : "--"}
        />
        <LabelWithText
          label="Booking Date"
          text={formatMMMM_Dcoma_YYYY(createdAt)}
        />
        <LabelWithText
          label="Requested Date"
          text={formatMMMM_Dcoma_YYYY(requestedDate)}
        />
        <LabelWithText
          label="Time"
          text={
            startTime
              ? `${date?.formathhmma(startTime)} - ${date?.formathhmma(
                  endTime
                )}`
              : "--"
          }
        />
        {(status === "Confirmed" || status === "Completed") && (
          <LabelWithText
            label="Total Amount"
            text={
              transaction?.amountReceived
                ? `$${transaction?.amountReceived}`
                : "--"
            }
          />
        )}

        {status === "Requested" && (
          <LabelWithText
            label="Total Amount"
            text={charges ? `$${charges}` : "--"}
          />
        )}
        {status === "Cancelled" && (
          <LabelWithText
            label="Total Amount"
            text={charges ? `$${charges}` : "--"}
          />
        )}

        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1 max-w-[300px]">Status</div>
          <div className="w-full text-secondary">
            <Tag
              color="#e2f8f7"
              className="ant-typography ant-typography-secondary"
            >
              {status}
            </Tag>
          </div>
        </li>
        {status === "Cancelled" && (
          <li className="flex border-b border-gray-5 py-3">
            <div className="w-full text-gray-1 max-w-[300px]">
              Payment Status
            </div>
            <div className="w-full text-secondary">
              {transaction?.status ? (
                <Tag
                  color="#e2f8f7"
                  className="ant-typography ant-typography-secondary"
                >
                  {transaction?.status}
                </Tag>
              ) : (
                <Tag
                  color="#FEF6E0"
                  className="ant-typography ant-typography-secondary"
                >Unpaid</Tag>
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
      {status === "Requested" && (
        <DoctorRequestedAppointmentInfoFooter
          onCancelRequestedAppointment={onCancelRequestedAppointment}
          data={data}
          cancelFetching={cancelFetching}
        />
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
  }, [selectedAppointment]);

  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        {getRole() === "User" ||
          (getRole() === "Doctor" && (
            <Button
              icon={<MessageOutlined />}
              className={`${_classes["appointments-btn"]} mr-3`}
              onClick={() =>
                Router.push({
                  pathname: "/physician/messages",
                  query: {
                    chat: "admin",
                    doctorId: doctorId,
                    patientId: patientId,
                  },
                })
              }
            >
              Message Admin
            </Button>
          ))}

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

        {getRole() === "Admin" ||
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
              Message Patient
            </Button>
          ))}
      </div>
      {data?.status === "Confirmed" && (
        <Button
          type="primary"
          icon={<VideoCameraFilled />}
          className={`${_classes["appointments-btn"]} bg-current`}
          onClick={() =>
            Router.push(`/physician/appointments/${appointmentId}/call`)
          }
          disabled={disabled}
        >
          Join Now
        </Button>
      )}
      {getRole() === "User" && data?.status === "Completed" && (
        <Button
          type="primary"
          className={`${_classes["appointments-rebook-btn"]}`}
          onClick={showModal}
        >
          Rebook Appointment
        </Button>
      )}
      <BookAppointmentJourney
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        doctorData={doctor?.doctorProfile}
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
  }, [selectedAppointment]);

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  return (
    <div className="flex justify-center sm:justify-between mt-6 flex-wrap gap-y-2 gap-x-2 ">
      <div className="flex">
        <Button
          danger
          className={`${_classes["appointments-btn"]}`}
          onClick={() => setShowConfirmationModal(true)}
        >
          Cancel Appointment
        </Button>
      </div>
      {data?.status === "Confirmed" && (
        <>
          <Button
            type="primary"
            icon={<VideoCameraFilled />}
            className={`${_classes["appointments-btn"]} bg-current`}
            onClick={() => setShowRescheduleModal(true)}
          >
            Reschedule Appointment
          </Button>
          <Button
            type="primary"
            icon={<VideoCameraFilled />}
            className={`${_classes["appointments-btn"]} bg-current`}
            onClick={() =>
              Router.push(`/physician/appointments/${appointmentId}/call`)
            }
            disabled={disabled}
          >
            Join Now
          </Button>
        </>
      )}
      {getRole() === "User" && data?.status === "Completed" && (
        <Button
          type="primary"
          className={`${_classes["appointments-rebook-btn"]}`}
          onClick={showModal}
        >
          Rebook Appointment
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
        message="Are you sure you want to Cancel Appointment?"
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

  const [slot, setSlot] = useState<dateArray>({ startDate: "", endDate: "" });
  const [slots, setSlots] = useState<Array<dateArray>>([]);
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

  // FOR PROPOSE NEW TIME
  const [{ data: appointmentServiceTypes }] =
    useGetAllAppointmentServiceTypesQuery();
  const allAppoinments = appointmentServiceTypes?.appointmentServiceTypes;

  const [formInstance] = Form.useForm();
  const [datePickerInstance] = Form.useForm();

  const [serviceInfo, setServiceInfo] = useState<AppointmentServiceType>();
  const [visible, setVisible] = useState<boolean>(true);

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
    setSlot({ ...slot, [name]: dateString });
  };

  function onOkDatePicker(value: any) {}

  // API CALL

  const [, executeProposeTimeSlotMutation] = useProposeNewTimeMutation();

  async function onProposeNewTimeSlot() {
    try {
      const { error } = await executeProposeTimeSlotMutation({
        proposeNewTimeInput: {
          id: id as number,
          serviceId: serviceType?.id as number,
          charges: serviceInfo?.price as number,
          proposedTimeSlots: slots.map((slot) => ({
            startTime: dayjs(slot.startDate).format("YYYY-MM-DD hh:mm A"),
            endTime: dayjs(slot.endDate).format("YYYY-MM-DD hh:mm A"),
          })) as any,
        },
      });
      if (error && error?.message) {
        throw new Error(error.message);
      }
      notification.success({
        message: "Successfully Updated",
      });
    } catch (error: any) {
      notification.error({
        message: error?.message,
      });
    }
  }

  function deleteTimeSlot(index: number) {
    setSlots(slots.filter((_, i) => i !== index));
  }

  function visibleFalse() {
    setVisible(false);
  }

  function addTimeSlot() {
    setSlots([...slots, slot]);
    setSlot({ startDate: "", endDate: "" });
    datePickerInstance.resetFields(["start_time", "end_time"]);
  }

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
            Propose Time
          </Button>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            className={`${_classes["appointments-btn"]} bg-current sm:ml-3`}
            onClick={showModal}
          >
            Edit Appointment
          </Button>
        </div>
      </div>

      <ConfirmationModal
        visible={showConfirmationModal}
        confirmLoading={cancelFetching}
        onCancel={() => setShowConfirmationModal(false)}
        onOk={onCancelRequestedAppointment}
        message="Are you sure you want to Cancel Appointment?"
      />

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h2>Propose New Time</h2>
        <Form
          layout="vertical"
          form={formInstance}
          onFinish={onProposeNewTimeSlot}
        >
          <div className="flex">
            <div className="w-5/6">
              <Form.Item label="Service*" name="service">
                <Select
                  placeholder="Service Type"
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
            <Form.Item label="Existing Schedule" name="requestedDate">
              <div className="flex justify-between items-center bg-gray-6 p-3 mb-3 rounded-lg">
                <div className="">
                  <div className="text-sm mb-0 w-full">
                    Date :
                    {`${date.formatMMMMDDYYYY(appointmentDateTime?.startTime)}`}
                  </div>
                  <br />
                  <div className="text-sm mb-0 w-full">
                    Time:
                    {`${date.formathhmma(
                      appointmentDateTime?.startTime
                    )} -   ${date.formathhmma(appointmentDateTime?.endTime)}`}
                  </div>
                </div>
                <span className="hover:bg-white p-2 rounded-xl"></span>
              </div>
            </Form.Item>
          )}

          <label>Availability*</label>
          <div className="date-time-picker block mb-3">
            <AvailabilityTimeSlots
              form={datePickerInstance}
              onChangeDatePicker={onChangeDatePicker}
            />
            {slots?.map((v, index) => (
              <div className="flex justify-between items-center bg-gray-6 p-3 mb-3 rounded-lg">
                <div className="flex gap-2  rounded leading-3 max-w-max">
                  <p className="text-sm mb-0">{v?.startDate}</p> -
                  <p className="text-sm mb-0">{v?.endDate}</p>
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
              + Add Slot
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
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
}: {
  form: FormInstance<any>;
  onChangeDatePicker?: (dateString: string, name: string) => void;
}) {
  return (
    <div className="block mb-10">
      {/* <TimeSlotPickerForm onChangeDatePicker={onChangeDatePicker} /> */}
      <Form
        layout="horizontal"
        form={form as any}
        className="flex mt-2 mb-3 border-gray-8 gap-3"
      >
        <div className="w-50">
          <Form.Item label="Start Time" name="start_time">
            <Space direction="vertical" size={12}>
              <DatePicker
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
          <Form.Item label="End Time" name="end_time">
            <Space direction="vertical" size={12}>
              <DatePicker
                className="w-full"
                showTime
                format={FORMAT_D_T_W_AM_PM}
                showNow={false}
                onChange={(_, date) => onChangeDatePicker?.(date, "endDate")}
              />
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
