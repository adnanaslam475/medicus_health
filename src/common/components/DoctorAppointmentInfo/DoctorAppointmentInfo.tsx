import React, { useState } from "react";
import {
  CheckOutlined,
  MessageOutlined,
  RetweetOutlined,
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
  useProposeNewTimeMutation,
} from "generated/graphql";
import { formatMMMM_Dcoma_YYYY } from "common/utils/date";
import { date } from "common/utils";
import { getRole } from "common/utils/userData";
import dayjs from "dayjs";

type props = {
  data: Appointment | undefined;
};
function DoctorAppointmentInfo({ data }: props) {
  const {
    id,
    patient,
    serviceType,
    charges,
    status,
    requestedDate,
    appointmentTimeSlots,
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

  // FOR FOOTER OF APPOINTMENT DETAIL PAGE
  const { pathname } = useRouter();

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
          label="Date"
          text={formatMMMM_Dcoma_YYYY(requestedDate)}
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

      {pathname.includes("appointments/upcoming") && (
        <DoctorAppointmentInfoFooter />
      )}
      {pathname.includes("appointments/requested") && (
        <DoctorRequestedAppointmentInfoFooter
          onCancelRequestedAppointment={onCancelRequestedAppointment}
        />
      )}
    </div>
  );
}

export default DoctorAppointmentInfo;

function DoctorAppointmentInfoFooter() {
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
        onClick={() => Router.push("/doctor/appointments/call")}
      >
        Join Now
      </Button>
    </div>
  );
}

function DoctorRequestedAppointmentInfoFooter({
  onCancelRequestedAppointment,
}: {
  onCancelRequestedAppointment: () => void;
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

  // FOR PROPOSE NEW TIME

  const [formInstance] = Form.useForm();
  // API CALL
  const [data] = useProposeNewTimeMutation();
  console.log(data, "dataproposeNewTimeSlots");
  // const { physicianData, onFinish } = props || {};
  const [serviceInfo, setServiceInfo] = useState<AppointmentServiceType[]>();
  // const { service, price, requestedDate, availability } = Appointment || {};

  // function prepareAndSetEditPayload() {
  //   formInstance.setFieldsValue({
  //     service: service,
  //     charges: price,
  //     requestedDate: requestedDate,
  //     availability: availability,
  //   });
  // }

  function handleServiceChange(value: any) {
    // let charge = Appointment?.filter((serviceType) => serviceType.id === value);
    // setServiceInfo(charge);
  }

  function disabledDate(current: any) {
    if (serviceInfo) {
      if (
        serviceInfo[0]?.name === "Consultation" ||
        serviceInfo[0]?.name === "consultation"
      ) {
        return dayjs(current).isBefore(dayjs().add(1, "day"));
      } else if (serviceInfo[0]?.name === "Second Opinion") {
        return dayjs(current).isBefore(dayjs().add(4, "day"));
      }
    }
    return true;
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
        <Form layout="vertical">
          <div className="flex">
            <div className="w-5/6">
              <Form.Item label="Service*" name="service">
                <Select
                  placeholder="Service Type"
                  className="w-full"
                  onChange={handleServiceChange}
                >
                  {/* {allAppoinments?.map((item) => (
                    <Select.Option key={item?.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))} */}
                </Select>
              </Form.Item>
            </div>
            <div className="w-1/6 ml-4">
              <Form.Item label="Charges" name="charges">
                <div className="text-primary bg-gray-6 rounded flex items-center	justify-center h-12 w-full">
                  $
                  {serviceInfo &&
                    `${serviceInfo?.map((item) =>
                      item?.price ? item?.price : ""
                    )}`}
                </div>
              </Form.Item>
            </div>
          </div>
          <Form.Item label="Requested Date*" name="requestedDate">
            <DatePicker
              placeholder="mm/dd/yy"
              format={"MM-DD-YYYY"}
              className="w-full"
              disabledDate={disabledDate}
            />
          </Form.Item>
          {/* <div className="flex">
            <div className="w-5/6">
              <Form.Item label="Service*" name="service">
                <Select placeholder="Service*" className="w-full">
                  <Select.Option>First Consultation</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-1/6 ml-4">
              <Form.Item label="Amount" name="Amount">
                <Input placeholder="" className="w-full" />
              </Form.Item>
            </div>
          </div>
          <Form.Item label="Requested Date*" name="requestedDate">
            <DatePicker
              placeholder="mm/dd/yy"
              format={"MM-DD-YYYY"}
              className="w-full"
            />
          </Form.Item> */}
          <label>Availability*</label>
          <div className="flex mt-2 mb-5 border-gray-8">
            <div className="w-32 ">
              <Form.Item label="Start Time" name="Start Time">
                <Select placeholder="Select" className="w-full">
                  <Select.Option>08:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>09:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>10:00 AM</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-32 ml-4">
              <Form.Item label="End Time" name="End Time">
                <Select placeholder="Select" className="w-full">
                  <Select.Option>08:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>09:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>10:00 AM</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="flex mt-2 mb-5 border-b border-gray-8">
            <div className="w-32">
              <Form.Item label="Start Time" name="Start Time">
                <Select placeholder="Select" className="w-full">
                  <Select.Option>08:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>09:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>10:00 AM</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-32 ml-4">
              <Form.Item label="End Time" name="End Time">
                <Select placeholder="Select" className="w-full">
                  <Select.Option>08:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>09:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>10:00 AM</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}
