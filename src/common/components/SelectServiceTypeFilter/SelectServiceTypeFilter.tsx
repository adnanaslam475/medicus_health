import { Select } from "antd";
import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";

export function SelectServiceTypeFilter({
	onChange,
	value,
}: {
	onChange: (value: string | undefined) => void;
	value: string | undefined;
}) {
	const [{ data: serviceTypes }] = useGetAllAppointmentServiceTypesQuery();
	const { appointmentServiceTypes } = serviceTypes || {};
	const { Option } = Select;
	return (
		<Select
			placeholder="Service"
			className="w-full sm:w-40"
			onChange={onChange}
			value={value || "Service"}
		>
			{appointmentServiceTypes?.map(({ id, name }) => (
				<Option value={id}>{name}</Option>
			))}
		</Select>
	);
}
