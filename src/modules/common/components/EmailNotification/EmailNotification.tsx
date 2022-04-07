import React, { useState } from "react";
import { Switch } from "antd";


type Props = {
  title:string;
  defaultChecked: any;
  onChange: () => void;
};

function EmailNotification(props: Props) {
 const { title, defaultChecked, onChange }=props;
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex flex-row justify-between items-center px-5 py-5">
      <div className="inline-block w-full">
        <div className="flex w-1/2 justify-between">
          <div className="">{title}</div>
        </div>
      </div>
      <div className="text-primary">
        <Switch checked={checked}  />
      </div>
    </div>
  );
}

export default EmailNotification;
