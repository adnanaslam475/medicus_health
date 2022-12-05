import { Select } from "antd";
import { useGetCitiesByStateQuery, useGetStatesByCountryQuery } from "generated/graphql";

export function SelectCityFilter({
  onChange,
  value,
  selectedStateId,
}: {
  onChange: (value: string | number | readonly string[] | undefined) => void;
  value: string | number | readonly string[] | undefined;
  selectedStateId?: number;
}) {

  const [getCityByState] = useGetCitiesByStateQuery({
    variables: {
      input: selectedStateId || 0,
    },
    pause: !selectedStateId,
  });

  return (
    <Select
      placeholder="City"
      className="w-full sm:w-50"
      onChange={onChange}
      value={value}
    >
      {selectedStateId && getCityByState?.data?.getCitiesByState?.map((el, i) => (
        <Select.Option value={el?.id}>{el?.city_name}</Select.Option>
      ))}
    </Select>
  );
}
