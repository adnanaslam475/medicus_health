import React from "react";
import Image from "next/image";

type Props = {
	src: string;
	title: string;
	value: number;
};

function StatisticsCard({ src, title, value }: Props) {
	return (
		<div
			className={`bg-white border border-gray-4 shadow-md py-6 px-4 rounded gap-3 flex items-center w-full my-3 xl:my-0`}
		>
			<div className="rounded-full px-3 border border-gray-4 pt-3 pb-2 shadow-md">
				<Image alt="" className="" height={34} width={34} src={src} />
			</div>
			<div className="flex flex-col">
				<span className="text-2xl">{value}</span>
				<span>{title} </span>
			</div>
		</div>
	);
}

export default StatisticsCard;
