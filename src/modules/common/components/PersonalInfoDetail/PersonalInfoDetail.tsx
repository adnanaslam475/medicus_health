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
    timeZoneId
  } = user || {};
console.log("useruser",user);
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
      state_id: state_id === 0 ? "" : state_id,
      city_id: city_id === 0 ? "" : city_id,
      postalCode: zip_code,
      streetAddress: streetAddress,
      maritalStatusExist: false,
      maritalStatus: maritalStatus,
      haveChildren: false,
      children: children,
      occupation: occupation,
      occupationalExposure: occupationalExposure,
      exposureDuration: exposureDuration,
      pets: pets,
      timeZoneId:timeZone?.timeZone
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
  const t = useTranslations("PersonalInfo");

  const [getTimeZones] = useGetTimeZonesQuery();

  return (
    <div className="custom-list mt-4">
      <Form form={formInstance} onFinish={onFinish} layout="vertical">
        <ul>
          <div className="border border-gray-3 px-0 rounded custom-list-items">
            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  {/* {t("first_name")} */}
                  Nombre
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
                >
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        // message: t("first_name_is_required"),
                        message: "Se requiere el nombre",
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  Apellido
                  {/* {t("last_name")} */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
                >
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        // message: t("last_name_is_required"),
                        message: "Se requiere apellido",
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  Género
                  {/* {t("gender")} */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
                >
                  <Form.Item className="bottom-margin-0" name="gender">
                    <Select placeholder="Género" size="large">
                      <Select.Option value="male">Masculino</Select.Option>
                      <Select.Option value="female">
                        {/* {t("female")} */}
                        Femenina
                      </Select.Option>
                      <Select.Option value="prefer not to answer">
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  Fecha de nacimiento
                  {/* {t("date_of_birth")} */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  {/* {t("contact_number")} */}
                  Teléfono de contacto
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
                >
                  <Form.Item noStyle name="conntactNumber">
                    <Input size="large" placeholder="Teléfono de contacto" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  {/* {t("email_address")} */}
                  Dirección de correo electrónico
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
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
                    <Input
                      size="large"
                      placeholder="Dirección de correo electrónico"
                    />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  {/* {t("password")} */}
                  Contraseña
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
                >
                  <Form.Item name="password" className="bottom-margin-0">
                    <Input.Password size="large" placeholder="Contraseña" />
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  {/* {t("country")} */}
                  País de nacimiento
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  Estado
                  {/* {t("state")}  */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  Ciudad
                  {/* {t("city")}  */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
                >
                  <CitySelectDropDown stateId={stateId} />
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  {/* {t("postal_code")} */}
                  Código postal
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">Zona horaria</div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
                >
                  <Form.Item
                    className="flex-1"
                    // label={t("timezone")}
                    name="timeZoneId"
                  >
                    <Select
                      // placeholder={timeZone?.timeZone}
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  Dirección (calle y numero)
                  {/* {t("street_address")} */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 lg:w-2/5 text-secondary `}
                >
                  <Form.Item noStyle name="streetAddress">
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  {/* {t("marital_status")} */}
                  Estado civil
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 `}
                >
                  <Form.Item className="mb-0">
                    <Form.Item className="mb-0" name="maritalStatus">
                      <Select placeholder="{Estado civil" size="large">
                        <Select.Option value="Single">
                          Único/Única
                        </Select.Option>
                        <Select.Option value="Married">
                          Casado
                          {/* {t("married")} */}
                        </Select.Option>
                        <Select.Option value="Widower">
                          {/* {t("widow")} */}
                          Viudo/a
                        </Select.Option>
                        <Select.Option value="Divorced">
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  {/* {t("do_you_have_any_children")} */}
                  ¿Tienes hijos?
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 `}
                >
                  <Form.Item className="mb-0" name="haveChildren">
                    <Radio.Group
                      defaultValue={radioChildren}
                      onChange={(e) => {
                        setradioChildren(e.target.value);
                      }}
                    >
                      <Radio value={true}>
                        {/* {t("yes")} */}
                        Si
                      </Radio>
                      <Radio value={false}>no{/* {t("no")} */}</Radio>
                    </Radio.Group>
                    {radioChildren && (
                      <Form.Item className="mb-0" name="children">
                        <Input
                          size="large"
                          // placeholder={t("number_of_children")}
                          placeholder="Numero de niñas"
                        />
                      </Form.Item>
                    )}
                  </Form.Item>
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  ¿Cuál es tu ocupación?
                  {/* {t("What_is_your_occupation")} */}
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 `}
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
                <div className="w-1/2 sm:w-1/3 text-gray-1">
                  {/* {t("do_you_have_any_occupational_exposure")} */}
                  ¿Tiene alguna exposición ocupacional?
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 `}
                >
                  <Form.Item className="mb-0" name="occupationalExposure">
                    <Radio.Group
                      onChange={(e) => {
                        setradioOccupationalExposure(e.target.value);
                      }}
                    >
                      <Radio value="Yes">
                        {/* {t("yes")} */}
                        Si
                      </Radio>
                      <Radio value="No">{t("no")}</Radio>
                    </Radio.Group>
                  </Form.Item>

                  {radioOccupationalExposure === "Yes" ? (
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
                        <Select.Option value="Less than a year (<1)">
                          {/* {t("less_than_a_year")} */}
                          Menos de un año
                        </Select.Option>
                        <Select.Option value="More than a year (1+)">
                          {/* {t("more_than_a_year_1")} */}
                          Más de un año (1+)
                        </Select.Option>
                        <Select.Option value="More than three to five years (3-5)">
                          {/* {t("more_than_three_to_five_years_3_5")} */}
                          Más de tres a cinco años (3-5)
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  ) : null}
                </div>
              </div>
            </li>

            <li>
              <div className="flex w-full border-b border-gray-3 px-4 py-2 items-center">
                <div className="w-1/2  sm:w-1/3 text-gray-1">
                  {/* {t("do_you_have_any_pets")} */}
                  ¿Tiene mascotas?
                </div>
                <div
                  className={`${_classes["custom_text_field"]} w-1/2 sm:w-2/5 text-gray-1 `}
                >
                  <Form.Item className="mb-0" name="pets">
                    <Radio.Group>
                      <Radio value="Yes">
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
