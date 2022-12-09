import React from "react";
type Props = {
  label?: string | number | null | undefined;
  value?: string | number | null | undefined;
};

function SmallLabelWithTextDiv(props: Props) {
  const { label, value } = props;
  return (
    <div className="mb-3 w-full">
      <div className="lightBlue-1 font-semibold text-sm pt-8">{label}</div>
      <div className="border border-gray-4 rounded min-h-[48px] w-64  bg-gray-4  flex items-center px-5 min-w-min">
        {value}
      </div>
    </div>
  );
}

export default SmallLabelWithTextDiv;
