import React from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import {
  AppointmentServiceType,
  DoctorProfile,
} from "../../../../generated/graphql";

const { Option } = Select;

type Props = {
  physicianData: DoctorProfile;
  allAppoinments?: AppointmentServiceType[];
};

function StepOne(props: Props) {
  const { physicianData, allAppoinments } = props || {};
  console.log("physicianData", physicianData);
  const { first_name, last_name } = physicianData?.user || {};
  console.log("allAppoinments", allAppoinments);

  return (
    <>
      <h2>Request an Appointment</h2>
      <Form layout="vertical">
        <Form.Item label="Physician*" name="physicianName">
          <Select
            defaultValue={`${first_name}${last_name}`}
            placeholder="Dr. name"
            className="w-full"
          >
            <Option value={`${first_name}${last_name}`}>
              {physicianData ? `${first_name}  ${last_name}` : ""}
            </Option>
          </Select>
        </Form.Item>
        <div className="flex">
          <div className="w-5/6">
            <Form.Item label="Service*" name="service">
              <Select placeholder="Dr. Paul Wallner" className="w-full">
                {allAppoinments?.map((item) => (
                  <Option key={item?.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="w-1/6 ml-4">
            <Form.Item label="Charges">
              <div className="text-primary bg-gray-6 rounded flex items-center	justify-center h-12 w-full">
                $59.00
              </div>
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Requested Date*">
          {<DatePicker className="w-full" />}
        </Form.Item>
        <Form.Item label="Availability">
          <div className="flex flex-wrap">
            <div className="w-44 bg-gray-4 rounded flex items-center justify-center h-8 w-full mr-3 mb-3">
              07:00 am - 09:00 am
            </div>
            <div className="w-44 bg-cyan text-white rounded flex items-center justify-center h-8 w-full mr-3 mb-3">
              07:00 am - 09:00 am
            </div>
            <div className="w-44 bg-gray-4 rounded flex items-center justify-center h-8 w-full mr-3 mb-3">
              07:00 am - 09:00 am
            </div>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}
export default StepOne;
