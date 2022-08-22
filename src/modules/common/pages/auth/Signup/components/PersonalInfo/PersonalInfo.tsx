/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Checkbox, Modal } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import {
  useGetStatesByCountryQuery,
  useGetCitiesByStateQuery,
  useCountriesQuery,
  useCheckEmailAvailabilityQuery,
  useGetTimeZonesQuery,
} from "generated/graphql";
import _classes from "../../SignUp.module.scss";
import { useTranslations } from "next-intl";
import TermsAndConditions from "common/components/TermsAndConditionns/TermsAndConditionns";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  const [countryCode, setCountryCode] = useState(null);

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

  const [getTimeZones] = useGetTimeZonesQuery();

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
      // return Promise.reject(t("email_already_exist"));
      return Promise.reject("Ya existe el correo electrónico");
    }
    return Promise.resolve();
  };

  const onContactNoValidation = (_rule: any, value: string, callback: any) => {
    if (value?.trim().length === 0) {
      // callback(t("contact_number_message"));
      callback("Por favor ingrese su número de contacto");
    } else {
      callback();
    }
  };

  // TERMS & CONDITIONS MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          // label={t("first_name")}
          label="Nombre"
          name="first_name"
          rules={[
            {
              required: true,
              message: "El nombre no debe ser mayor de 30",
              // message: t("first_name_message"),
              // message: "Please enter your first name",
              max: 30,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Apellido"
          // label={t("last_name")}
          name="last_name"
          rules={[
            {
              required: true,
              // message: "Please enter your last name",
              // message: t("last_name_message"),
              message: "El apellido no debe ser mayor de 30",
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
          label="Género"
          // label={t("gender")}
          name="gender"
          rules={[
            {
              required: true,
              // message: t("gender_message"),
              message: "Por favor ingrese su género",
            },
          ]}
        >
          <Select
            // placeholder={t("gender")}
            placeholder="Género"
            className="nb-select-input"
          >
            {/* <Select.Option value="male">{t("male")}</Select.Option>
            <Select.Option value="female">{t("female")}</Select.Option>
            <Select.Option value="prefer not to answer">
              {t("i_prefer_not_to_say")}
              {/* I prefer not to answer */}
            <Select.Option value="masculino">Masculino</Select.Option>
            <Select.Option value="femenina">Femenina</Select.Option>
            <Select.Option value="prefiero no contestar">
              Prefiero no contestar
              {/* I prefer not to answer */}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="flex-1"
          // label={t("date_of_birth")}
          label="Fecha de nacimiento"
          name="date_of_birth"
          rules={[
            {
              required: true,
              // message: t("date_of_birth_message"),
              message: "Por favor, seleccione la fecha de nacimiento",
            },
          ]}
        >
          <DatePicker
            placeholder="mm-dd-yyyy"
            format={"MM-DD-YYYY"}
            className="w-full"
            disabledDate={disabledDate}
          />
        </Form.Item>
      </div>

      <Form.Item
        // label={t("email_address")}
        label="Coreo electrónico"
        name="email"
        rules={[
          {
            required: true,
            // message: t("email_address_message"),
            message: "Por favor, introduzca su Coreo electrónico",
          },
          {
            type: "email",
            // message: t("email_invalid_message"),
            message: "el correo electrónico es invalido",
          },
          { validator: emailValidator },
        ]}
      >
        <Input />
      </Form.Item>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          // label={t("password")}
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              // message: t("password_message"),
              message: "¡Por favor, introduzca su contraseña!",
              // message: "Please enter your password!",
            },
            {
              min: 8,
              // message: t("password_message_8_character"),
              message: "La contraseña debe tener un mínimo de 8 caracteres.",
              // message: "Password must be minimum 8 characters.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          className="flex-1"
          // label={t("confirm_password")}
          label="Confirmar contraseña"
          name="confirmPassword"
          rules={[
            {
              required: true,
              // message: t("confirm_your_password"),
              message: "¡Por favor, confirme su contraseña!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  // new Error(t("two_passwords_mismatch_message"))
                  new Error("Las dos contraseñas que ingresaste no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </div>

      <Form.Item
        // label={t("street_address")}
        label="Dirección (calle y numero)"
        name="streetAddress"
        rules={[
          {
            required: true,
            // message: t("street_address_message"),
            message: "La dirección de la calle no debe ser superior a 30",
            max: 100,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <div className="flex flex-col md:flex-row gap-4">
        <div className={`${_classes.contactNo} inline-block`}>
          <Form.Item
            className="flex-1"
            // label={t("contact_number")}
            label="Teléfono de contacto"
            name="contact_number"
            rules={[
              {
                required: true,
                validator: onContactNoValidation,
              },
            ]}
          >
            {/* <Input /> */}
            <ReactPhoneInput
              country={"us"}
              placeholder={"Ingrese su número de contacto"}
              enableAreaCodes
              onChange={(_value, country: any) => {
                const code = country?.dialCode;
                setCountryCode(code);
                form.setFieldsValue({
                  contact_number: code,
                });
              }}
              value={countryCode}
            />
          </Form.Item>
        </div>

        <Form.Item
          className="flex-1"
          // label={t("country")}
          label="Pais"
          name="country_id"
          rules={[
            {
              required: true,
              // message: t("country_message"),
              message: "Por favor ingrese su país",
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
            // placeholder={t("country")}
            placeholder="Pais"
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
          // label={t("state")}
          label="Estado/Provinicia"
          name="state_id"
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
            // placeholder={t("state")}
            placeholder="Estado/Provinicia"
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
        <Form.Item
          className="flex-1"
          // label={t("city")}
          label="Ciudad"
          name="city_id"
        >
          <Select
            // placeholder={t("city")}
            placeholder="Ciudad"
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
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          className="flex-1"
          // label={t("timezone")}
          label="Zona horaria"
          name="timeZoneId"
          rules={[
            {
              required: true,
              // message: t("time_zone_is_required"),
              message: "Se requiere zona horaria",
            },
          ]}
        >
          <Select
            // placeholder={t("timezone")}
            placeholder="Zona horaria"
            showSearch
            filterOption={(input, city: any) =>
              city.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {React.Children.toArray(
              getTimeZones?.data?.getTimeZones?.map((el, i) => {
                return (
                  <Select.Option value={el.id}>{el?.timeZone}</Select.Option>
                );
              })
            )}
          </Select>
        </Form.Item>
        <Form.Item
          className="flex-1"
          // label={t("postal_code")}
          label="Código postal"
          name="zip_code"
          rules={[
            {
              required: true,
              // message: t("postal_address_message"),
              message: "Por favor ingrese su código postal",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex justify-between flex-row">
        <div
          className={`${_classes["signupcheckbox"]} inline-flex justify-between items-center`}
        >
          <Checkbox
            value={terms}
            onChange={(e) => {
              setTerms(e.target.checked);
            }}
          >
            <span className="mb-10 text-gray ">
              {/* Acepto los */}
              {t("i_agree_to_the")}
              {/* I agree to the  */}
              <Button
                type="link"
                onClick={showModal}
                className="px-0 terms-n-conditions"
              >
                {t("terms_n_conditions")}
              </Button>
              <Modal
                // title="Terms & conditions"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                // bodyStyle={{ overflowY: "scroll" }}
                // style={{ height: "calc(100vh - 200px)" }}
                footer={null}
              >
                <div className={`${_classes["custom-modal-height"]}`}>
                  <TermsAndConditions />
                </div>
              </Modal>
            </span>
          </Checkbox>
        </div>
        <Form.Item>
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            disabled={!terms}
            className={`${_classes["signupNext"]} ant-btn ant-btn-primary ant-btn-block nb-button`}
          >
            {t("next")}
            {/* Next */}
          </Button>
        </Form.Item>
      </div>
      <div className="flex justify-center mt-8">
        <p className="text-secondary-1">
          {t("already_have_an_account")}
          {/* Already have an account? */}
          <Link href="/login">
            <span className="text-primary cursor-pointer"> {t("Login")}</span>
          </Link>
        </p>
      </div>
    </Form>
  );
}
