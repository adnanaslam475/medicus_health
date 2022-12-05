import { Select } from "antd";
import { useCountriesQuery } from "generated/graphql";

export function SelectCountryTypeFilter({
  onChange,
  value,
}: {
  onChange: (value: string | undefined | number) => void;
  value: string | undefined | number;
}) {
  const [{ data }] = useCountriesQuery(); // call fail sometimes
  const { countries } = data || {};

  return (
    <Select
      placeholder="Country"
      className="w-full"
      onChange={onChange}
      value={value}
    >
      {countries?.map(({ id, country_name }) => (
        <Select.Option key={id} value={id}>
          {country_name}
        </Select.Option>
      ))}
    </Select>
  );
}
