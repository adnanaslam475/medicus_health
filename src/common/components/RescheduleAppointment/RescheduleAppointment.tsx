import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Modal, Select, Space } from "antd";

// scss
import _classes from "./RescheduleAppointment.module.scss";
import { Appointment, AppointmentServiceType } from "generated/graphql";
import { getDayJsObject } from "common/utils/date";
import { date } from "common/utils";
import { FormInstance } from "rc-field-form";
import { FORMAT_D_T_W_AM_PM } from "common/constants/date";

type Props = {
  showRescheduleModal?: boolean;
  data?: Appointment | undefined;
  onCancelRequestedAppointment?: () => void;
  cancelFetching?: boolean;
  setShowRescheduleModal?: any;
};

type dateArray = {
  endDate: string;
  startDate: string;
};

function RescheduleAppointmentModal(props: Props) {
  const { data, showRescheduleModal, setShowRescheduleModal } = props || {};
  const { serviceType, requestedDate, appointmentTimeSlots } = data || {};

  const [slot, setSlot] = useState<dateArray>({ startDate: "", endDate: "" });
  const [slots, setSlots] = useState<Array<dateArray>>([]);

  const [formInstance] = Form.useForm();
  const [datePickerInstance] = Form.useForm();

  const [serviceInfo, setServiceInfo] = useState<AppointmentServiceType>();

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

  const onChangeDatePicker = (dateString: string, name: string): void => {
    setSlot({ ...slot, [name]: dateString });
  };

  async function onRescheduleAppointment() {
    setShowRescheduleModal(false);
    console.log("re-schedule data is", slots, data?.id);
  }

  function deleteTimeSlot(index: number) {
    setSlots(slots.filter((_, i) => i !== index));
  }

  function addTimeSlot() {
    setSlots([...slots, slot]);
    setSlot({ startDate: "", endDate: "" });
    datePickerInstance.resetFields(["start_time", "end_time"]);
  }
  const selectedAppointment = appointmentTimeSlots?.find(
    (appointment) => appointment.selected
  );
  return (
    <>
      <Modal
        visible={showRescheduleModal}
        onOk={() => setShowRescheduleModal(false)}
        onCancel={() => setShowRescheduleModal(false)}
        footer={null}
      >
        <h2>Reschedule Appointment</h2>
        <Form
          layout="vertical"
          form={formInstance}
          onFinish={onRescheduleAppointment}
        >
          <div className="flex">
            <div className="w-5/6">
              <Form.Item label="Service" name="service">
                <span
                  className={`${_classes["border-color"]} w-1/6 pointer-events-none`}
                >
                  <Select
                    placeholder="Service Type"
                    className="w-full "
                    disabled={true}
                  >
                    <Select.Option value={data?.serviceType?.id}>
                      {data?.serviceType?.name}
                    </Select.Option>
                  </Select>
                </span>
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
          <Form.Item label="Requested Date" name="requestedDate">
            <DatePicker
              placeholder="mm/dd/yy"
              format={"MM-DD-YYYY"}
              className={`${_classes["border-color"]} w-full pointer-events-none`}
              disabled={true}
            />
          </Form.Item>

          <Form.Item label="Existing Schedule" name="requestedDate">
            <div className="flex justify-between items-center bg-gray-6 p-3 mb-3 rounded-lg">
              <div className="flex gap-2  rounded leading-3 max-w-max">
                <p className="text-sm mb-0">{`${date.formatMMMMDDYYYY(
                  selectedAppointment?.startTime
                )}  ${date.formathhmma(
                  selectedAppointment?.startTime
                )}`}</p>{" "}
                -
                <p className="text-sm mb-0">{`${date.formatMMMMDDYYYY(
                  selectedAppointment?.endTime
                )}  ${date.formathhmma(selectedAppointment?.endTime)}`}</p>
              </div>
              <span className="hover:bg-white p-2 rounded-xl"></span>
            </div>
          </Form.Item>

          <label>Availability</label>
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
              onClick={onRescheduleAppointment}
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

export default RescheduleAppointmentModal;
