import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Radio, Select } from "antd";
import { User } from "../../../../generated/graphql";
import dayjs from "dayjs";
import moment from "moment";
import CitySelectDropDown from "./CitySelectDropDown";
import StateSelectDropDown from "./StateSelectDropDown";
import CountrySelectDropDown from "./CountrySelectDropDown";
import _classes from "./PersonalInfoDetail.module.scss";

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
  const [radioOccupationalExposure, setradioOccupationalExposure] = useState(
    user?.patientProfile?.occupationalExposure
  );

  const {
    first_name,
    last_name,
    gender,
    date_of_birth,
    contact_number,
    email,
    country_id,
    state_id,
    city_id,
    zip_code,
    streetAddress,
  } = user || {};

  const {
    children,
    maritalStatus,
    occupation,
    occupationalExposure,
    exposureDuration,
    pets,
  } = user?.patientProfile || {};

  useEffect(() => {
    if (ref) {
      ref.current = formInstance;
    }
    if (user) {
      prepareAndSetEditPayload();
      setradioChildren(
        children === 0 || children === undefined || children === null
          ? false
          : true
      );
    }
  }, [user]);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: first_name,
      lastName: last_name,
      gender: gender,
      date_of_birth: date_of_birth ? moment(date_of_birth) : "",
      conntactNumber: contact_number,
      email: email,
      password: "",
      country_id: country_id,
      state_id: state_id,
      city_id: city_id,
      postalCode: zip_code,
      streetAddress: streetAddress,
      maritalStatusExist: false,
      maritalStatus: maritalStatus,
      childrenExists: false,
      children: children,
      occupation: occupation,
      occupationalExposure: occupationalExposure,
      exposureDuration: exposureDuration,
      pets: pets,
    });
  }

  function disabledDate(current: any) {
    return current && current > dayjs().startOf("day");
  }

  const [countryId, setCountryId] = useState<number | undefined | null>(
    user?.country_id
  );
  const [stateId, setStateId] = useState<number | undefined | null>(
    user?.state_id
  );

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
                <div className="w-1/2 sm:w-1/3 text-gray-1">First Name</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "First Name is required",
                      },
                    ]}
                    className="bottom-margin-0"
                  >
                    <Input size="large" placeholder="First Name" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">Last Name</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Last Name is required",
                      },
                    ]}
                    className="bottom-margin-0"
                  >
                    <Input size="large" placeholder="last Name" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">Gender</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
                  <Form.Item className="bottom-margin-0" name="gender">
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">Date of Birth</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
                  <Form.Item
                    className="flex-1 bottom-margin-0"
                    name="date_of_birth"
                    rules={[
                      {
                        required: true,
                        message: "Please select date of birth",
                      },
                    ]}
                  >
                    <DatePicker
                      name="date_of_birth"
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">Contact Number</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
                  <Form.Item noStyle name="conntactNumber">
                    <Input size="large" placeholder="Contact Number" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">Email Address</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                    className="bott-om-margin-0"
                  >
                    <Input size="large" placeholder="Email Address" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">Password</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
                  <Form.Item name="password" className="bottom-margin-0">
                    <Input.Password size="large" placeholder="Password" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">Country</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">State</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">City</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
                  <CitySelectDropDown stateId={stateId} />
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">Postal Code</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
                  <Form.Item noStyle name="postalCode">
                    <Input
                      size="large"
                      placeholder="Postal Code"
                      type="number"
                    />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">Street Address</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}>
                  <Form.Item noStyle name="streetAddress">
                    <Input size="large" placeholder="Street Address" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">Marital Status</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 `}>
                  <Form.Item className="mb-0">
                    <Form.Item className="mb-0" name="maritalStatus">
                      <Select placeholder="Marital Status" size="large">
                        <Select.Option value="Single">Single</Select.Option>
                        <Select.Option value="Married">Married</Select.Option>
                        <Select.Option value="Widower">Widower</Select.Option>
                        <Select.Option value="Divorced">Divorced</Select.Option>
                      </Select>
                    </Form.Item>
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  Do you have any children?
                </div>
                <div className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 `}>
                  <Form.Item className="mb-0" name="childrenExists">
                    <Radio.Group
                      defaultValue={radioChildren}
                      onChange={(e) => {
                        setradioChildren(e.target.value);
                      }}
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                    {radioChildren && (
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  What is your Occupation?
                </div>
                <div className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 `}>
                  <Form.Item noStyle name="occupation">
                    <Input size="large" placeholder="Occupation" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  Do you have any Occupational Exposure?
                </div>
                <div className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 `}>
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

                  {radioOccupationalExposure === "Yes" ? (
                    <Form.Item
                      className="mb-0"
                      name="exposureDuration"
                      label="Occupational Exposure duration?"
                    >
                      <Select
                        placeholder="Occupational Exposure Duration"
                        size="large"
                      >
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
                  ) : null}
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2  sm:w-1/3 text-gray-1">Do you have any pets?</div>
                <div className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 `}>
                  <Form.Item className="mb-0" name="pets">
                    <Radio.Group>
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
