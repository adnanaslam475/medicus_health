import React from "react";
import { Form, Select } from "antd";
import { useCountriesQuery } from "../../../../generated/graphql";
import { useLocale } from "next-intl";
import initTranslation from "common/utils/initTranslation";
import i18next from "i18next";

type Props = {
  onChange: ((value: any, option: any) => void) | undefined;
};

initTranslation(["PersonalInfo"]);

const CountrySelectDropDown = (props: Props) => {
  const { onChange } = props;
  const [{ data }] = useCountriesQuery();
  const { countries } = data || {};

  i18next.changeLanguage(useLocale());
  const t = i18next.t;

  return (
    <Form.Item
      className="flex-1"
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
        onChange={onChange}
        // placeholder={t("country")}
        placeholder="Pais"
      >
        {React.Children.toArray(
          countries?.map((el, i) => {
            return (
              <Select.Option value={el?.id}>{el?.country_name}</Select.Option>
            );
          })
        )}
      </Select>
    </Form.Item>
  );
};

export default CountrySelectDropDown;
