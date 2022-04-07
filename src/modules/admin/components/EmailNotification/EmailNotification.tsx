import React, { useState } from "react";
import { Switch } from "antd";

function EmailNotification({ title, defaultChecked, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex flex-row justify-between items-center py-3">
      <div className="inline-block w-full">
        <div className="flex w-1/2 justify-between">
          <div className="">{title}</div>
        </div>
      </div>
      <div className="text-primary">
        <Switch checked={checked} onChange={(check) => onChange(check, setChecked)} />
      </div>
    </div>
  );
}

export default EmailNotification;
