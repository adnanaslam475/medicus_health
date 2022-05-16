import React, { useEffect, useState } from "react";
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
  useCancelAppointmentByDoctorMutation,
  useGetAllAppointmentServiceTypesQuery,
  useProposeNewTimeMutation,
} from "generated/graphql";
import { formatMMMM_Dcoma_YYYY, getDayJsObject } from "common/utils/date";
import { date } from "common/utils";
import { getRole } from "common/utils/userData";
import dayjs from "dayjs";
import { FormInstance } from "rc-field-form";

type Props = {
  data: Appointment | undefined;
  onCancelRequestedAppointment?: () => void;
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
    charges,
    status,
    requestedDate,
    appointmentTimeSlots,
    createdAt,
  } = data || {};

  const [, executeCancelRequestedAppointment] =
    useCancelAppointmentByDoctorMutation();

  function timeSlots() {
    if (appointmentTimeSlots) {
      let selectedTimeSlots = appointmentTimeSlots?.find(
        (item) => item?.selected == true
      );

      return selectedTimeSlots;
    }
  }

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

  return (
    <div className="max-w-[700px]">
      <div>
        <LabelWithText label="ID" text={id} />
        <LabelWithText
          label="Patient"
          text={`${patient?.first_name} ${patient?.last_name}`}
        />
        <LabelWithText label="Type" text={serviceType?.name} />
        <LabelWithText
          label="Due Date"
          text={formatMMMM_Dcoma_YYYY(requestedDate)}
        />
        <LabelWithText
          label="Appointment creation date"
          text={formatMMMM_Dcoma_YYYY(createdAt)}
        />
        <LabelWithText
          label="Time"
          text={
            timeSlots()?.startTime
              ? `${date?.formathhmma(
                  timeSlots()?.startTime
                )} - ${date?.formathhmma(timeSlots()?.endTime)}`
              : "--"
          }
        />
        <LabelWithText label="Total Amount" text={charges} />

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
      </div>

      {status === "Confirmed" && (
        <DoctorAppointmentInfoFooter appointmentId={id} />
      )}
      {status === "Requested" && (
        <DoctorRequestedAppointmentInfoFooter
          onCancelRequestedAppointment={onCancelRequestedAppointment}
          data={data}
        />
      )}
    </div>
  );
}

export default DoctorAppointmentInfo;

function DoctorAppointmentInfoFooter({
  appointmentId,
}: {
  appointmentId: number | undefined;
}) {
  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn"]} mr-3`}
          onClick={() => Router.push("/admin/messages")}
        >
          Message Admin
        </Button>
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn"]}`}
          onClick={() => Router.push("/doctor/messages")}
        >
          Message Physician
        </Button>
      </div>
      <Button
        type="primary"
        icon={<VideoCameraFilled />}
        className={`${_classes["appointments-btn"]} bg-current`}
        onClick={() =>
          Router.push(`/doctor/appointments/${appointmentId}/call`)
        }
      >
        Join Now
      </Button>
    </div>
  );
}

function DoctorRequestedAppointmentInfoFooter(props: Props) {
  const { onCancelRequestedAppointment, data } = props || {};
  const {
    id,
    patient,
    serviceType,
    charges,
    status,
    requestedDate,
    appointmentTimeSlots,
  } = data || {};

  const [slot, setSlot] = useState<dateArray>({ startDate: "", endDate: "" });
  const [slots, setSlots] = useState<Array<dateArray>>([]);
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

  // FOR PROPOSE NEW TIME
  const [{ data: appointmentServiceTypes }] =
    useGetAllAppointmentServiceTypesQuery();
  const allAppoinments = appointmentServiceTypes?.appointmentServiceTypes;

  const [formInstance] = Form.useForm();
  const [datePickerInstance] = Form.useForm();
  // API CALL
  const [{ data: Appointment }] = useProposeNewTimeMutation();

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
    setServiceInfo(charge);
  }

  const onChangeDatePicker = (dateString: string, name: string): void => {
    setSlot({ ...slot, [name]: dateString });
  };

  function onOkDatePicker(value: any) {}

  function onProposeNewTimeSlot() {}

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
      <div className="flex justify-between mt-6">
        <Button
          danger
          className="border border-red outline"
          onClick={onCancelRequestedAppointment}
        >
          Reject
        </Button>
        <div className="flex">
          <Button
            icon={<RetweetOutlined />}
            className={`${_classes["appointments-btn"]}`}
            onClick={showModal}
          >
            Propose Time
          </Button>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            className={`${_classes["appointments-btn"]} bg-current ml-3`}
            onClick={() => Router.push("/doctor/calendar")}
          >
            Accept Appointment
          </Button>
        </div>
      </div>

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
          <Form.Item label="Requested Date*" name="requestedDate">
            <DatePicker
              placeholder="mm/dd/yy"
              format={"MM-DD-YYYY"}
              className="w-full pointer-events-none"
            />
          </Form.Item>

          <label>Availability*</label>
          {/* Availability Time Slots Starts */}
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
          {/* Availability Time Slots Ends */}
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
              // onClick={onProposeNewTimeSlot}
            >
              Propose Time
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
      <Form
        layout="horizontal"
        form={form as any}
        className="flex mt-2 mb-3 border-gray-8 gap-3"
      >
        <div className="w-50">
          <Form.Item label="Start Time" name="start_time">
            <Space direction="vertical" size={12}>
              <DatePicker
                showTime
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
                showTime
                onChange={(_, date) => onChangeDatePicker?.(date, "endDate")}
              />
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
