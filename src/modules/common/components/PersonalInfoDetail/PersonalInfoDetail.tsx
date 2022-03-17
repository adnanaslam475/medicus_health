/* eslint-disable react/jsx-key */
import { Form, Input, Button, Checkbox, Select } from "antd";
import React from "react";

type Props = {
  onFinish?: (values: {
    firstName: string;
    lastName: string;
    gender: string;
    dateOfbirth: string;
    conntactNumber: string;
    email: string;
    password: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    streetAddress: string;
    maritalStatus: string;
    children: string;
    occupation: string;
    occupationalExposure: string;
    pets: string;
  }) => void;
  loading?: boolean;
  response?: any;
};

function PersonalInfoDetail(props: Props) {
  const { onFinish, loading, response } = props || {};
  // const onFinish = (values: any) => {
  //   console.log("Success:", values);
  // };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  // const { error, fetching } = result;

  return (
    <div className="customList mt-4">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <ul>
          <div className="border border-gray-3 px-0 rounded custom-list-items">
            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">First Name</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="firstName">
                    <Input size="large" placeholder="First Name" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Last Name</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="lastName">
                    <Input size="large" placeholder="last Name" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Gender</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="gender">
                    <Input size="large" placeholder="Gender" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Date of Birth</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="dateOfbirth">
                    <Input size="large" placeholder="Date of Birth" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Contact Number</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="conntactNumber">
                    <Input size="large" placeholder="Contact Number" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Email Address</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="email">
                    <Input size="large" placeholder="Email Address" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Password</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="password">
                    <Input size="large" placeholder="Password" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Country</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="country">
                    <Input size="large" placeholder="Country" />
                  </Form.Item>{" "}
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">State</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="state">
                    <Input size="large" placeholder="State" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">City</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="city">
                    <Input size="large" placeholder="City" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Postal Code</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="postalCode">
                    <Input size="large" placeholder="Postal Code" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Street Address</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="streetAddress">
                    <Input size="large" placeholder="Street Address" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Marital Status</div>
                <div className="w-1/2 text-gray-1">
                  <Form.Item noStyle name="maritalStatus">
                    <Input size="large" placeholder="Marital Status" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">
                  Do You have any children?
                </div>
                <div className="w-1/2 text-gray-1">
                  <Form.Item noStyle name="children">
                    <Input size="large" placeholder="No. of children" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">
                  What is your Occupation?
                </div>
                <div className="w-1/2 text-gray-1">
                  <Form.Item noStyle name="occupation">
                    <Input size="large" placeholder="Occupation" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">
                  Do you have any Occupational Exposure?
                </div>
                <div className="w-1/2 text-gray-1">
                  <Form.Item noStyle name="occupationalExposure">
                    <Input size="large" placeholder="Occupational Exposure" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Do you have any pets?</div>
                <div className="w-1/2 text-gray-1">
                  <Form.Item noStyle name="pets">
                    <Input size="large" placeholder="Any Pets" />
                  </Form.Item>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </Form>
    </div>
  );
}
export default PersonalInfoDetail;
