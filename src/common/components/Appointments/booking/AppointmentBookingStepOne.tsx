import React, { useEffect, useState } from "react";
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
    const { physicianData, onFinish } = props || {};
    const { first_name, last_name } = physicianData?.user || {};
    const [serviceInfo, setServiceInfo] = useState<any>();

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
      formInstance.setFieldsValue({
        physicianName: appoinmentDetails?.stepOne?.physicianName,
        service: appoinmentDetails?.stepOne?.service,
        // charges: appoinmentDetails?.stepOne?.serviceInfo?.price,
        requestedDate: appoinmentDetails?.stepOne?.requestedDate,
      });
    }

    function handleServiceChange(event: any) {
      let charge = allAppoinments?.find(
        (serviceType) => serviceType.id === event
      );
      setServiceInfo(charge);
    }

    function disabledDate(current: any) {
      if (
        serviceInfo?.name === "Consultation" ||
        serviceInfo?.name === "consultation"
      ) {
        return dayjs(current).isBefore(dayjs().add(1, "day"));
      } else if (serviceInfo?.name === "Second Opinion") {
        return dayjs(current).isBefore(dayjs().add(4, "day"));
      }
      return true;
    }

    function onFinishLocal(values: any) {
      saveStepOne?.({ ...values, serviceInfo });
    }

    const allAppoinments = data?.data?.appointmentServiceTypes;
    return (
      <>
        <h2>Request an Appointment</h2>
        <Form form={formInstance} layout="vertical" onFinish={onFinishLocal}>
          <Form.Item label="Physician*" name="physicianName">
            <Select placeholder="Dr. name" className="w-full">
              <Option value={`${first_name}${last_name}`}>
                {physicianData ? `${first_name}  ${last_name}` : ""}
              </Option>
            </Select>
          </Form.Item>
          <div className="flex">
            <div className="w-5/6">
              <Form.Item label="Service*" name="service">
                <Select
                  placeholder="Service Type"
                  className="w-full"
                  onChange={(event) => handleServiceChange(event)}
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
              <Form.Item label="Charges">
                <div className="text-primary bg-gray-6 rounded flex items-center	justify-center h-12 w-full">
                  {`$${serviceInfo?.price ? serviceInfo?.price : ""}`}
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
          <Form.Item label="Availability">
            <div className="flex flex-wrap availability-label">
              <Radio.Group defaultValue="a">
              <Radio.Button value="a">07:00 am - 09:00 am</Radio.Button>
              <Radio.Button value="b">07:00 am - 09:00 am</Radio.Button>
              <Radio.Button value="c">07:00 am - 09:00 am</Radio.Button>
              </Radio.Group>
            </div>
            <Form.Item label="Availability*" name="availability">
              <Select placeholder="Availability" className="w-full">
                {scheduleDetails?.doctorSchedules?.map((item: any) => (
                  <Option key={item?.id} value={item?.id}>
                    {`${date.time24HrConvert(item?.startTime)} -
                  ${date.time24HrConvert(item?.endTime)}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>
        </Form>
      </>
    );
  }
);
// export default StepOne;
