import { CloseOutlined } from "@ant-design/icons";
import { date } from "common/utils";
import dayjs from "dayjs";
import React from "react";
import { singleSchedule } from "../../types/types";
import { dayName } from "../../utils/date";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

type Props = {
  disable: boolean;
  item: singleSchedule;
  index: number;
  setDeleteScheduleId?: (e: string) => void | undefined;
  deleteScheduleFetching?: boolean;
};
function MultiRangeListing(props: Props) {
  const { disable, item, index, setDeleteScheduleId, deleteScheduleFetching } =
    props;
  const [open, setOpen] = React.useState<boolean>(false);

  const timeZone =
    typeof window !== "undefined" &&
    localStorage?.getItem("timeZone") !== "undefined" &&
    JSON.parse(
      String(localStorage?.getItem("timeZone")) || "'America/Cambridge_Bay'"
    );

  return (
    <div className="flex  items-center" key={index}>
      <div className="bg-gray-4 rounded-lg flex my-2 flex-1">
        <div className="flex flex-1 flex-col pl-1 md:pl-5 md:pr-32 lg:pr-28 py-2 border-r border-gray-3 pr-0">
          <span className="text-gray text-xs">Day</span>
          <span className="text-xs md:text-base">
            {dayName(item?.day || 0)}
          </span>
        </div>
        <div className="flex flex-1 flex-col pl-1 md:px-1 py-2 border-r border-gray-3">
          <span className="text-gray text-xs">From</span>
          <span className="text-xs md:text-base">
            {dayjs(`${dayjs().format("YYYY-MM-DD")}T${item?.startTime}:00.000Z`)
              .tz(timeZone)
              .format("h:mm A")}
          </span>
        </div>
        <div className="flex flex-1 flex-col pl-1 md:px-1  py-2">
          <span className="text-gray text-xs">To</span>
          <span className="text-xs md:text-base">
            {dayjs(`${dayjs().format("YYYY-MM-DD")}T${item?.endTime}:00.000Z`)
              .tz(timeZone)
              .format("h:mm A")}
          </span>
        </div>
      </div>
      {disable == false && (
        <CloseOutlined
          className="pl-1 xs:mr-6 sm:mr-4"
          style={{ color: "#D53E4F" }}
          // onClick={() => setDeleteScheduleId?.(item.id || "")}
          onClick={() => setOpen(true)}
        />
      )}
      <ConfirmationModal
        visible={open}
        confirmLoading={deleteScheduleFetching}
        onCancel={() => setOpen(false)}
        onOk={() => setDeleteScheduleId?.(item.id || "")}
        message="Are you sure you want to delete this schedule ?"
      />
    </div>
  );
}

export default MultiRangeListing;
