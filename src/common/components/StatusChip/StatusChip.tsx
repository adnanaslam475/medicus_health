import React from "react";
import {
	UPCOMING,
	COMPLETED,
	PENDING,
	CONFIRMED,
	CANCELLED,
} from "../../constants/status";
type StatusName =
	| "UPCOMING"
	| "COMPLETED"
	| "PENDING"
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
	typ: StatusName;
};
function AimChip(props: Props) {
	const { typ } = props;
	const { color, text, background, border } =
  classesAccordingToType[typ] || {};
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
export default AimChip;
