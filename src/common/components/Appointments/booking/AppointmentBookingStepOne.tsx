import React, { useEffect, useState } from "react";
import { Form, Radio, Select, DatePicker, Input } from "antd";
import {
  AppointmentServiceType,
  DoctorProfile,
  useDoctorSchedulesQuery,
  useGetAllAppointmentServiceTypesQuery,
  User,
} from "generated/graphql";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";
import { date } from "../../../utils";

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
  physicianData?: DoctorProfile;
  allAppoinments?: AppointmentServiceType[];
  onFinish?: ((values: any) => void) | undefined;
  adminData?: AdminData;
  adminApp_Details?: DoctorData;
};

export const AppointmentBookingStepOne = React.forwardRef(
  function AppointmentBookingStepOne(props: Props, ref: any) {
    const [formInstance] = Form.useForm();
    const [data] = useGetAllAppointmentServiceTypesQuery();
    const { saveStepOne, data: appoinmentDetails } = useBookAppointment();
    const { physicianName, service, price, requestedDate, availability } =
      appoinmentDetails?.stepOne || {};
    const { physicianData, onFinish, adminData, adminApp_Details } = props || {};
    const { first_name, last_name, id } = physicianData?.user || {};

    const { doctor_Id, doctor_first_name, doctor_last_name } =
      adminApp_Details?.doctor || {};
    const [serviceInfo, setServiceInfo] = useState<AppointmentServiceType[]>();
    //   GET ID FROM URL
    const { query } = useRouter();
    const [doctorId, setDoctorId] = useState<number>();

    const [{ data: scheduleDetails }] = useDoctorSchedulesQuery({
      variables: {
        doctorId:
          Number(query?.id) ||
          doctorId ||
          Number(id) ||
          Number(adminApp_Details?.doctor?.doctor_Id),
      },
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
        physicianName: adminApp_Details?.doctor
          ? `${doctor_first_name}${doctor_last_name}`
          : `${first_name}${last_name}`,
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

    const { physicianList, patientList } = adminData || {};
    const PhysicianHandler = (physicianId: string) => {
      let doctorId = physicianId.split(":")[0];
      setDoctorId(Number(doctorId));
    };

    return (
      <>
        <h2>Request an Appointment</h2>
        <Form form={formInstance} layout="vertical" onFinish={onFinishLocal}>
          {adminData ? (
            <Form.Item label="Physicians*" name="physician">
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
                {physicianList?.map((item) => (
                  <Option
                    key={`${item?.first_name} ${item?.last_name}`}
                    value={`${item.id}:${item?.first_name} ${item?.last_name}`}
                  >
                    {`${item?.first_name} ${item?.last_name}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item label="Physician*" name="physicianName">
              <Input placeholder="Dr. name" className="w-full" readOnly />
            </Form.Item>
          )}
          {adminData && (
            <Form.Item label="Patient*" name="patient">
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
                {patientList?.map((item) => (
                  <Option
                    key={item?.first_name}
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
