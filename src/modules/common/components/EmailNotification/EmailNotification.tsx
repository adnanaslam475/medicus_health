import React from "react";
import { Switch } from "antd";

type Props = {
  title: string;
  checked?: boolean | undefined | null;
  onChange: (e: boolean) => void;
  defaultChecked?: number;
  disabled?: boolean;
};

function EmailNotification(props: Props) {
  const { title, onChange, checked, disabled } = props;
  return (
    <div className="flex flex-row justify-between items-center px-5 py-5">
      <div className="inline-block w-full">
        <div className="flex  justify-between">
          <div className="">{title}</div>
        </div>
      </div>
      <div className="text-primary">
        <Switch
          checked={checked == null ? false : checked}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default EmailNotification;
