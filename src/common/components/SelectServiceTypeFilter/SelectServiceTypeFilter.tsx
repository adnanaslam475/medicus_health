import { Select } from "antd";
import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";
import { useTranslations } from "next-intl";

export function SelectServiceTypeFilter({
  onChange,
  value,
}: {
  onChange: (value: string | number) => void;
  value?: string | number;
}) {
  const [{ data: serviceTypes }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = serviceTypes || {};
  const t = useTranslations("HistoryAppointments");
  return (
    <Select
      placeholder={t("appointment_type")}
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
