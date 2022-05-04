import { Select } from "antd";
import { days } from "./helper";

const { Option } = Select;

type props = {
  setAddScheduleDay?: React.Dispatch<React.SetStateAction<string>>;
  addScheduleDay?: string;
};

function DayPicker({ setAddScheduleDay, addScheduleDay }: props) {
  function handleChange(value: any) {
    console.log(`selected ${value}`);
    setAddScheduleDay?.(value);
  }
  return (
    <Select
      bordered={false}
      value={addScheduleDay}
      defaultValue={"Select Day"}
      style={{ width: 120 }}
      onChange={handleChange}
    >
      {days.map((item) => {
        return (
          <Option value={item.key} key={item.key}>
            {item.value}
          </Option>
        );
      })}
    </Select>
  );
}

export default DayPicker;
