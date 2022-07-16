import { Select } from "antd";
import { useGetStatesByCountryQuery } from "generated/graphql";

export function SelectStateTypeFilter({
  onChange,
  value,
  selectedCountryId,
}: {
  onChange: (value: string | number | readonly string[] | undefined) => void;
  value: string | number | readonly string[] | undefined;
  selectedCountryId?: number;
}) {
  const [data] = useGetStatesByCountryQuery({
    variables: {
      input: Number(selectedCountryId),
    },
    pause: selectedCountryId === undefined,
  });

  const { getStatesByCountry } = data?.data || {};

  return (
    <Select
      placeholder="State"
      className="w-full sm:w-50"
      onChange={onChange}
      value={value}
    >
      {getStatesByCountry?.map(({ id, state_name }) => (
        <Select.Option value={id}>{state_name}</Select.Option>
      ))}
    </Select>
  );
}
