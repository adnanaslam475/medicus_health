import React, { useEffect, useRef, useState } from "react";
import { Form, Radio, Select, DatePicker, Input, Collapse } from "antd";
import {
  Appointment,
  AppointmentServiceType,
  DoctorProfile,
  DoctorSchedule,
  useDoctorSchedulesByDayQuery,
  useDoctorSchedulesQuery,
  useGetAllAppointmentServiceTypesQuery,
  User,
} from "generated/graphql";
import moment from "moment";

import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";
import { date } from "../../../utils";
import { sorter } from "utils/helper";
import PhysicianAvailabilityAccordion from "common/components/PhysicianAvailabilityAccordion";
import _classes from "./styles.module.scss";

const { Option } = Select;
type AdminData = {
  patientList: User[];
  physicianList: User[];
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

type Props = {
  physicianData?: DoctorProfile | undefined | null;
  allAppoinments?: AppointmentServiceType[];
  onFinish?: ((values: any) => void) | undefined;
  adminData?: AdminData;
  patientData?: User[];
  adminApp_Details?: DoctorData;
  rebookData?: Appointment;
  clear?: boolean | undefined;
  setClear?: any;
};

export const AppointmentBookingStepOne = React.forwardRef(
  function AppointmentBookingStepOne(props: Props, ref: any) {
    const [formInstance] = Form.useForm();
    const [data] = useGetAllAppointmentServiceTypesQuery();
    const {
      saveStepOne,
      data: appoinmentDetails,
      clearBookingContext,
    } = useBookAppointment();
    const {
      physician,
      patient,
      price,
      service,
      requestedDate,
      availability,
      selectedDateDay,
      charges,
      serviceName,
    } = appoinmentDetails?.stepOne || {};
    const {
      physicianData,
      onFinish,
      adminData,
      patientData,
      adminApp_Details,
      setClear,
      clear,
      rebookData,
    } = props || {};

    const { first_name, last_name, id } =
      physicianData?.user || rebookData?.doctor || {};
    const { doctor_Id, doctor_first_name, doctor_last_name } =
      adminApp_Details?.doctor || {};
    const [serviceInfo, setServiceInfo] = useState<AppointmentServiceType[]>();
    //   GET ID FROM URL
    const { query } = useRouter();
    const [doctorId, setDoctorId] = useState<number>();
    const [schedules, setSchedules] = useState([]);
    const [selectedDay, setSelectedDay] = useState<number>();

    const stepOneDoctorId = physician?.split(":")[0];
    let doctorScheduleId =
      Number(rebookData?.doctorId) ||
      Number(id) ||
      Number(adminApp_Details?.doctor?.doctor_Id) ||
      Number(query?.id) ||
      Number(doctorId) ||
      Number(stepOneDoctorId);

    const queryDay =
      selectedDay ??
      selectedDateDay ??
      (requestedDate && dayjs(requestedDate).get("day"));
    const [{ data: scheduleDetails }, executeUseDoctorSchedulesByDayQuery] =
      useDoctorSchedulesByDayQuery({
        variables: {
          doctorId: Number(doctorScheduleId),
          filter: { day: Number(queryDay) },
        },
        // pause: !selectedDay,
      });
    useEffect(() => {
      if (queryDay) {
        // executeUseDoctorSchedulesByDayQuery({ requestPolicy: "network-only" });
        setSchedules((scheduleDetails?.doctorSchedulesByDay as any) || []);
      }
    }, [selectedDay]);

    useEffect(() => {
      if (ref) {
        ref.current = formInstance;
      }
    }, []);
    const isShow =
      scheduleDetails?.doctorSchedulesByDay &&
      scheduleDetails?.doctorSchedulesByDay.length > 0;

    useEffect(() => {
      if (appoinmentDetails) {
        prepareAndSetEditPayload();
      }
    }, [appoinmentDetails]);

    // useEffect(() => {
    //   if (clear) {
    //     clearBookingContext?.({});
    //     setSchedules([]);
    //     formInstance.resetFields();
    //   }
    //   if (isShow && !clear) {
    //     setSchedules((scheduleDetails?.doctorSchedulesByDay as any) || []);
    //   }
    // }, [clear, isShow]);

    useEffect(() => {
      if (clear) {
        clearBookingContext?.({});
        formInstance.resetFields();
      }
    }, [clear, isShow]);

    function prepareAndSetEditPayload() {
      let consultationCharges =
        rebookData?.charges ||
        charges ||
        price ||
        (serviceInfo && serviceInfo[0]?.price);
      let physicianName =
        rebookData || physicianData?.user
          ? `${
              first_name?.includes("Dr.") ? first_name : `Dr. ${first_name}`
            } ${last_name}`
          : adminApp_Details?.doctor
          ? `${
              doctor_first_name?.includes("Dr.")
                ? doctor_first_name
                : `Dr. ${doctor_first_name}`
            } ${doctor_last_name}`
          : physician;
      formInstance.setFieldsValue({
        physician: physicianName,
        patient: patient,
        service: rebookData?.serviceId || service,
        charges: consultationCharges,
        requestedDate: requestedDate,
        availability: availability,
      });
    }

    function handleServiceChange(value: any) {
      let charge = allAppoinments?.filter(
        (serviceType) => serviceType.id === value
      );

      setServiceInfo(charge as any);
      formInstance?.resetFields(["requestedDate", "selectedDay"]);
      setSelectedDay(9);
    }

    const [
      { data: scheduleDetailsForDisableDate },
      executeUseDoctorSchedulesQuery,
    ] = useDoctorSchedulesQuery({
      variables: {
        doctorId: doctorScheduleId,
      },
      pause: !doctorScheduleId,
    });

    const doctorAvailableDaysList =
      scheduleDetailsForDisableDate?.doctorSchedules?.map((item) => item.day);
    function disabledDate(current: any) {
      const weekDays = [0, 1, 2, 3, 4, 5, 6];
      // Remove duplicates from array
      let doctorAvailableDays = [
        ...(new Set(doctorAvailableDaysList) as unknown as number[]),
      ];

      // Returns list of days in which doctor is not available
      const filteredDays = weekDays.filter(
        (currentEl) => !doctorAvailableDays.includes(currentEl)
      );
      const isSunday = filteredDays.includes(0) ? 0 : NaN;

      const disabledDates =
        current < dayjs().startOf("day") ||
        new Date(current).getDay() === isSunday ||
        (filteredDays?.find((day) => day === new Date(current).getDay()) ||
          (serviceInfo &&
          serviceInfo[0]?.name?.toLowerCase().includes("consultation")
            ? dayjs(current).isBefore(dayjs().add(1, "day"))
            : dayjs(current).isBefore(dayjs().add(4, "day"))));
      return disabledDates;
    }

    function onFinishLocal(values: any) {
      let tempObj = {
        ...values,
        physicianId: values.physician,
        physician: values.physician,
        charges: serviceInfo?.[0].price || values.charges,
        serviceName: serviceInfo?.[0]?.name || serviceName,
        serviceInfo,
        doctorSchedule: scheduleDetails,
        selectedDateDay: selectedDay,
      };
      saveStepOne?.(tempObj);
    }

    const allAppoinments = data?.data?.appointmentServiceTypes;

    const { physicianList, patientList } = adminData || {};
    const PhysicianHandler = (physicianId: string) => {
      setClear(false);
      let doctorId = physicianId.split(":")[0];
      setDoctorId(Number(doctorId));
    };

    const timeZone =
      typeof window !== "undefined" &&
      localStorage?.getItem("timeZone") !== "undefined" &&
      JSON.parse(
        String(localStorage?.getItem("timeZone")) || "'America/Cambridge_Bay'"
      );

    return (
      <>
        <h2>Request an appointment</h2>
        <Form form={formInstance} layout="vertical" onFinish={onFinishLocal}>
          {adminData || patientData ? (
            <Form.Item
              label="Physicians*"
              name="physician"
              rules={[
                { required: true, message: "Physician name is required" },
              ]}
            >
              <Select
                className="w-full"
                showSearch
                placeholder="Physicians"
                optionFilterProp="children"
                onChange={(doctorId) => PhysicianHandler(doctorId)}
                filterOption={(input, option) => {
                  return (option!?.children as unknown as string)
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase());
                }}
              >
                {(patientData || physicianList)?.map((item, index) => {
                  const firstName = item?.first_name?.includes("Dr.")
                    ? item?.first_name
                    : `Dr. ${item?.first_name}`;
                  return (
                    <Option
                      key={index}
                      value={`${item.id}: ${item?.first_name} ${item?.last_name}`}
                    >
                      {`${firstName} ${item?.last_name}`}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item
              label="Physician*"
              name="physician"
              rules={[
                { required: true, message: "Physician name is required" },
              ]}
            >
              <Input placeholder="Dr. name" className="w-full" readOnly />
            </Form.Item>
          )}
          {adminData && (
            <Form.Item
              label="Patient*"
              name="patient"
              rules={[{ required: true, message: "Patient name is required" }]}
            >
              <Select
                className="w-full"
                showSearch
                placeholder="Patient*"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {patientList?.map((item, index) => (
                  <Option
                    key={index}
                    value={`${item.id}:${item?.first_name} ${item?.last_name}`}
                  >
                    {`${item?.first_name} ${item?.last_name}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <div className="flex">
            <div className="w-5/6">
              <Form.Item
                label="Select appointment type*"
                // label={<>Select appointment type*</>}
                // tooltip="my tooltip"
                name="service"
                rules={[
                  { required: true, message: "Appointment type is required" },
                ]}
              >
                <Select
                  // placeholder="Appointment type"
                  placeholder="Select appointment type"
                  className="w-full"
                  onChange={handleServiceChange}
                >
                  {allAppoinments?.map((item) => (
                    <Option key={item?.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="w-1/6 ml-4">
              <Form.Item label="Charges" name="charges">
                <div className="text-primary bg-gray-6 rounded flex items-center	justify-center h-12 w-full">
                  <Input
                    disabled
                    prefix={<p className="mb-0">$</p>}
                    className={`flex ${_classes.chargesInputView} items-center justify-center`}
                    value={
                      serviceInfo
                        ? `${serviceInfo?.map((item) =>
                            item?.price ? item?.price : ""
                          )}`
                        : price || charges || rebookData?.charges
                    }
                  />
                  {/* $
                  {serviceInfo ?
                    `${serviceInfo?.map((item) =>
                      item?.price ? item?.price : ""
                    )}` : charges || price} */}
                </div>
              </Form.Item>
            </div>
          </div>
          <div className="mt-2">
            <PhysicianAvailabilityAccordion
              doctorId={
                formInstance.getFieldValue("physician")?.length && doctorId
                  ? Number(doctorId)
                  : doctorScheduleId
                  ? Number(doctorScheduleId)
                  : 0
              }
            />
          </div>

          <Form.Item
            label="Requested date*"
            name="requestedDate"
            rules={[{ required: true, message: "Requested date is required" }]}
          >
            <DatePicker
              placeholder="mm-dd-yyyy"
              format={"MM-DD-YYYY"}
              className="w-full"
              onChange={(momentDate) => {
                setSelectedDay(Number(momentDate?.get("weekday")));
              }}
              disabledDate={disabledDate as any}
            />
          </Form.Item>
          <Form.Item
            label="Select desired availability. Physician will propose 30 minute appointment within availabiity period selected."
            name="availability"
            rules={[{ required: true, message: "Availability is required" }]}
          >
            <div className="flex flex-wrap availability-label">
              {isShow ? (
                <Radio.Group
                  defaultValue={appoinmentDetails?.stepOne?.availability}
                >
                  {scheduleDetails?.doctorSchedulesByDay?.map((item: any) => {
                    return (
                      <Radio.Button key={item?.id} value={item?.id}>
                        {`${date?.dayName(item?.day)} - 
                      ${dayjs(
                        `${dayjs().format("YYYY-MM-DD")}T${
                          item?.startTime
                        }:00.000Z`
                      )
                        .tz(timeZone)
                        .format("h:mm A")} - 
                      ${dayjs(
                        `${dayjs().format("YYYY-MM-DD")}T${
                          item?.endTime
                        }:00.000Z`
                      )
                        .tz(timeZone)
                        .format("h:mm A")} 
                      `}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              ) : (
                "No time slots available on this date"
              )}
            </div>
          </Form.Item>
        </Form>
      </>
    );
  }
);
// export default StepOne;
