import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Radio, Select } from "antd";
import { User } from "../../../../generated/graphql";
import dayjs from "dayjs";
import moment from "moment";
import CitySelectDropDown from "./CitySelectDropDown";
import StateSelectDropDown from "./StateSelectDropDown";
import CountrySelectDropDown from "./CountrySelectDropDown";

type Props = {
  onFinish?: (values: {
    firstName: string;
    lastName: string;
    gender: string;
    date_of_birth: string;
    conntactNumber: string;
    email: string;
    password: string;
    country: string;
    state: string;
    city: number;
    postalCode: string;
    streetAddress: string;
    maritalStatus: string;
    profileImage: string;
    children: string;
    occupation: string;
    occupationalExposure: string;
    pets: string;
    petsAnswer: string;
    exposureDuration: string;
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
  const [radioMaritalStatus, setradioMaritalStatus] = useState(true);
  const [radioOccupationalExposure, setradioOccupationalExposure] =
    useState(true);

  useEffect(() => {
    if (ref) {
      ref.current = formInstance;
    }
    if (user) {
      prepareAndSetEditPayload();
    }
  }, [user]);

  // console.log(user, "user");

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: user?.first_name,
      lastName: user?.last_name,
      gender: user?.gender,
      // date_of_birth: convertBirthDateToUTC(user?.date_of_birth),
      date_of_birth: moment(user?.date_of_birth),
      conntactNumber: user?.contact_number,
      email: user?.email,
      password: "",
      country_id: user?.country_id,
      state_id: user?.state_id,
      city_id: user?.city_id,
      postalCode: user?.zip_code,
      streetAddress: user?.streetAddress,
      maritalStatusExist: false,
      maritalStatus: user?.patientProfile?.maritalStatus,
      childrenExists: false,
      children: user?.patientProfile?.children,
      occupation: user?.patientProfile?.occupation,
      occupationalExposure: user?.patientProfile?.occupationalExposure,
      exposureDuration: user?.patientProfile?.exposureDuration,
      pets: user?.patientProfile?.pets,
    });
  }

  function disabledDate(current: any) {
    return current && current > dayjs().startOf("day");
  }

  const [countryId, setCountryId] = useState<number | undefined>(
    user?.country_id
  );
  const [stateId, setStateId] = useState<number | undefined>(user?.state_id);

  function selectCountryId(id: number): void {
    setCountryId(id);
  }

  function selectStateId(id: number): void {
    setStateId(id);
  }

  return (
    <div className="custom-list mt-4">
      <Form form={formInstance} onFinish={onFinish} layout="vertical">
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
                  <Form.Item
                    className="flex-1"
                    name="date_of_birth"
                    rules={[
                      {
                        required: true,
                        message: "Please select date of birth",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="mm/dd/yy"
                      format={"MM-DD-YYYY"}
                      className="w-full"
                      disabledDate={disabledDate}
                    />
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
                  <Form.Item name="password">
                    <Input size="large" placeholder="Password" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Country</div>
                <div className="w-1/2 text-secondary">
                  <CountrySelectDropDown
                    onChange={(e) => {
                      selectCountryId(e);
                      formInstance.setFieldsValue({
                        state_id: null,
                        city_id: null,
                      });
                    }}
                  />
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">State</div>
                <div className="w-1/2 text-secondary">
                  <StateSelectDropDown
                    countryId={countryId}
                    onChange={(e) => {
                      selectStateId(e);
                      formInstance.setFieldsValue({
                        city_id: null,
                      });
                    }}
                  />
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">City</div>
                <div className="w-1/2 text-secondary">
                  <CitySelectDropDown stateId={stateId} />
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
                  <Form.Item className="mb-0" name="maritalStatusExist">
                    <Radio.Group
                      onChange={(e) => {
                        setradioMaritalStatus(e.target.value);
                      }}
                    >
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Radio.Group>

                    {!!radioMaritalStatus && (
                      <Form.Item className="mb-0" name="maritalStatus">
                        <Select placeholder="Marital Status" size="large">
                          <Select.Option value="Single">Single</Select.Option>
                          <Select.Option value="Married">Married</Select.Option>
                          <Select.Option value="Widower">Widower</Select.Option>
                          <Select.Option value="Divorced">
                            Divorced
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    )}
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
                  <Form.Item className="mb-0" name="childrenExists">
                    <Radio.Group
                      onChange={(e) => {
                        setradioChildren(e.target.value);
                      }}
                    >
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
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
                  <Form.Item className="mb-0" name="occupationalExposure">
                    <Radio.Group
                      onChange={(e) => {
                        setradioOccupationalExposure(e.target.value);
                      }}
                    >
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Radio.Group>
                  </Form.Item>

                  {!!radioOccupationalExposure && (
                    <Form.Item
                      className="mb-0"
                      name="exposureDuration"
                      label="Occupational Exposure duration?"
                    >
                      <Select
                        placeholder="Occupational Exposure Duration"
                        size="large"
                      >
                        <Select.Option value="None">None</Select.Option>
                        <Select.Option value="Less than a year (<1)">
                          Less than a year
                        </Select.Option>
                        <Select.Option value="More than a year (1+)">
                          More than a year (1+)
                        </Select.Option>
                        <Select.Option value="More than three to five years (3-5)">
                          More than three to five years (3-5)
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  )}
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 text-gray-1">Do you have any pets?</div>
                <div className="w-1/2 text-gray-1">
                  <Form.Item className="mb-0" name="pets">
                    <Radio.Group value="No">
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Radio.Group>
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
