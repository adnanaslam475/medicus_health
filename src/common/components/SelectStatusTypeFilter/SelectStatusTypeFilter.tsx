import { Select } from "antd";

export function SelectStatusTypeFilter({
  onChange,
  value,
  placeholder,
  isAdminFilter
}: {
  onChange: (value: string | undefined) => void;
  value: string | undefined | null;
  placeholder?: string;
  isAdminFilter?:boolean
}) {
  return (
    <Select
      placeholder={placeholder}
      className={isAdminFilter ? "admin-filter w-full md:w-50 text-grey-4 font-rubik" : "w-full md:w-50"}
      onChange={onChange}
      value={value || "Appointment status"}
    >
      {/* ---> reuquested will give both Suggested and Requested */}
      <Select.Option value="Requested">Requested</Select.Option>
      <Select.Option value="Canceled">Canceled</Select.Option>
      <Select.Option value="Confirmed">Upcoming</Select.Option>
      <Select.Option value="Completed">Completed</Select.Option>
    </Select>
  );
}
