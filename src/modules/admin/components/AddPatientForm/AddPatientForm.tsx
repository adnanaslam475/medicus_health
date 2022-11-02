import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import ReactPhoneInput from "react-phone-input-2";
import {
  useCheckEmailAvailabilityQuery,
  useCountriesQuery,
  useGetCitiesByStateQuery,
  useGetStatesByCountryQuery,
} from "generated/graphql";
import _classes from "./AddPatientForm.module.scss";
import "react-phone-input-2/lib/style.css";
import { isChrome } from "utils/helper";

type Props = {
  loading?: boolean;
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
};

export const AddPatientForm = React.forwardRef(function AddPhysicianForm(
  props: Props,
  ref: any
) {
  const [formInstance] = Form.useForm();
  const [countryId, setCountryId] = useState<number | undefined>();
  const [stateId, setStateId] = useState<number | undefined>();
  const [countryCode, setCountryCode] = useState(null);
  const [form] = Form.useForm();
  const { onFinish, loading } = props || {};

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

  const onContactNoValidation = (_rule: any, value: string, callback: any) => {
    console.log("value", value);
    if (value?.trim().length === 0 || !value) {
      // callback(t("contact_number_message"));
      callback("Please enter your contact number");
    } else if (value?.trim().length < 9) {
      // callback(t("contact_number_message"));
      callback("Please enter the correct contact number");
    } else {
      callback();
    }
  };

  const [userEmail, setUserEmail] = useState("");
  const [result] = useCheckEmailAvailabilityQuery({
    variables: {
      emailAvailableInput: { email: String(userEmail) },
    },
    pause: !userEmail,
  });
  const { data: emailData, fetching } = result;

  useEffect(() => {
    if (userEmail && !fetching) {
      formInstance.validateFields(["email"]);
    }
  }, [emailData]);
  const emailValidator = async (rule: any, value: string) => {
    if (!value?.length) return Promise.resolve();
    setUserEmail(value?.trim());
    if (
      value?.trim().length &&
      value.includes("@") &&
      value.includes(".") &&
      !fetching &&
      !emailData?.checkEmailAvailability?.isEmailAvailable
    ) {
      // return Promise.reject(t("email_already_exist"));
      return Promise.reject("Email already exist.");
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={formInstance}
      onFinish={onFinish}
      scrollToFirstError
      layout="vertical"
    >
      <div className="flex flex-row gap-3">
        <Form.Item
          label="First name"
          name="firstName"
          rules={[
            { required: true, message: "First name is required." },
            { max: 50, message: "First name is too long." },
          ]}
          className="flex-1"
        >
          <Input max={50} />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lastName"
          rules={[
            { required: true, message: "Last name is required." },
            { max: 50, message: "Last name is too long." },
          ]}
          className="flex-1"
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex flex-row gap-0">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email." },
            { max: 50, message: "Email is too long." },
            { validator: emailValidator },
          ]}
          className="flex-1"
        >
          <Input />
        </Form.Item>
      </div>

      <div
        className={`${_classes.contactNo} flex flex-col md:flex-row gap-4 w-full`}
      >
        {/* <Form.Item
          className="flex-1"
          label="Contact #"
          name="contact_number"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter your contact number",
          //   },
          // ]}
        >
          <Input type="tel" />
        </Form.Item> */}
        <Form.Item
          // className="flex-1"
          // label={t("contact_number")}
          label="Contact #"
          name="contact_number"
          validateFirst
          rules={[
            {
              // required: true,
              validator: onContactNoValidation,
            },
          ]}
        >
          {/* <Input /> */}
          <ReactPhoneInput
            country={"us"}
            placeholder={"Enter your contact number"}
            enableAreaCodes
            onChange={(_value, country: any) => {
              const code = country?.dialCode;
              if (code) {
                // setCountryCode(code);
                // form.setFieldsValue({
                //   contact_number: code
                // });
              }
            }}
            value={countryCode}
          />
        </Form.Item>
      </div>
      {/* Address, City, State, Country Postal Address */}
      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label="Street address"
          name="streetAddress"
          rules={[
            {
              
              message: "Please enter your street address",
            },
            {
              max: 100,
              message: "Street address is too long.",
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
        // rules={[
        //   {
        //     required: true,
        //     message: "Please enter your country",
        //   },
        // ]}
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
        // rules={[
        //   {
        //     required: true,
        //     message: "Please enter your state",
        //   },
        // ]}
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

        {/* <Form.Item
          className="flex-1"
          label="Postal code"
          name="postalCode"
          rules={[
            {
              required: true,
              message: "Please enter your postal code",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item> */}
      </div>
      <Form.Item>
        <div className="flex items-center justify-end">
          <Button
            className={`${isChrome && 'antCustomBtn'}`}
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            Add patient
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});
