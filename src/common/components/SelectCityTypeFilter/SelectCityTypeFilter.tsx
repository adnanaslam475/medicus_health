import { Select } from "antd";
import { useGetCitiesByStateQuery } from "generated/graphql";
import { useState } from "react";

export function SelectCityTypeFilter({
  onChange,
  value,
  stateId,
}: {
  onChange: (value: string | number | readonly string[] | undefined) => void;
  value: string | number | readonly string[] | undefined;
  stateId?: number;
}) {
  const [getCityByState] = useGetCitiesByStateQuery({
    variables: {
      input: stateId || 0,
    },
    pause: stateId === undefined,
  });

  const { getCitiesByState } = getCityByState?.data || {};

  console.log(getCitiesByState, "getCitiesByStategetCitiesByState");

  return (
    <Select
      placeholder="City"
      className="w-full sm:w-50"
      onChange={onChange}
      value={value}
    >
      {getCitiesByState?.map(({ id, city_name }) => (
        <Select.Option value={id}>{city_name}</Select.Option>
      ))}
    </Select>
  );
}
