import { Select } from "antd";
import { useDoctorProfilesQuery } from "generated/graphql";

export function SelectPhysicianTypeFilter({
  onChange,
  value,
}: {
  onChange: (value: string | number) => void;
  value?: string | number;
}) {
  const [{ data: dataList }] = useDoctorProfilesQuery();
  const { doctorProfiles } = dataList || {};
  return (
    <Select
      className="w-full sm:w-60"
      placeholder="Physician"
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
