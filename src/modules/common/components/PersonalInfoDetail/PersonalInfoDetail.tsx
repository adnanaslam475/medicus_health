import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Radio, Select } from "antd";
import { useGetTimeZonesQuery, User } from "../../../../generated/graphql";
import dayjs from "dayjs";
import moment from "moment";
import CitySelectDropDown from "./CitySelectDropDown";
import StateSelectDropDown from "./StateSelectDropDown";
import CountrySelectDropDown from "./CountrySelectDropDown";
import _classes from "./PersonalInfoDetail.module.scss";
import { useTranslations } from "next-intl";

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
    haveChildren: boolean;
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
    timeZone,
    timeZoneId,
  } = user || {};
  const {
    haveChildren,
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
      // setradioChildren(
      //   children === 0 || children === undefined || children === null
      //     ? false
      //     : true
      // );
    }
  }, [user]);

  console.log({ occupationalExposure });
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
      state_id: state_id === 0 ? "" : state_id,
      city_id: city_id === 0 ? "" : city_id,
      postalCode: zip_code,
      streetAddress: streetAddress,
      maritalStatusExist: false,
      maritalStatus: maritalStatus,
      haveChildren,
      // haveChildren === "Yes" || haveChildren === "Si" ? true : false,
      children: children,
      occupation: occupation,
      occupationalExposure: occupationalExposure,
      exposureDuration: exposureDuration,
      pets: pets,
      timeZone: timeZone?.id,
    });
    setradioChildren(haveChildren === "Yes");
    setradioOccupationalExposure(occupationalExposure);
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
  const t = useTranslations("PersonalInfo");

  const [getTimeZones] = useGetTimeZonesQuery();

  const onContactNoValidation = (_rule: any, value: string, callback: any) => {
    if (value?.trim().length > 15) {
      // callback(t("contact_no_is_too_long"));
      callback("El número de contacto no debe ser superior a 15");
    } else if (value?.trim().length < 9) {
      // callback(t("contact_number_message"));
      callback("Por favor ingrese el número de contacto correcto");
    } else {
      callback();
    }
  };

  return (
    <div className="custom-list mt-4">
      <Form form={formInstance} onFinish={onFinish} layout="vertical">
        <ul>
          <div className="border border-gray-3 px-0 rounded custom-list-items">
            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("first_name")} */}
                  Nombre
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4`}
                >
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        // message: t("first_name_is_required"),
                        message: "Se requiere el nombre",
                      },
                      {
                        max: 30,
                        // message: t("first_name_message"),
                        message: "El nombre no debe tener más de 30 caracteres",
                      },
                    ]}
                    className="bottom-margin-0"
                  >
                    <Input size="large" placeholder="Nombre" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  Apellido
                  {/* {t("last_name")} */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4 `}
                >
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        // message: t("last_name_is_required"),
                        message: "Se requiere apellido",
                      },
                      {
                        max: 30,
                        // message: t("first_name_message"),
                        message: "El nombre no debe tener más de 30 caracteres",
                      },
                    ]}
                    className="bottom-margin-0"
                  >
                    <Input size="large" placeholder="Apellido" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  Género
                  {/* {t("gender")} */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4 `}
                >
                  <Form.Item className="bottom-margin-0" name="gender">
                    <Select placeholder="Género" size="large">
                      <Select.Option value="masculino">Masculino</Select.Option>
                      <Select.Option value="femenina">
                        {/* {t("female")} */}
                        Femenina
                      </Select.Option>
                      <Select.Option value="prefiero no contestar">
                        {/* {t("prefer_not_to_answer")} */}
                        Prefiero no responder
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  Fecha de nacimiento
                  {/* {t("date_of_birth")} */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4 `}
                >
                  <Form.Item
                    className="flex-1 bottom-margin-0"
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
                      name="date_of_birth"
                      placeholder="mm-dd-yyyy"
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
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("contact_number")} */}
                  Teléfono de contacto
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4 `}
                >
                  {" "}
                  <Form.Item
                    // noStyle
                    className="flex-1"
                    // label={t("contact_number")}
                    // label="Teléfono de contacto"
                    name="conntactNumber"
                    rules={[
                      {
                        required: true,
                        validator: onContactNoValidation,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("email_address")} */}
                  Dirección de correo electrónico
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4 `}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        // message: t("please_input_your_email"),
                        message: "Por favor ingrese su correo electrónico",
                      },
                    ]}
                    className="bott-om-margin-0"
                  >
                    <Input size="large" placeholder="Coreo electrónico" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("password")} */}
                  Contraseña
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4`}
                >
                  <Form.Item name="password" className="bottom-margin-0">
                    <Input.Password size="large" placeholder="Contraseña" />
                  </Form.Item>
                </div>
              </div>
            </li>
            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("password")} */}
                  Confirmar contraseña
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4`}
                >
                  <Form.Item
                    name="confirmPassword"
                    className="bottom-margin-0"
                    rules={[
                      {
                        // required: true,
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
                            new Error(
                              "Las dos contraseñas que ingresaste no coinciden"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Confirmar contraseña"
                    />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("country")} */}
                  Pais
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4`}
                >
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
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  Estado
                  {/* {t("state")}  */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4 `}
                >
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
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  Ciudad
                  {/* {t("city")}  */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4`}
                >
                  <CitySelectDropDown stateId={stateId} />
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("postal_code")} */}
                  Código postal
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4`}
                >
                  <Form.Item
                    name="postalCode"
                    rules={[
                      {
                        required: true,
                        // message: t("postal_code_is_required"),
                        message: "Se requiere código postal.",
                      },
                    ]}
                    className="bottom-margin-0"
                  >
                    <Input
                      size="large"
                      // placeholder={t("postal_code")}
                      placeholder="Código postal"
                      type="number"
                    />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  Zona horaria
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4 `}
                >
                  <Form.Item
                    className="flex-1"
                    // label={t("timezone")}
                    name="timeZone"
                    rules={[
                      {
                        required: true,
                        message: "Timezone is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder={timeZone?.timeZone}
                      showSearch
                      filterOption={(input, city: any) =>
                        city.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {React.Children.toArray(
                        getTimeZones?.data?.getTimeZones?.map((el, i) => {
                          return (
                            <Select.Option value={el.id}>
                              {el?.timeZone}
                            </Select.Option>
                          );
                        })
                      )}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  Dirección (calle y numero)
                  {/* {t("street_address")} */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary md:pl-4 `}
                >
                  <Form.Item
                    // noStyle
                    name="streetAddress"
                    rules={[
                      {
                        required: true,
                        // message: t("street_address_message"),
                        message:
                          "La dirección de la calle no debe ser superior a 30",
                        max: 100,
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      // placeholder={t("street_address")}
                      placeholder="Dirección (calle y numero)"
                    />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("marital_status")} */}
                  Estado civil
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 md:pl-4`}
                >
                  <Form.Item className="mb-0">
                    <Form.Item className="mb-0" name="maritalStatus">
                      <Select placeholder="Estado civil" size="large">
                        <Select.Option value="Único">Único/Única</Select.Option>
                        <Select.Option value="Casado">
                          Casado
                          {/* {t("married")} */}
                        </Select.Option>
                        <Select.Option value="Viudo">
                          {/* {t("widow")} */}
                          Viudo/a
                        </Select.Option>
                        <Select.Option value="Divorciado">
                          {/* {t("divorce")} */}
                          Divorciado/a
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("do_you_have_any_children")} */}
                  ¿Tienes hijos?
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 md:w-2/5 text-gray-1 md:pl-4`}
                >
                  <Form.Item className="mb-0" name="haveChildren">
                    {/* <div className="flex flex-row items-center"> */}
                    <Radio.Group
                      defaultValue={radioChildren}
                      onChange={(e) => {
                        setradioChildren(e.target.value === "Yes");
                      }}
                    >
                      <Radio value={"Yes"}>
                        {/* {t("yes")} */}
                        Si
                      </Radio>
                      <Radio value={"No"}>No{/* {t("no")} */}</Radio>
                    </Radio.Group>

                    {/* </div> */}
                  </Form.Item>

                  {radioChildren && (
                    <div
                      className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 md:w-full text-gray-1 `}
                    >
                      <Form.Item
                        label="¿Cuanto?"
                        className="mb-0"
                        name="children"
                      >
                        <Input
                          size="large"
                          // placeholder={t("number_of_children")}
                          placeholder="Numero de niñas"
                        />
                      </Form.Item>
                    </div>
                  )}
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  ¿Cuál es tu ocupación?
                  {/* {t("What_is_your_occupation")} */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5  text-gray-1 md:pl-4`}
                >
                  <Form.Item noStyle name="occupation">
                    <Input
                      size="large"
                      // placeholder={t("occupation")}
                      placeholder="Ocupación"
                    />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("do_you_have_any_occupational_exposure")} */}
                  ¿Tiene alguna exposición ocupacional?
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 md:w-1/2 md:w-full text-gray-1 md:pl-4`}
                >
                  <div className="flex flex-row items-center">
                    <Form.Item className="mb-0" name="occupationalExposure">
                      <Radio.Group
                        defaultValue={radioOccupationalExposure}
                        onChange={(e) => {
                          setradioOccupationalExposure(e.target.value);
                        }}
                      >
                        <Radio
                          value="Yes"
                          // value="Si"
                        >
                          {/* {t("yes")} */}
                          Si
                        </Radio>
                        <Radio value="No">{t("no")}</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                  {radioOccupationalExposure === "Yes" ? (
                    <div
                      className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 md:w-full text-gray-1 `}
                    >
                      <Form.Item
                        className="mb-0"
                        name="exposureDuration"
                        // label={t("occupational_exposure_duration")}
                        label="¿Duración de la exposición ocupacional?"
                      >
                        <Select
                          // placeholder={t("occupational_exposure_duration")}
                          placeholder="¿Duración de la exposición ocupacional?"
                          size="large"
                        >
                          <Select.Option value="Menos de un año (<1)">
                            {/* {t("less_than_a_year")} */}
                            Menos de un año
                          </Select.Option>
                          <Select.Option value="Más de un año (1+)">
                            {/* {t("more_than_a_year_1")} */}
                            Más de un año (1+)
                          </Select.Option>
                          <Select.Option value="Más de tres a cinco años (3-5)">
                            {/* {t("more_than_three_to_five_years_3_5")} */}
                            Más de tres a cinco años (3-5)
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  ) : null}
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2  sm:w-1/3 text-gray-1 md:pl-4">
                  {/* {t("do_you_have_any_pets")} */}
                  ¿Tiene mascotas?
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 md:pl-4 `}
                >
                  <Form.Item className="mb-0" name="pets">
                    <Radio.Group>
                      <Radio
                        // value="Yes"
                        value="Sí"
                      >
                        {/* {t("yes")} */}
                        Si
                      </Radio>
                      <Radio value="No">{t("no")}</Radio>
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
