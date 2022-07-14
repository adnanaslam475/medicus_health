import { Select } from "antd";
import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";

export function SelectServiceTypeFilter({
  onChange,
  value,
}: {
  onChange: (value: string | number) => void;
  value?: string | number;
}) {
  const [{ data: serviceTypes }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = serviceTypes || {};
  return (
    <Select
      placeholder="Appointment type"
      className={"w-full"}
      onChange={onChange}
      value={value}
    >
      {appointmentServiceTypes?.map(({ id, name }) => (
        <Select.Option value={id}>{name}</Select.Option>
      ))}
    </Select>
  );
}
