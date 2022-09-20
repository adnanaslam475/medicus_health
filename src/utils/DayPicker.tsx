import { Select } from "antd";
import { days } from "./helper";

const { Option } = Select;

type props = {
  setAddScheduleDay?: React.Dispatch<React.SetStateAction<string | number>>;
  addScheduleDay?: string | number;
};

function DayPicker({ setAddScheduleDay, addScheduleDay }: props) {
  function handleChange(value: number | string) {
    setAddScheduleDay?.(value);
  }
  return (
    <Select
      bordered={false}
      value={Number(addScheduleDay) || "Select Day"}
      defaultValue={"Select Day"}
      // style={{ width: 120 }}
      className="sm:min-w-[120px]"
      onChange={handleChange}
    >
      {days.map((item, index) => {
        return (
          <Option value={index + 1} key={index + 1}>
            {item}
          </Option>
        );
      })}
    </Select>
  );
}

export default DayPicker;
