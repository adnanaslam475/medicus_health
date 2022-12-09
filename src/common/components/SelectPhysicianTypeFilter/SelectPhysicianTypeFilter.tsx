import { Select } from "antd";
import { useDoctorProfilesQuery } from "generated/graphql";
import { useTranslations } from "next-intl";

export function SelectPhysicianTypeFilter({
  onChange,
  value,
}: {
  onChange: (value: string | number) => void;
  value?: string | number;
}) {
  const [{ data: dataList }] = useDoctorProfilesQuery();
  const { doctorProfiles } = dataList || {};
  const t = useTranslations("HistoryAppointments");
  return (
    <Select
      className="w-full "
      placeholder={t("physician")}
      onChange={onChange}
      value={value}
    >
      {doctorProfiles?.map((item) => (
        <Select.Option key={item?.doctor_id} value={item?.doctor_id}>
          {item?.user?.first_name}
        </Select.Option>
      ))}
    </Select>
  );
}
