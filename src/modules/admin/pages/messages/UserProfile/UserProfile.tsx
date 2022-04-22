import { Avatar } from "antd";
import Image from "next/image";
import React from "react";
import profile from "./../../../../../../public/assets/images/doc-pic.png";
import loaderLogo from "./../../../../../../public/assets/images/loaderLogo.png";

type Props={
	bgcolor:string
}
function UserProfile(props:Props) {
	const {bgcolor}=props;
	return (
		<div className={`flex px-5 py-4 items-center border border-gray-4 ${bgcolor}`}>
		
			<div className="relative">
				<Image
				alt=""
					width={70}
					height={70}
					src={profile}
				/>
				<span className="rounded-full absolute p-1 -right-2 bottom-0">
					<Image
						alt=""
						src={loaderLogo}
						width={20}
						height={20}
						className="border rounded border-gray-2"
					/>
				</span>
			</div>
			<div className="w-full pl-3">
				<div className="flex justify-between">
					<span className="text-black text-base">Mark Manson</span>
					<span className="text-base text-gray">03:30 PM</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray text-base block">
						You :what is the pro..
					</span>
					<span className="rounded-lg bg-red px-2 py-0 text-white">3</span>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
