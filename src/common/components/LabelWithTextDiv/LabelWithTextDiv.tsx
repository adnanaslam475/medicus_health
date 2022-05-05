import React from "react";
type Props={
label:string;
value:string
}

function LabelWithTextDiv(props:Props) {
  const {label,value}=props
	return (
		<div className="my-3 w-full">
			<div className="lightBlue-1 font-semibold text-sm py-2">{label}</div>
			<div className="border border-gray-4 rounded min-h-[48px] bg-gray-4  flex items-center pl-5">
     {value}
      </div>
		</div>
	);
}

export default LabelWithTextDiv;
