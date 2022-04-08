import React from "react";
import { Form, Select } from "antd";
import { useCountriesQuery } from "../../../../generated/graphql";

type Props = {
  onChange: ((value: any, option: any) => void) | undefined;
};

const CountrySelectDropDown = (props: Props) => {
  const { onChange } = props;
  const [{ data }] = useCountriesQuery();
  const { countries } = data || {};
  return (
    <Form.Item
      className="flex-1"
      name="country_id"
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
        onChange={onChange}
        placeholder="Country"
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
