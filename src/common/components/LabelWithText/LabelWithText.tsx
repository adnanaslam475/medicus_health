import React from "react";

type Props = {
  label: string | number | undefined;
  text: string | number | undefined;
};

function LabelWithText(props: Props) {
  const { label, text } = props;
  return (
    <div>
      <div className="flex border-b border-gray-5 py-3">
        <div className="text-gray-1 w-full max-w-[140px] sm:max-w-[300px]">{label}</div>
        <div className="text-secondary">{text}</div>
      </div>
    </div>
  );
}

export default LabelWithText;
