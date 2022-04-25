import React, { SyntheticEvent, useEffect, useState } from "react";
import { Form, Radio, Button, Select, DatePicker, Input } from "antd";
import {
  AppointmentServiceType,
  DoctorProfile,
  useDoctorSchedulesQuery,
  useGetAllAppointmentServiceTypesQuery,
} from "../../../../generated/graphql";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";
import dayjs from "dayjs";
import { getUserData } from "../../../utils/userData";
import { useRouter } from "next/router";
import { date } from "../../../utils";

const { Option } = Select;

type Props = {
  physicianData?: DoctorProfile;
  allAppoinments?: AppointmentServiceType[];
  onFinish?: ((values: any) => void) | undefined;
};

export const AppointmentBookingStepOne = React.forwardRef(
  function AppointmentBookingStepOne(props: Props, ref: any) {
    const [formInstance] = Form.useForm();
    const [data] = useGetAllAppointmentServiceTypesQuery();
    const { saveStepOne, data: appoinmentDetails } = useBookAppointment();
    const { physicianName, service, price, requestedDate, availability } =
      appoinmentDetails?.stepOne || {};
    const { physicianData, onFinish } = props || {};
    const { first_name, last_name } = physicianData?.user || {};
    const [serviceInfo, setServiceInfo] = useState<AppointmentServiceType[]>();

    //   GET ID FROM URL
    const { query } = useRouter();

    const [{ data: scheduleDetails }] = useDoctorSchedulesQuery({
      variables: { doctorId: Number(query?.id) },
    });

    useEffect(() => {
      if (ref) {
        ref.current = formInstance;
      }
    }, []);

    useEffect(() => {
      if (appoinmentDetails) {
        prepareAndSetEditPayload();
      }
    }, [appoinmentDetails]);

    function prepareAndSetEditPayload() {
      console.log(physicianName);
      formInstance.setFieldsValue({
        physicianName: `${first_name}${last_name}`,
        service: service,
        charges: price,
        requestedDate: requestedDate,
        availability: availability,
      });
    }

    function handleServiceChange(value: any) {
      let charge = allAppoinments?.filter(
        (serviceType) => serviceType.id === value
      );
      setServiceInfo(charge);
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

    function onFinishLocal(values: any) {
      saveStepOne?.({ ...values, serviceInfo });
    }

    const allAppoinments = data?.data?.appointmentServiceTypes;

    const isShow =
      scheduleDetails?.doctorSchedules &&
      scheduleDetails?.doctorSchedules.length > 0;
    return (
      <>
        <h2>Request an Appointment</h2>
        <Form form={formInstance} layout="vertical" onFinish={onFinishLocal}>
          <Form.Item label="Physician*" name="physicianName">
            <Input placeholder="Dr. name" className="w-full" readOnly />
          </Form.Item>
          <div className="flex">
            <div className="w-5/6">
              <Form.Item label="Service*" name="service">
                <Select
                  placeholder="Service Type"
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
                  ${serviceInfo &&
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
          <Form.Item label="Availability*" name="availability">
            <div className="flex flex-wrap availability-label">
              {isShow ? (
                <Radio.Group
                  defaultValue={appoinmentDetails?.stepOne?.availability}
                >
                  {scheduleDetails?.doctorSchedules?.map((item: any) => (
                    <Radio.Button
                      key={item?.id}
                      value={item?.id}
                    >{`${date.time24HrConvert(item?.startTime)} -
              ${date.time24HrConvert(item?.endTime)}`}</Radio.Button>
                  ))}
                </Radio.Group>
              ) : (
                "No Time Slots Available"
              )}
            </div>
          </Form.Item>
        </Form>
      </>
    );
  }
);
// export default StepOne;
