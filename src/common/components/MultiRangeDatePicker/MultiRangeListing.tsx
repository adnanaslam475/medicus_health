import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { singleSchedule } from "../../types/types";
import { dayName } from "../../utils/date";

type Props = {
  disable: boolean;
  item: singleSchedule;
  index: number;
  setDeleteScheduleId?: (e: string) => void | undefined;
};
function MultiRangeListing(props: Props) {
  const { disable, item, index, setDeleteScheduleId } = props;
  return (
    <div className="flex  items-center" key={index}>
      <div className="bg-gray-4 rounded-lg flex my-2 flex-1">
        <div className="flex flex-1 flex-col pl-5 pr-48 py-2 border-r border-gray-3">
          <span className="text-gray text-xs">Day</span>
          <span>{dayName(item?.day || 0)}</span>
        </div>
        <div className="flex flex-1 flex-col pl-5 py-2 border-r border-gray-3">
          <span className="text-gray text-xs">From</span>
          <span>{item.startTime}</span>
        </div>
        <div className="flex flex-1 flex-col pl-5  py-2">
          <span className="text-gray text-xs">To</span>
          <span>{item.endTime}</span>
        </div>
      </div>
      {disable == false && (
        <CloseOutlined
          className="pl-1 "
          style={{ color: "#D53E4F" }}
          onClick={() => setDeleteScheduleId?.(item.id || "")}
        />
      )}
    </div>
  );
}

export default MultiRangeListing;
