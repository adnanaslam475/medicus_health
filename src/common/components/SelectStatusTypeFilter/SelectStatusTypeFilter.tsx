import { Select } from "antd";

export function SelectStatusTypeFilter({
  onChange,
  value,
  placeholder,
}: {
  onChange: (value: string | undefined) => void;
  value: string | undefined | null;
  placeholder?: string;
}) {
  return (
    <Select
      placeholder={placeholder}
      className="w-full sm:w-50"
      onChange={onChange}
      value={value || "Appointment Status"}
    >
      {/* ---> reuquested will give both Suggested and Requested */}
      <Select.Option value="Requested">Requested</Select.Option>
      <Select.Option value="Cancelled">Cancelled</Select.Option>
      <Select.Option value="Confirmed">Confirmed</Select.Option>
      <Select.Option value="Completed">Completed</Select.Option>
    </Select>
  );
}
