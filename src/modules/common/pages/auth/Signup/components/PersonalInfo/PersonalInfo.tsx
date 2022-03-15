/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import {
  useGetStatesByCountryQuery,
  useGetCitiesByStateQuery,
  useCountriesQuery,
} from "../../../../../../../generated/graphql";

type props = {
  validateForm?: (value: any) => void;
  onFinishPersonalInfo?: (value: any) => void;
  onFinish?: (value: any) => void;
};

export default function PersonalInfo({ onFinish }: props) {
  const [form] = Form.useForm();
  const [countryId, setCountryId] = useState<number | undefined>();
  const [stateId, setStateId] = useState<number | undefined>();

  function selectCountryId(id: number): void {
    setCountryId(id);
  }

  function selectStateId(id: number): void {
    setStateId(id);
  }

  function disabledDate(current: any) {
    return current && current > dayjs().startOf("day");
  }

  const [getStatesByCountry] = useGetStatesByCountryQuery({
    variables: {
      input: countryId || 0,
    },
    pause: countryId === undefined,
  });

  const [getCityByState] = useGetCitiesByStateQuery({
    variables: {
      input: stateId || 0,
    },
    pause: stateId === undefined,
  });

  const [{ data }] = useCountriesQuery();
  const { countries } = data || {};

  const onFinishRegistrationFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishRegistrationFailed}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please enter your first name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please enter your last name",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Please enter your gender",
            },
          ]}
        >
          <Select placeholder="Gender" className="nb-select-input">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="not-to-answer">
              I prefer not to answer
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Date of Birth"
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
            className="w-full"
            disabledDate={disabledDate}
          />
        </Form.Item>
      </div>

      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          {
            required: true,
            message: "Please enter your email address",
          },
          {
            type: "email",
            message: "Email is invalid",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label="Contact Number"
          name="contact_number"
          rules={[
            {
              required: true,
              message: "Please enter your contact number",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Country"
          name="country_id"
          rules={[
            {
              required: true,
              message: "Please enter your country",
            },
          ]}
        >
          <Select
            onChange={(e) => {
              selectCountryId(e);
              form.setFieldsValue({
                state_id: null,
                city_id: null,
              });
            }}
            placeholder="Country"
          >
            {React.Children.toArray(
              countries?.map((el, i) => {
              return (
                <Select.Option value={el?.id}>
                  {el?.country_name}
                </Select.Option>
              );
            })
            )}
            
          </Select>
        </Form.Item>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label="State"
          name="state_id"
          rules={[
            {
              required: true,
              message: "Please enter your state",
            },
          ]}
        >
          <Select
            onChange={(e) => {
              selectStateId(e);
              form.setFieldsValue({
                city_id: null,
              });
            }}
            placeholder="State"
          >
            {React.Children.toArray(
            getStatesByCountry?.data?.getStatesByCountry?.map((el, i) => {
              return (
                <Select.Option value={el.id}>
                  {el?.state_name}
                </Select.Option>
              );
            })
            )}
            
          </Select>
        </Form.Item>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label="City"
          name="city_id"
          rules={[
            {
              required: true,
              message: "Please enter your city",
            },
          ]}
        >
          <Select placeholder="City">
            {React.Children.toArray(
              getCityByState?.data?.getCitiesByState?.map((el, i) => {
                return (
                  <Select.Option value={el.id}>{el?.city_name}</Select.Option>
                );
              })
            )}
          </Select>
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Postal Code"
          name="zip_code"
          rules={[
            {
              required: true,
              message: "Please enter your postal code",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex justify-end">
        <Form.Item>
          <Button
            htmlType="submit"
            className="ant-btn ant-btn-primary ant-btn-block nb-button"
            type="primary"
          >
            Next
          </Button>
        </Form.Item>
      </div>
      <div className="flex justify-center mt-8">
        <p className="text-secondary-1">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-primary">Login</span>
          </Link>
        </p>
      </div>
    </Form>
  );
}
