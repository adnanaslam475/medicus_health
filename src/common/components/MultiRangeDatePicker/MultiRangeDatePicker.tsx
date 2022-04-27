import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import MultiRangeListing from "./MultiRangeListing";
import { TimePicker } from "antd";
const { RangePicker } = TimePicker;
import _Classes from "./MultiRangeDatePicker.module.scss";
import { Schedule, singleSchedule } from "utils/types";
import DayPicker from "utils/DayPicker";

type Props = {
  disable: boolean;
  schedules: Schedule[];
};

function MultiRangeDatePicker(props: Props) {
  const { disable, schedules } = props;

  function onChange(unUsed: any, timeString: [string, string]) {
    console.log("time change is", timeString);
  }

  return (
    <>
      <div className="font-medium text-lightBlue-1">Availability</div>
      {!disable && (
        <div
          className={`${_Classes["multiRange-date"]}  border flex flex-1 rounded-lg`}
        >
          <DayPicker />
          <RangePicker
            bordered={false}
            use12Hours
            format="h:mm A"
            onChange={onChange}
          />
          <Button
            icon={<PlusOutlined className="font-bold text-sm pb-0.5" />}
            type="primary"
            size="large"
            className={`my-auto ml-auto mr-2 ${_Classes["button-custom"]}`}
          >
            ADD
          </Button>
        </div>
      )}
      {!schedules?.length ? (
        <div>No Data</div>
      ) : (
        schedules?.map((item: singleSchedule, index: number) => {
          return (
            <MultiRangeListing disable={disable} item={item} index={index} />
          );
        })
      )}
    </>
  );
}

export default MultiRangeDatePicker;
