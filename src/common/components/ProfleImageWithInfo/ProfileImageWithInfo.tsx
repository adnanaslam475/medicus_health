import Image from "next/image";
import React from "react";
import yourImage from "../../../../public/assets/images/doc-pic-big.png";

function ProfileImageWithInfo() {
	return (
		<div className="w-full  my-3 flex gap-6 items-center">
			<div className="relative">
				<Image
					alt="Profile Image"
					height="74"
					width="74"
					onError={(e) => console.log(e)}
					src={yourImage}
					className="bg-gray border rounded-full border-gray"
				/>
			</div>

			<div>
				<h2 className="mb-0">Mark Menson</h2>
				<span className="block">second opinion</span>
			</div>
		</div>
	);
}

export default ProfileImageWithInfo;
