import { Avatar } from "antd";
import React from "react";
import yourImage from "../../../../public/assets/images/doc-pic-big.png";
function ProfileImageWithInfo() {
	return (
		<div className="w-full mb-10 flex gap-8 items-center">
			<div className="relative">
				<Avatar size={60} className="bg-gray" src={yourImage} />
			</div>

			<div>
				<h2 className="mb-0">Mark Menson</h2>
				<span className="block">second opinion</span>
			</div>
		</div>
	);
}

export default ProfileImageWithInfo;
