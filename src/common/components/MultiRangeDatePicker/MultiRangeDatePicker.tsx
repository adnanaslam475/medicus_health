import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import MultiRangeListing from "./MultiRangeListing";
import { TimePicker } from "antd";
const { RangePicker } = TimePicker;
import _Classes from "./MultiRangeDatePicker.module.scss";
import DayPicker from "../../../utils/DayPicker";
import { Schedule, singleSchedule } from "../../../utils/types";

type Props = {
  disable: boolean;
  schedules?: Schedule[] | undefined;
  setDeleteScheduleId?: (e: string) => void;
  setAddScheduleTime?: (e: [string, string]) => void;
  setAddScheduleDay?: React.Dispatch<React.SetStateAction<string>>;
  setAddScheduleClick?: React.Dispatch<React.SetStateAction<boolean>>;
};

function MultiRangeDatePicker(props: Props) {
  const {
    disable,
    schedules,
    setDeleteScheduleId,
    setAddScheduleTime,
    setAddScheduleDay,
    setAddScheduleClick,
  } = props;

  function onChange(unUsed: any, timeString: [string, string]) {
    setAddScheduleTime?.(timeString);
  }
  return (
    <>
      <div className="font-medium text-lightBlue-1">Availability</div>
      {!disable && (
        <div
          className={`${_Classes["multiRange-date"]}  flex flex-1 rounded-lg`}
        >
          <DayPicker setAddScheduleDay={setAddScheduleDay} />
          <RangePicker
            bordered={false}
            use12Hours
            format="h:mm A"
            onChange={onChange}
            className={`${_Classes["timeRangePicker"]} flex flex-1 rounded-lg`}
          />
          <Button
            icon={<PlusOutlined className="font-bold text-sm pb-0.5" />}
            type="primary"
            size="large"
            className={`my-auto ml-auto mr-2 ${_Classes["button-custom"]}`}
            onClick={() => setAddScheduleClick?.((prev: boolean) => !prev)}
          >
            ADD
          </Button>
        </div>
      )}
      {!!schedules?.length &&
        schedules
          ?.sort((a, b) => {
            //@ts-ignore
            return a?.day - b?.day;
          })
          .map((item: singleSchedule, index: number) => {
            return (
              <MultiRangeListing
                disable={disable}
                item={item}
                index={index}
                setDeleteScheduleId={setDeleteScheduleId}
              />
            );
          })}
    </>
  );
}

export default MultiRangeDatePicker;
