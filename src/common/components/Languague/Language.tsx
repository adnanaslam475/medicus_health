import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Checkbox } from "antd";

type Prop = {
  end: StaticImageData;
  title: string;
  check: boolean | undefined;
  disable?: boolean | undefined;
};
function Language(props: Prop) {
  const { end, title, check, disable } = props;
  const [checkBoxState, setCheckBoxState] = useState(check);
  useEffect(() => {
    setCheckBoxState(check);
  }, [check]);
  return (
    <div className="border flex rounded border-gray px-4 py-2 mr-3">
      <Image height={20} width={20} src={end} className="px-1" />
      <span className=" pl-1 pr-10">{title}</span>
      <Checkbox
        defaultChecked={check}
        checked={checkBoxState}
        onChange={(e) => setCheckBoxState(e.target.checked)}
      ></Checkbox>
    </div>
  );
}
export default Language;
