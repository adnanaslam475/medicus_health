import { Select } from "antd";
// import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";

export function SelectStatusTypeFilter({
  onChange,
  value,
  placeholder,
}: {
  onChange: (value: string | undefined) => void;
  value: string | undefined | null;
  placeholder: string;
}) {
  // work in progress
  // const [{ data: serviceTypes }] = useGetAllAppointmentServiceTypesQuery();
  // const { appointmentServiceTypes } = serviceTypes || {};
  return (
    <Select
      placeholder={placeholder}
      className="w-full sm:w-50"
      onChange={onChange}
      value={value || "Appointment Status"}
    >
      {/* {appointmentServiceTypes?.map(({ id, name }) => (
				<Option value={id}>{name}</Option>
			))} */}
      <Select.Option value="Upcoming">Upcoming</Select.Option>
      <Select.Option value="Requested">Requested</Select.Option>
      <Select.Option value="Cancelled">Cancelled</Select.Option>
      <Select.Option value="Completed">Completed</Select.Option>
    </Select>
  );
}
