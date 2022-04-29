import React from "react";

type Props = {
	label: string;
	text: string;
};

function LabelWithText(props: Props) {
	const { label, text } = props;
	return (
		<div>
			<div className="flex border-b border-gray-5 py-3">
				<div className="text-gray-1 w-full max-w-[300px]">{label}</div>
				<div className="text-secondary">{text}</div>
			</div>
		</div>
	);
}

export default LabelWithText;
