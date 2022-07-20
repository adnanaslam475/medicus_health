/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Checkbox } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import {
  useGetStatesByCountryQuery,
  useGetCitiesByStateQuery,
  useCountriesQuery,
  useCheckEmailAvailabilityQuery,
} from "generated/graphql";
import { useTranslations } from "next-intl";

type props = {
  validateForm?: (value: any) => void;
  onFinishPersonalInfo?: (value: any) => void;
  onFinish?: (value: any) => void;
};

export default function PersonalInfo({ onFinish }: props) {
  const t = useTranslations("PersonalInfo");
  const [form] = Form.useForm();
  const [countryId, setCountryId] = useState<number | undefined>();
  const [stateId, setStateId] = useState<number | undefined>();
  const [terms, setTerms] = useState(false);

  function selectCountryId(id: number): void {
    setCountryId(id);
    form.resetFields(["state_id", "city_id"]);
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
      form.validateFields(["email"]);
    }
  }, [emailData]);
  const emailValidator = async (rule: any, value: string) => {
    if (!value?.length) return Promise.resolve();
    setUserEmail(value);
    if (
      value.length &&
      value.includes("@") &&
      value.includes(".") &&
      !fetching &&
      !emailData?.checkEmailAvailability?.isEmailAvailable
    ) {
      return Promise.reject("Email already exist ");
    }
    return Promise.resolve();
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
          label={t("first_name")}
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please enter your first name",
              max: 30,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label={t("last_name")}
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please enter your last name",
              max: 30,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label={t("Gender")}
          name="gender"
          rules={[
            {
              required: true,
              message: "Please enter your gender",
            },
          ]}
        >
          <Select placeholder={t("Gender")} className="nb-select-input">
            <Select.Option value="male">{t("male")}</Select.Option>
            <Select.Option value="female">{t("female")}</Select.Option>
            <Select.Option value="prefer not to answer">
              {t("i_prefer_not_to_say")}
              {/* I prefer not to answer */}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="flex-1"
          label={t("date_of_Birth")}
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

      <Form.Item
        label={t("email_address")}
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
          { validator: emailValidator },
        ]}
      >
        <Input />
      </Form.Item>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label={t("password")}
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
            { min: 8, message: "Password must be minimum 8 characters." },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label={t("confirm_password")}
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: t("confirm_your_password"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("two_passwords_mismatch_message"))
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </div>

      <Form.Item
        label={t("street_address")}
        name="streetAddress"
        rules={[
          {
            required: true,
            message: t("street_address_message"),
            max: 30,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          label={t("contact_number")}
          name="contact_number"
          rules={[
            {
              required: true,
              message: t("contact_number_message"),
              min: 9,
              max: 15,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label={t("country")}
          name="country_id"
          rules={[
            {
              required: true,
              message: t("country_message"),
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
            }}
            placeholder={t("country")}
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
        <Form.Item className="flex-1" label={t("state")} name="state_id">
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
            placeholder={t("state")}
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
        <Form.Item className="flex-1" label={t("city")} name="city_id">
          <Select
            placeholder={t("city")}
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
          label={t("postal_code")}
          name="zip_code"
          rules={[
            {
              required: true,
              message: t("postal_address_message"),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex justify-between">
        <div className="flex justify-between items-center">
          <Checkbox
            value={terms}
            onChange={(e) => {
              setTerms(e.target.checked);
            }}
          >
            <span className="mb-10 text-gray text-xs">
              {t("i_agree_to_the")}
              {/* I agree to the  */}
              <Link href={"#"}>
                {t("terms_n_conditions")}
                {/* Terms & Conditions */}
              </Link>
            </span>
          </Checkbox>
        </div>
        <Form.Item>
          <Button
            htmlType="submit"
            className="ant-btn ant-btn-primary ant-btn-block nb-button"
            type="primary"
            disabled={!terms}
          >
            {t("next")}
            {/* Next */}
          </Button>
        </Form.Item>
      </div>
      <div className="flex justify-center mt-8">
        <p className="text-secondary-1">
          {t("AlreadyHaveAnAccount")}
          {/* Already have an account? */}
          <Link href="/login">
            <span className="text-primary cursor-pointer"> {t("Login")}</span>
          </Link>
        </p>
      </div>
    </Form>
  );
}
