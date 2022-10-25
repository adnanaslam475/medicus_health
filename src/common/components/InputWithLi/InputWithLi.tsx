import React, { ChangeEvent, EventHandler, useState, useEffect } from "react";
import { Input, Button } from "antd";
import _Classes from "./InputWitLi.module.scss";
import { PlusOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { isChrome } from "utils/helper";

type IMyProps = {
  disable: boolean | undefined;
  // value:any
  loading?: boolean;
  initialValue?: string[];
  onChange?: (list: string[]) => void;
  disabled?: boolean | undefined;
};
function InputWithLi(props: IMyProps) {
  const { disable, initialValue, onChange, disabled } = props;
  const [treated, setTreated] = useState<string>("");
  const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
    setTreated(event.target.value);
  };

  const ShowData = () => {
    if (treated.trim()) {
      onChange?.(
        initialValue ? [...(initialValue as any), treated] : [treated]
      );
      setTreated("");
    }
  };
  const removeFunction = (i: number) => {
    const updatedList = initialValue && initialValue.filter((_, index) => index !== i);
    if (updatedList) {
      onChange?.(updatedList);
    }
  };

  return (
    <div className="mt-3 border-b border-gray-3  pb-[19px]">
      <span className="font-medium text-lightBlue-1">Conditions treated</span>
      <div className={`${_Classes["input-with-li"]} relative`}>
        {!disable && (
          <div>
            <Input
              placeholder="Condition Name"
              className=""
              onChange={handleName}
              value={treated}
              disabled={disabled}
            />
            <div className="absolute top-2 right-2 ">
              <Button
                icon={<PlusOutlined className="font-bold text-sm pb-0.5" />}
                type="primary"
                size="large"
                className={`${_Classes["button-custom"]} ${isChrome && 'antCustomBtn'}`}
                onClick={ShowData}
              >
                ADD
              </Button>
            </div>
          </div>
        )}
        <div>
          <ul className="gap-2 flex flex-wrap m-0">
            {!!initialValue?.length &&
              initialValue.map(
                (a, i) =>
                  a.trim() && (
                    <li
                      key={i}
                      className=" rounded flex items-center inline-flex bg-gray-4 my-2"
                    >
                      {disable == false ? (
                        <CloseOutlined
                          className="pl-2 pr-0 py-3"
                          style={{ color: "#D53E4F" }}
                          onClick={() => removeFunction(i)}
                        />
                      ) : (
                        <CheckOutlined
                          className="pl-2 pr-0 py-3 font-black"
                          style={{ color: "#30cec2" }}
                        />
                      )}
                      <span className="px-2">{a}</span>
                    </li>
                  )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InputWithLi;
