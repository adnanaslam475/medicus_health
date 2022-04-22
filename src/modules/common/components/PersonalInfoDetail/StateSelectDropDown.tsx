import { Form, Select } from "antd";
import React from "react";
import { useGetStatesByCountryQuery } from "../../../../generated/graphql";

type Props = {
  countryId: number | undefined;
  onChange: ((value: any, option: any) => void) | undefined;
};

const StateSelectDropDown = (props: Props) => {
  const { countryId, onChange } = props;
  const [{ data }] = useGetStatesByCountryQuery({
    variables: {
      input: countryId || 0,
    },
    pause: countryId === undefined,
  });
  const { getStatesByCountry } = data || {};
  return (
    <Form.Item
      className="flex-1"
      name="state_id"
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
        onChange={onChange}
        placeholder="State"
      >
        {React.Children.toArray(
          getStatesByCountry?.map((el, i) => {
            return (
              <Select.Option value={el.id}>{el?.state_name}</Select.Option>
            );
          })
        )}
      </Select>
    </Form.Item>
  );
};

export default StateSelectDropDown;
