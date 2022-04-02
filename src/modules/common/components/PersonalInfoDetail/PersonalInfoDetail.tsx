import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Select } from "antd";
import { User } from "../../../../generated/graphql";

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
    // patientProfile:{
    //   maritalStatus: string;
    //   // profileImage
    //   children: string;
    //   occupation: string;
    //   occupationalExposure: string;
    //   pets: string;
    // }
    maritalStatus: string;
    children: string;
    occupation: string;
    occupationalExposure: string;
    pets: string;
  }) => void;
  user?: User;
  loading?: boolean;
};

export const PersonalInfoDetail = React.forwardRef(function PersonalInfoDetail(
  props: Props,
  ref: any
) {
  const [formInstance] = Form.useForm();
  const { loading, user, onFinish } = props || {};
  const [radioChildren, setradioChildren] = useState(true);

  useEffect(() => {
    if (ref) {
      ref.current = formInstance;
    }
    if (user) {
      prepareAndSetEditPayload();
    }
  }, [user]);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: user?.first_name,
      lastName: user?.last_name,
    });
  }

  return (
    <div className="custom-list mt-4">
      <Form form={formInstance} onFinish={onFinish}>
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
                  <Form.Item className="mb-0" name="gender">
                    <Select placeholder="Gender" size="large">
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                      <Select.Option value="prefer not to answer">
                        prefer not to answer
                      </Select.Option>
                    </Select>
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

            {/* <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Confirm Password</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="password">
                    <Input size="large" placeholder="Confirm Password" />
                  </Form.Item>
                </div>
              </div>
            </li> */}

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Country</div>
                <div className="w-1/2 text-secondary">
                  <Form.Item noStyle name="country">
                    <Input size="large" placeholder="Country" />
                  </Form.Item>
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
                  <Form.Item className="mb-0" name="maritalStatus">
                    <Select placeholder="Marital Status" size="large">
                      <Select.Option value="single">Single</Select.Option>
                      <Select.Option value="married">Married</Select.Option>
                      <Select.Option value="widower">Widower</Select.Option>
                      <Select.Option value="divorced">Divorced</Select.Option>
                    </Select>
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
                  <Form.Item className="mb-0" name="children">
                    <Radio.Group
                      onChange={(e) => {
                        setradioChildren(e.target.value);
                      }}
                    >
                      <Radio value={1}>Yes</Radio>
                      <Radio value={0}>No</Radio>
                    </Radio.Group>
                    {!!radioChildren && (
                      <Form.Item className="mb-0" name="children">
                        <Input size="large" placeholder="No. of children" />
                      </Form.Item>
                    )}
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
                  {/* <Form.Item className="mb-0" name="occupationalExposure">
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={0}>No</Radio>
                    </Radio.Group>
                  </Form.Item> */}
                  <Form.Item className="mb-0" name="gender">
                    <Select placeholder="Gender" size="large">
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                      <Select.Option value="prefer not to answer">
                        prefer not to answer
                      </Select.Option>
                    </Select>
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
});
