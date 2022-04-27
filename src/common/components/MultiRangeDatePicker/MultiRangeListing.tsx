import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { singleSchedule } from "../../../utils/types";
import { dayName, twelveHourTime } from "../../utils/date";

type Props = {
  disable: boolean;
  item: singleSchedule;
  index: number;
};
function MultiRangeListing(props: Props) {
  const { disable, item, index } = props;
  return (
    <div className="flex  items-center" key={index}>
      <div className="bg-gray-4 rounded-lg flex my-2 flex-1">
        <div className="flex flex-1 flex-col pl-5 pr-48 py-2 border-r border-gray-3">
          <span className="text-gray text-xs">Day</span>
          <span>{dayName(item?.day)}</span>
        </div>
        <div className="flex flex-1 flex-col pl-5 py-2 border-r border-gray-3">
          <span className="text-gray text-xs">From</span>
          <span>{twelveHourTime(item.startTime)}</span>
        </div>
        <div className="flex flex-1 flex-col pl-5  py-2">
          <span className="text-gray text-xs">To</span>
          <span>{twelveHourTime(item.endTime)}</span>
        </div>
      </div>
      {disable == false && (
        <CloseOutlined className="pl-1 " style={{ color: "#D53E4F" }} />
      )}
    </div>
  );
}

export default MultiRangeListing;
