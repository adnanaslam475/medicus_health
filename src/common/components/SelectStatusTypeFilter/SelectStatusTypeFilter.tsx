import { Select } from "antd";

export function SelectStatusTypeFilter({
  onChange,
  value,
  placeHolder,
}: {
  onChange: (value: string | undefined) => void;
  value: string | undefined | null;
  placeHolder: string;
}) {
  
  return (
    <Select
      placeholder={placeHolder}
      className="w-full sm:w-50"
      onChange={onChange}
      value={value || "Appointment Status"}
    >
     
      <Select.Option value="Upcoming">Upcoming</Select.Option>
      <Select.Option value="Requested">Requested</Select.Option>
      <Select.Option value="Cancelled">Cancelled</Select.Option>
      <Select.Option value="Completed">Completed</Select.Option>
    </Select>
  );
}
