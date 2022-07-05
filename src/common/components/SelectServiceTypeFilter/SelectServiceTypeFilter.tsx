import { Select } from "antd";
import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";

export function SelectServiceTypeFilter({
  onChange,
  value,
  isAdminFilter,
}: {
  onChange: (value: string | number) => void;
  value?: string | number;
  isAdminFilter?: boolean;
}) {
  const [{ data: serviceTypes }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = serviceTypes || {};
  return (
    <Select
      placeholder="Appointment Type"
      className={isAdminFilter ? `admin-filter w-full text-sm font-rubik` : "w-full"}
      onChange={onChange}
      value={value}
    >
      {appointmentServiceTypes?.map(({ id, name }) => (
        <Select.Option value={id}>{name}</Select.Option>
      ))}
    </Select>
  );
}
