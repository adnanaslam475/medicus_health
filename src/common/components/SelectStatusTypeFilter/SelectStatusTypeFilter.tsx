import { Select } from "antd";
// import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";

export function SelectStatusTypeFilter({
	onChange,
	value,
}: {
	onChange: (value: string | undefined) => void;
	value: string | undefined;
}) {
	// const [{ data: serviceTypes }] = useGetAllAppointmentServiceTypesQuery();
	// const { appointmentServiceTypes } = serviceTypes || {};
	const { Option } = Select;
	return (
		<Select
			placeholder="Status"
			className="w-full sm:w-40"
			onChange={onChange}
			value={value || "Status"}
		>
			{/* {appointmentServiceTypes?.map(({ id, name }) => (
				<Option value={id}>{name}</Option>
			))} */}
				<Option value="Upcoming">Upcoming</Option>
				<Option value="Requested">Requested</Option>
				<Option value="Cancelled">Cancelled</Option>
				<Option value="Completed">Completed</Option>
		</Select>
	);
}
