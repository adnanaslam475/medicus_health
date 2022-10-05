import React from "react";
import {
  UPCOMING,
  COMPLETED,
  PENDING,
  CONFIRMED,
  CANCELED,
  SUCCEEDED,
  PROPOSED,
  REQUESTED,
  ACTIVE,
  INACTIVE,
  PAID,
  UNPAID,
  REFUNDED,
  RESCHEDULED,
} from "../../constants/status";
type StatusName =
  | "UPCOMING"
  | "COMPLETED"
  | "PENDING"
  | "SUCCEEDED"
  | "CONFIRMED"
  | "REQUESTED"
  | "PROPOSED"
  | "CANCELED"
  | "TRUE"
  | "FALSE"
  | "PAID"
  | "UNPAID"
  | "REFUNDED"
  | "RESCHEDULED";

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
    color: "text-gray-7",
    text: UPCOMING,
    background: "bg-gray",
    border: "border border-gray",
  },
  COMPLETED: {
    text: COMPLETED,
    color: "text-sky",
    background: "bg-lightBlue",
    border: "border border-lightBlue",
  },
  SUCCEEDED: {
    color: "text-green-1",
    text: SUCCEEDED,
    background: "bg-green",
    border: "border border-green",
  },
  PENDING: {
    color: "text-yellow",
    text: PENDING,
    background: "bg-yellow-1",
    border: "border border-yellow-1",
  },
  CONFIRMED: {
    color: "text-green-1",
    text: UPCOMING,
    background: "bg-green",
    border: "border border-green",
  },
  CANCELED: {
    color: "text-red",
    text: CANCELED || "Canceled",
    background: "bg-red-1",
    border: "border border-red-1",
  },
  REQUESTED: {
    color: "text-yellow",
    text: REQUESTED || "Requested",
    background: "bg-yellow-1",
    border: "border border-yellow-1",
  },
  PROPOSED: {
    color: "text-green-1",
    text: PROPOSED || "Proposed",
    background: "bg-green",
    border: "border border-green",
  },
  RESCHEDULED: {
    text: RESCHEDULED || "Rescheduled",
    color: "text-sky",
    background: "bg-lightBlue",
    border: "border border-lightBlue",
  },
  TRUE: {
    color: "text-green-1",
    text: ACTIVE || "Active",
    background: "bg-green",
    border: "border border-green",
  },
  FALSE: {
    color: "text-red",
    text: INACTIVE || "InActive",
    background: "bg-red-1",
    border: "border border-red-1",
  },
  PAID: {
    color: "text-green-1",
    text: PAID,
    background: "bg-green",
    border: "border border-green",
  },
  UNPAID: {
    color: "text-red",
    border: "border border-red-1",
    background: "bg-red-1",
    text: UNPAID,
  },
  REFUNDED: {
    color: "text-yellow",
    text: REFUNDED,
    background: "bg-yellow-1",
    border: "border border-yellow-1",
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
      className={`py-2 px-5 flex items-center gap-2 rounded-md ${background} ${borderClass} ${blockClass} w-[135px] justify-center`}
    >
      <span className={color}>{text}</span>
    </div>
  );
}
export default StatusChip;
