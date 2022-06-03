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
			className={`bg-gray-4 border border-gray-4 flex flex-col shadow-md py-20 px-4 mx-4 my-3`}
		>
			<div className="rounded-full bg-white px-3 border border-gray-4 mx-auto p-2 shadow-md text-center">
				<Image alt="" className="" height={28} width={28} src={src} />
			</div>

			<div className="text-6xl mx-auto px-auto text-center py-2">{value}</div>
			<div className="text-center text-xl">{title} </div>
		</div>
	);
}

export default StatisticsCard;
