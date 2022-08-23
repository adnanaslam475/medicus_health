import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Modal,
  notification,
  Select,
  Space,
} from "antd";

// scss
import _classes from "./RescheduleAppointment.module.scss";
import {
  Appointment,
  AppointmentServiceType,
  SuggestedTimeSlots,
  useDoctorSchedulesQuery,
  useSuggestNewTimeMutation,
} from "generated/graphql";
import { getDayJsObject, UTCPrettierTime } from "common/utils/date";
import { date } from "common/utils";
import { FormInstance } from "rc-field-form";
import { FORMAT_D_T_W_AM_PM } from "common/constants/date";
import moment from "moment";
import { getUserData } from "common/utils/userData";
import dayjs from "dayjs";
import Router from "next/router";
import { GraphQLError } from "graphql";

type Props = {
  showRescheduleModal?: boolean;
  data?: Appointment | undefined;
  onCancelRequestedAppointment?: () => void;
  cancelFetching?: boolean;
  setShowRescheduleModal?: any;
};

type dateArray = {
  endTime: string;
  startTime: string;
};

function RescheduleAppointmentModal(props: Props) {
  const { data, showRescheduleModal, setShowRescheduleModal } = props || {};
  const { serviceType, requestedDate, appointmentTimeSlots } = data || {};

  const [slot, setSlot] = useState<dateArray>({ startTime: "", endTime: "" });
  const [slots, setSlots] = useState<SuggestedTimeSlots[] | any[]>([]);
  const [endDateValue, setEndDateValue] = useState<string>("");

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
    let formatedDate = moment(dateString, "MM-DD-YYYY hh:mm A")
      .add(30, "minutes")
      .local()
      .format("MM-DD-YYYY hh:mm A");
    setEndDateValue(formatedDate);
    setSlot({ startTime: dateString, endTime: formatedDate });
  };
  const [
    { data: suggestNewTimeData, fetching },
    executeUseSuggestNewTimeMutation,
  ] = useSuggestNewTimeMutation();

  async function onRescheduleAppointment() {
    const response = await executeUseSuggestNewTimeMutation({
      suggestNewTime: {
        id: Number(data?.id),
        proposedTimeSlots: slots.map((timeSlot) => {
          const [startDate, ...startTime] = timeSlot.startTime.split(" ");
          const [endDate, ...endTime] = timeSlot.endTime.split(" ");
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
    try {
      if (response?.data?.suggestNewTime) {
        setShowRescheduleModal(false);
        Router.push("/physician/appointments/upcoming");
        notification.success({
          message: "Successfully rescheduled appointment",
        });
      } else if (response?.error?.graphQLErrors) {
        let graphQLError = response?.error?.graphQLErrors[0]?.extensions
          ?.response as GraphQLError;
        let customError = response?.error?.graphQLErrors[0]?.extensions
          ?.exception as GraphQLError;
        let errorMessage =
          graphQLError?.message ||
          customError?.message ||
          "Something went wrong";
        notification.error({
          message: errorMessage,
        });
      }
    } catch (error: any) {
      notification.error({
        message:
          error?.message ||
          "Something went wrong while rescheduling appointment",
      });
    }
  }

  function deleteTimeSlot(index: number) {
    setSlots(slots.filter((_, i) => i !== index));
  }

  function addTimeSlot() {
    setSlots([
      ...slots,
      {
        startTime: slot.startTime,
        endTime: slot.endTime,
      },
    ]);
    setSlot({ startTime: "", endTime: "" });
    datePickerInstance.resetFields(["start_time", "end_time"]);
    setEndDateValue("");
  }
  const selectedAppointment = appointmentTimeSlots?.find(
    (appointment) => appointment.selected
  );

  const timeZone =
    typeof window !== "undefined" &&
    localStorage?.getItem("timeZone") !== "undefined" &&
    localStorage?.getItem("timeZone")
      ? JSON.parse(String(localStorage?.getItem("timeZone")))
      : "America/Cambridge_Bay";

  return (
    <>
      <Modal
        visible={showRescheduleModal}
        onOk={() => setShowRescheduleModal(false)}
        onCancel={() => setShowRescheduleModal(false)}
        footer={null}
      >
        <h2>Reschedule appointment</h2>
        <Form
          layout="vertical"
          form={formInstance}
          onFinish={onRescheduleAppointment}
        >
          <div className="flex">
            <div className="w-5/6">
              <Form.Item label="Appointment type" name="service">
                <span
                  className={`${_classes["border-color"]} w-1/6 pointer-events-none`}
                >
                  <Select
                    placeholder={data?.serviceType?.name || "Appointment type"}
                    className="w-full "
                    disabled={true}
                  >
                    {/* <Select.Option value={data?.serviceType?.id}>
                      {data?.serviceType?.name}
                    </Select.Option> */}
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
          {/* <Form.Item label="Requested date" name="requestedDate">
            <DatePicker
              placeholder="mm/dd/yy"
              format={"MM-DD-YYYY"}
              className={`${_classes["border-color"]} w-full pointer-events-none`}
              disabled={true}
            />
          </Form.Item> */}

          <Form.Item
            label="Original appointment date & time"
            name="requestedDate"
          >
            <div className="flex justify-between items-center bg-gray-6 p-3 mb-3 rounded-lg">
              <div className="flex gap-2  rounded leading-3 max-w-max">
                <p className="text-sm mb-0">{`${date.formatMMMMDDYYYY(
                  selectedAppointment?.startTime,
                  timeZone
                )}  ${date.formathhmma(
                  selectedAppointment?.startTime,
                  timeZone
                )}`}</p>{" "}
                -
                <p className="text-sm mb-0">{`${date.formatMMMMDDYYYY(
                  selectedAppointment?.endTime,
                  timeZone
                )}  ${date.formathhmma(
                  selectedAppointment?.endTime,
                  timeZone
                )}`}</p>
              </div>
              <span className="hover:bg-white p-2 rounded-xl"></span>
            </div>
          </Form.Item>

          <label>Propose new appointment date & time</label>
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
                    {dayjs(v?.startTime, "MM-DD-YYYY hh:mm A").format(
                      "MMMM, D, YYYY"
                    )}{" "}
                    -{" "}
                    {dayjs(v?.startTime, "MM-DD-YYYY hh:mm A").format("h:mm A")}
                  </p>{" "}
                  -
                  <p className="text-sm mb-0">
                    {dayjs(v?.endTime, "MM-DD-YYYY hh:mm A").format(
                      "MMMM, D, YYYY"
                    )}{" "}
                    - {dayjs(v?.endTime, "MM-DD-YYYY hh:mm A").format("h:mm A")}
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
              className={`${_classes["btn_font"]}`}
              onClick={addTimeSlot}
              disabled={Object.values(slot).some((value) => value === "")}
              type="link"
            >
              + Add slots
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
              className={`${_classes["appointments-btn"]}`}
              onClick={onRescheduleAppointment}
              type="primary"
              disabled={slots.length > 0 ? false : true}
              loading={fetching}
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

  // disable dates in which physician is not avaialble currently removed by client

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
  //   const isSunday = filteredDays.includes(0) ? 0 : NaN
  //   const disabledDates =
  //     current < dayjs().startOf("day") ||
  //     new Date(current).getDay() === isSunday ||
  //     filteredDays?.find((day) => day === new Date(current).getDay());
  //   return disabledDates;
  // }
  return (
    <div className="block mb-10">
      <Form
        layout="horizontal"
        form={form as any}
        className="flex mt-2 mb-3 border-gray-8 gap-3"
      >
        <div className="w-50">
          <Form.Item label="Start date & time" name="start_time">
            <Space direction="vertical" size={12}>
              <DatePicker
                className="w-full"
                showTime
                format={FORMAT_D_T_W_AM_PM}
                showNow={false}
                onChange={(_, date: string) => {
                  onChangeDatePicker?.(date, "startDate");
                }}
                // minuteStep={30}
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

export default RescheduleAppointmentModal;
