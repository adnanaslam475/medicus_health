import React, { ChangeEvent, EventHandler, useState } from "react";
import { Input, Button } from "antd";
import _Classes from "./InputWitLi.module.scss";
import { PlusOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";

type IMyProps = {
  disable: boolean |undefined;
  // value:any
  loading?: boolean;
  initialValue?: string[];
  onChange?: (list: string[]) => void;
};
function InputWithLi(props: IMyProps) {
  const { disable, initialValue, onChange} = props;
  const [treated, setTreated] = useState<string>("");
  const [treatedList, setTreatedList] = useState<string[]>(initialValue || []);
  const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
    setTreated(event.target.value);
  };

  const ShowData = () => {
    if (treated) {
      setTreatedList([...treatedList, treated]);
      onChange?.([...treatedList, treated]);
      setTreated("");
    }
  };

  const removeFunction = (i: string) => {
    const updatedList = treatedList.filter((a) => a != i);
    setTreatedList(updatedList);
    onChange?.(updatedList);
  };

  return (
    <div className="mt-3">
      <span className="font-medium text-lightBlue-1">Conditions Treated</span>
      <div className={`${_Classes["input-with-li"]} relative`}>
        {!disable && (
          <div>
            <Input
              placeholder="Condition Name"
              className=""
              onChange={handleName}
              value={treated}
            />
            <div className="absolute top-2 right-2 ">
              <Button
                icon={<PlusOutlined className="font-bold text-sm pb-0.5" />}
                type="primary"
                size="large"
                className={`${_Classes["button-custom"]}`}
                onClick={ShowData}
              >
                ADD
              </Button>
            </div>
          </div>
        )}
        <div>
          <ul className="gap-2 flex flex-wrap">
            {treatedList.map((a, i) => (
              <li
                key={i}
                className=" rounded flex items-center inline-flex bg-gray-4 my-2"
              >
                {disable == false ? (
                  <CloseOutlined
                    className="pl-2 pr-0 py-3"
                    style={{ color: "#D53E4F" }}
                    onClick={() => removeFunction(a)}
                  />
                ) : (
                  <CheckOutlined
                    className="pl-2 pr-0 py-3 font-black"
                    style={{ color: "#30cec2" }}
                  />
                )}
                <span className="px-2">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InputWithLi;
