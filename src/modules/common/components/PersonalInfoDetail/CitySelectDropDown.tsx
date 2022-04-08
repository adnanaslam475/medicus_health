import { Form, Select } from "antd";
import React from "react";
import { useGetCitiesByStateQuery } from "../../../../generated/graphql";

type Props = {
  stateId: number | undefined;
};

const CitySelectDropDown = (props: Props) => {
  const { stateId } = props;
  const [getCityByState] = useGetCitiesByStateQuery({
    variables: {
      input: stateId || 0,
    },
    pause: stateId === undefined,
  });
  return (
    <Form.Item
      className="flex-1"
      name="city_id"
      rules={[
        {
          required: true,
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
          getCityByState?.data?.getCitiesByState?.map((el) => {
            return <Select.Option value={el.id}>{el?.city_name}</Select.Option>;
          })
        )}
      </Select>
    </Form.Item>
  );
};

export default CitySelectDropDown;
