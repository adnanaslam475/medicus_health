import { Select } from "antd";
// import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";

export function SelectStateTypeFilter({
	onChange,
	value,
}: {
	onChange: (value: string | undefined) => void;
	value: string | undefined;
}) {
	// const [{ data: serviceTypes }] = useGetAllAppointmentServiceTypesQuery();
	// const { appointmentServiceTypes } = serviceTypes || {};
	return (
		<Select
			placeholder="State"
			className="w-full sm:w-40"
			onChange={onChange}
			value={value || "State"}
		>
			{/* {appointmentServiceTypes?.map(({ id, name }) => (
				<Option value={id}>{name}</Option>
			))} */}
				<Select.Option value="karachi">KARACHI</Select.Option>
				<Select.Option value="islamabad">ISLAMABAD</Select.Option>
				<Select.Option value="lahore">LAHORE</Select.Option>
	
		</Select>
	);
}
