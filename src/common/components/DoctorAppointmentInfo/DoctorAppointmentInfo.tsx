import React, { useState } from "react";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
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

// scss
import _classes from "./DoctorAppointmentInfo.module.scss";
import Router from "next/router";
import {
  Appointment,
  useCancelAppointmentByDoctorMutation,
} from "generated/graphql";
import { formatMMMM_Dcoma_YYYY } from "common/utils/date";
import { date } from "common/utils";
import { getRole } from "common/utils/userData";

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
        {/* <LabelWithText label="Status" text={status as string} /> */}

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
      <DoctorAppointmentInfoFooter />

      <DoctorRequestedAppointmentInfoFooter
        onCancelRequestedAppointment={onCancelRequestedAppointment}
      />
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

  return (
    <>
      <div className="w-4/6 flex justify-between mt-4">
        <div className="flex flex-auto justify-between">
          <Button
            className="border border-red"
            onClick={onCancelRequestedAppointment}
          >
            Reject
          </Button>
          <div>
            <Button
              icon={<MessageOutlined />}
              className={`${_classes["appointments-btn"]}`}
              onClick={showModal}
            >
              Propose Time
            </Button>
            <Button
              type="primary"
              icon={<VideoCameraFilled />}
              className={`${_classes["appointments-btn"]} bg-current ml-3`}
              onClick={() => Router.push("/doctor/calendar")}
            >
              Accept Appointment
            </Button>
          </div>
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
          </Form.Item>
          <label>Availability*</label>
          <div className="flex mt-2">
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
          <div className="flex mt-2">
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
