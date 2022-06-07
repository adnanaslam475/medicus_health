import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  useCountriesQuery,
  useGetCitiesByStateQuery,
  useGetStatesByCountryQuery,
} from "../../../../generated/graphql";

type Props = {
  onFinish?: (values: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    state: string;
    city: number;
    postalCode: string;
    streetAddress: string;
    profileImage: string;
  }) => void;
  // user?: User;
  // loading?: boolean;
};

export const AddPatientForm = React.forwardRef(function AddPhysicianForm(
  props: Props,
  ref: any
) {
  const [formInstance] = Form.useForm();
  const [countryId, setCountryId] = useState<number | undefined>();
  const [stateId, setStateId] = useState<number | undefined>();
  const [form] = Form.useForm();
  const { onFinish } = props || {};

  function selectCountryId(id: number): void {
    setCountryId(id);
  }

  function selectStateId(id: number): void {
    setStateId(id);
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

  return (
    <Form form={formInstance} onFinish={onFinish} layout="vertical">
      <div className="flex flex-row gap-3">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "First Name!" }]}
          className="flex-1"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: "Last Name!" }]}
          className="flex-1"
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex flex-row gap-0">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true }]}
          className="flex-1"
        >
          <Input />
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
              message: "Enter Contact Number",
            },
          ]}
        >
          <Input type="tel" />
        </Form.Item>
      </div>
      {/* Address, City, State, Country Postal Address */}
      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label="Street Address"
          name="streetAddress"
          rules={[
            {
              required: true,
              message: "Please enter your street address",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label="Country"
          name="country"
          rules={[
            {
              required: true,
              message: "Please enter your country",
            },
          ]}
        >
          <Select
            showSearch
            filterOption={(input, country: any) =>
              country.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
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

        <Form.Item
          className="flex-1"
          label="State"
          name="state"
          rules={[
            {
              required: true,
              message: "Please enter your state",
            },
          ]}
        >
          <Select
            showSearch
            filterOption={(input, state: any) =>
              state.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
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
                  <Select.Option value={el.id}>{el?.state_name}</Select.Option>
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
              required: false,
              message: "Please enter your city",
            },
          ]}
        >
          <Select
            placeholder="City"
            showSearch
            filterOption={(input, city: any) =>
              city.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
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
          name="postalCode"
          rules={[
            {
              required: true,
              message: "Please enter your postal code",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </div>
      <Form.Item>
        <div className="flex items-center justify-end">
          <Button type="primary" htmlType="submit">
            Add Patient
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});

// export default AddPhysicianForm;
