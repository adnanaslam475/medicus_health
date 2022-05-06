import React from "react";
import { Form, Input } from "antd";
import { GetAppointmentByIdQuery } from "generated/graphql";
type Props = {
  appoinmentDetails?: GetAppointmentByIdQuery | undefined;
};

function AppointmentInfo(props: Props) {
  const { appoinmentDetails } = props;
  const { first_name, last_name } =
    appoinmentDetails?.appointment?.doctor || {};

  const { id, status, requestedDate, appointmentTimeSlots } =
    appoinmentDetails?.appointment || {};

  const { name, price } = appoinmentDetails?.appointment?.serviceType || {};

  function timeSlots() {
    if (appointmentTimeSlots) {
      let selectedTimeSlots = appointmentTimeSlots?.find(
        (item) => item?.selected == true
      );

      return selectedTimeSlots;
    }
  }

  return (
    <div className="">
      {/* <Form layout="vertical" className="w-1/2">
				<div className="grid grid-cols-2 gap-4">
					<Form.Item
						label="First Name"
						className="text-secondary"
						name="firstName"
					>
						<Input disabled />
					</Form.Item>

      <Form layout="vertical" className="w-1/2">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="First Name"
            className="text-secondary"
            name="firstName"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Last Name"
            className="text-secondary"
            name="lastName"
          >
            <Input disabled />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Gender" className="text-secondary" name="gender">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            className="text-secondary"
            name="dob"
          >
            <Input disabled />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Email Address"
            className="text-secondary"
            name="emailaddress"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item label="Cell Number" className="text-secondary" name="cell">
            <Input disabled />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Country" className="text-secondary" name="country">
            <Input disabled />
          </Form.Item>

          <Form.Item label="City" className="text-secondary" name="city">
            <Input disabled />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Material Status"
            className="text-secondary"
            name="status"
          >
            <Input disabled />
          </Form.Item>

					<Form.Item
						label="Do you have any Occupational Exposure?"
						className="text-secondary"
						name="Exposure"
					>
						<Input disabled />
					</Form.Item>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Form.Item
						label="Do you have any pets?"
						className="text-secondary"
						name="pets"
					>
						<Input disabled />
					</Form.Item>
				</div>
			</Form> */}
    </div>
  );
  //       s
}
export default AppointmentInfo;
