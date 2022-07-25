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
    background: "bg-green",
    color: "text-green-1",
    border: "border border-green",
    text: CONFIRMED,
  },
  CANCELED: {
    background: "bg-red-1",
    color: "text-red",
    text: CANCELED || "Canceled",
    border: "border border-red-1",
  },
  REQUESTED: {
    background: "bg-yellow-1",
    color: "text-yellow",
    text: REQUESTED || "Requested",
    border: "border border-yellow-1",
  },
  PROPOSED: {
    background: "bg-yellow-1",
    color: "text-yellow",
    border: "border border-yellow-1",
    text: PROPOSED || "Proposed",
  },
  RESCHEDULED: {
    background: "bg-yellow-1",
    color: "text-yellow",
    border: "border border-yellow-1",
    text: RESCHEDULED || "Rescheduled",
  },
  TRUE: {
    background: "bg-green",
    color: "text-green-1",
    text: ACTIVE || "Active",
    border: "border border-green",
  },
  FALSE: {
    background: "bg-red-1",
    color: "text-red",
    text: INACTIVE || "InActive",
    border: "border border-red-1",
  },
  PAID: {
    background: "bg-green",
    color: "text-green-1",
    text: PAID,
    border: "border border-green",
  },
  UNPAID: {
    background: "bg-red-1",
    color: "text-red",
    border: "border border-red-1",
    text: UNPAID,
  },
  REFUNDED: {
    background: "bg-yellow-1",
    color: "text-yellow",
    text: REFUNDED,
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
      className={`py-2 px-5 flex items-center gap-2 rounded-md ${background} ${borderClass} ${blockClass}`}
    >
      <span className={color}>{text}</span>
    </div>
  );
}
export default StatusChip;
