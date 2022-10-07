import { Select } from "antd";
import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";
import { useTranslations } from "next-intl";
import i18next from "i18next";
import { useLocale } from "next-intl";
import initTranslation from "common/utils/initTranslation";

initTranslation(["SearchFilters"]);
export function SelectServiceTypeFilter({
  onChange,
  value,
}: {
  onChange: (value: string | number) => void;
  value?: string | number;
}) {
  const [{ data: serviceTypes }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = serviceTypes || {};

  i18next.changeLanguage(useLocale());
  const t = i18next.t;
  console.log(t("title"));
  return (
    <Select
      placeholder={t("appointment_type")}
      className={"w-full admin-filter"}
      onChange={onChange}
      value={value}
    >
      {appointmentServiceTypes?.map(({ id, name }) => (
        <Select.Option value={id}>{name}</Select.Option>
      ))}
    </Select>
  );
}
