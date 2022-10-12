import { Select } from "antd";
import _classes from "./SelectStatusTypeFilter.module.scss";

export function SelectStatusTypeFilter({
  onChange,
  value,
  placeholder,
  isAdminFilter,
  hideRequested,
}: {
  onChange: (value: string | undefined) => void;
  value: string | undefined | null;
  placeholder?: string;
  isAdminFilter?: boolean;
  hideRequested?: boolean;
}) {
  return (
    <Select
      placeholder={placeholder}
      className={
        isAdminFilter
          ? `admin-filter w-full md:w-50  font-rubik ${_classes["text-color"]}`
          : `w-full md:w-50  font-rubik ${_classes["text-color"]}`
      }
      onChange={onChange}
      value={value || "Appointment status"}
    >
      {/* ---> reuquested will give both Suggested and Requested */}
      {!hideRequested && (
        <Select.Option value="Requested">Requested</Select.Option>
      )}
      <Select.Option value="Proposed">Proposed</Select.Option>
      <Select.Option value="Canceled">Canceled</Select.Option>
      <Select.Option value="Confirmed">Upcoming</Select.Option>
      <Select.Option value="Completed">Completed</Select.Option>
      <Select.Option value="Rescheduled">Rescheduled</Select.Option>
    </Select>
  );
}
