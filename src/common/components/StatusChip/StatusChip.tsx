import React from "react";
import {
  UPCOMING,
  COMPLETED,
  PENDING,
  CONFIRMED,
  CANCELLED,
  SUCCEEDED,
} from "../../constants/status";
type StatusName =
  | "UPCOMING"
  | "COMPLETED"
  | "PENDING"
  | "SUCCEEDED"
  | "CONFIRMED"
  | "CANCELLED";

type StatusType<K extends StatusName> = {
  [k in K]: {
    background: string;
    color: string;
    text: string;
    border: string;
  };
};

const classesAccordingToType: StatusType<StatusName> = {
  UPCOMING: {
    background: "bg-gray",
    color: "text-gray-7",
    text: UPCOMING,
    border: "border border-gray",
  },
  COMPLETED: {
    background: "bg-lightBlue",
    color: "text-sky",
    text: COMPLETED,
    border: "border border-lightBlue",
  },
  SUCCEEDED: {
    background: "bg-green",
    color: "text-green-1",
    text: SUCCEEDED,
    border: "border border-green",
  },
  PENDING: {
    background: "bg-yellow-1",
    color: "text-yellow",
    text: PENDING,
    border: "border border-yellow-1",
  },
  CONFIRMED: {
    background: "bg-blue",
    color: "text-blue-1",
    text: CONFIRMED,
    border: "border border-blue",
  },
  CANCELLED: {
    background: "bg-red-1",
    color: "text-red",
    text: CANCELLED || "Cancelled",
    border: "border border-red-1",
  },
};

type Props = {
  type: StatusName;
};
function StatusChip(props: Props) {
  const { type: statusType } = props;
  const { color, text, background, border } =
    classesAccordingToType[statusType] || {};
  const blockClass = "w-min";
  const borderClass = border;

  return (
    <div
      className={`py-2 px-5 flex items-center gap-2 rounded-md ${background} ${borderClass} ${blockClass}`}
    >
      <span className={color}>{text}</span>
    </div>
  );
}
export default StatusChip;
