import React, { useEffect } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import {
  AppointmentServiceType,
  DoctorProfile,
} from "../../../../generated/graphql";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";

const { Option } = Select;

type Props = {
  physicianData?: DoctorProfile;
  allAppoinments?: AppointmentServiceType[];
  onFinish?: ((values: any) => void) | undefined;
};

export const AppointmentBookingStepOne = React.forwardRef(
  function AppointmentBookingStepOne(props: Props, ref: any) {
    const [formInstance] = Form.useForm();

    useEffect(() => {
      if (ref) {
        ref.current = formInstance;
      }
    }, [props]);
    // const FormItem = Form.Item;
    const { saveStepOne } = useBookAppointment();
    const { physicianData, allAppoinments, onFinish } = props || {};
    // console.log("physicianData", physicianData);
    const { first_name, last_name } = physicianData?.user || {};
    // console.log("allAppoinments", allAppoinments);
    // console.log("FormItem",FormItem.service)
    const [form] = Form.useForm();

    function onFinishLocal(values: any) {
      console.log("onFinishLocal called",values)
      saveStepOne?.(values);
    }

    // function handleServiceChange() {
    //   let serviceValue = form.getFieldValue("service");
    //   console.log("serviceValue", serviceValue);
    // }

    return (
      <>
        <h2>Request an Appointment</h2>
        <Form form={formInstance} layout="vertical" onFinish={onFinishLocal} >
          <Form.Item label="Physician*" name="physicianName">
            <Select
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
                <Select
                  placeholder="Dr. Paul Wallner"
                  className="w-full"
                  // onChange={handleServiceChange}
                >
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
          <Form.Item label="Requested Date*" name="requestedDate">
            <DatePicker
              placeholder="mm/dd/yy"
              format={"MM-DD-YYYY"}
              className="w-full"
            />
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

          <Form.Item>
            <div className="flex items-center justify-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </>
    );
  }
);
// export default StepOne;
