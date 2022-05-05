import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import MultiRangeListing from "./MultiRangeListing";
import { TimePicker } from "antd";
const { RangePicker } = TimePicker;
import _Classes from "./MultiRangeDatePicker.module.scss";
import DayPicker from "../../../utils/DayPicker";
import { Schedule, singleSchedule } from "../../../utils/types";
import {RangeValue} from 'rc-picker/lib/interface'
type Props = {
  disable: boolean;
  schedules?: Schedule[] | undefined;
  setDeleteScheduleId?: (e: string) => void;
  setAddScheduleTime?: React.Dispatch<
    React.SetStateAction<{ time: RangeValue<moment.Moment> | null; timeString: string[] }>
  >;
  setAddScheduleDay?: React.Dispatch<React.SetStateAction<string | number>>;
  setAddScheduleClick?: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  addScheduleDay?: string | undefined;
  onAddClick?: () => void;
  addScheduleTime?: {
    timeString: string[];
    time: RangeValue<moment.Moment> | null;
  };
};

function MultiRangeDatePicker(props: Props) {
  const {
    disable,
    schedules,
    loading,
    addScheduleDay,
    setAddScheduleDay,
    addScheduleTime,
    setAddScheduleTime,
    setDeleteScheduleId,
    onAddClick,
  } = props;

  function onChange(
    time: RangeValue<moment.Moment> | null,
    timeString: [string, string]
  ) {
    setAddScheduleTime?.({ time, timeString });
  }

  return (
    <>
      <div className="font-medium text-lightBlue-1">Availability</div>
      {!disable && (
        <div
          className={`${_Classes["multiRange-date"]}  flex flex-1 rounded-lg`}
        >
          <DayPicker
            setAddScheduleDay={setAddScheduleDay}
            addScheduleDay={addScheduleDay}
          />
          <RangePicker
            value={addScheduleTime?.time}
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
            onClick={onAddClick}
            disabled={loading}
            loading={loading}
          >
            ADD
          </Button>
        </div>
      )}
      {!!schedules?.length &&
        schedules
          ?.sort((a: any, b: any) => {
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
