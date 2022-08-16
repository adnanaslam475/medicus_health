import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import MultiRangeListing from "./MultiRangeListing";
import { TimePicker } from "antd";
import _Classes from "./MultiRangeDatePicker.module.scss";
import DayPicker from "../../../utils/DayPicker";
import { Schedule, singleSchedule } from "../../types/types";
import { RangeValue } from "rc-picker/lib/interface";

const { RangePicker } = TimePicker;

type Props = {
  disable: boolean;
  schedules?: Schedule[] | undefined;
  setDeleteScheduleId?: (e: string) => void;
  setAddScheduleTime?: React.Dispatch<
    React.SetStateAction<{
      time: RangeValue<moment.Moment> | null;
      timeString: string[];
    }>
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
  deleteScheduleFetching?: boolean;
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
    deleteScheduleFetching,
  } = props;

  function onChange(
    time: RangeValue<moment.Moment> | null,
    timeString: [string, string]
  ) {
    setAddScheduleTime?.({ time, timeString });
  }

  return (
    <div className="dateWithTextCardWrapper">
      <div className="font-medium text-lightBlue-1">Availability</div>
      {!disable && (
        <div
          className={`${_Classes["multiRange-date"]}  flex-col md:flex-row flex flex-1 rounded-lg`}
        >
          <DayPicker
            setAddScheduleDay={setAddScheduleDay}
            addScheduleDay={addScheduleDay}
          />
          <RangePicker
            value={addScheduleTime?.time}
            bordered={false}
            // minuteStep={30}
            use12Hours
            format="h:mm A"
            onChange={onChange}
            className={`${_Classes["timeRangePicker"]} flex flex-1 rounded-lg`}
            order={false}
          />
          <Button
            icon={<PlusOutlined className="font-bold text-sm pb-0.5" />}
            type="primary"
            size="large"
            className={`my-auto ml-auto mr-2 mt-3 md:mt-2 ${_Classes["button-custom"]}`}
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
          ?.sort((a, b) => {
            return Number(a?.day) - Number(b?.day);
          })
          .map((item: singleSchedule, index: number) => {
            return (
              <MultiRangeListing
                disable={disable}
                item={item}
                index={index}
                setDeleteScheduleId={setDeleteScheduleId}
                deleteScheduleFetching={deleteScheduleFetching}
              />
            );
          })}
    </div>
  );
}

export default MultiRangeDatePicker;
