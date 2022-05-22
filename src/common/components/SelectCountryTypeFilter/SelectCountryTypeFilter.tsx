import { Select } from "antd";
// import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";

export function SelectCountryTypeFilter({
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
			placeholder="Country"
			className="w-full sm:w-40"
			onChange={onChange}
			value={value || "Country"}
		>
			{/* {appointmentServiceTypes?.map(({ id, name }) => (
				<Option value={id}>{name}</Option>
			))} */}
				<Select.Option value="pakistan">PAKISTAN</Select.Option>
				<Select.Option value="usa">USA</Select.Option>
				<Select.Option value="canada">CANADA</Select.Option>
				<Select.Option value="finland">FINLAND</Select.Option>
		</Select>
	);
}
