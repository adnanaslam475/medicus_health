import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import React from "react";
import MultiRangeListing from "./MultiRangeListing";
const { RangePicker } = DatePicker;
import _Classes from "./MultiRangeDatePicker.module.scss";
import { Schedule, singleSchedule } from "utils/types";

type Props = {
  disable: boolean;
  schedules: Schedule[];
};

function MultiRangeDatePicker(props: Props) {
  const { disable, schedules } = props;
  const changeHandler = (dates: any, dateStrings: any) => {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    console.log("john", disable == false, !disable);
  };

  return (
    <>
      <div className="font-medium text-lightBlue-1">Availability</div>
      {!disable && (
        <div
          className={`${_Classes["multiRange-date"]}  border flex flex-1 rounded-lg`}
        >
          <RangePicker
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            className={`${_Classes["multiRange"]}`}
            onChange={changeHandler}
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
