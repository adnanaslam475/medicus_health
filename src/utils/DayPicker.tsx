import { Select } from "antd";
import { days } from "./helper";

const { Option } = Select;

function DayPicker({ setAddScheduleDay }: any) {
  // function created to send data on api from parent
  function handleChange(value: any) {
    console.log(`selected ${value}`);
    setAddScheduleDay(value);
  }
  return (
    <Select
      bordered={false}
      defaultValue="Select Day"
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
