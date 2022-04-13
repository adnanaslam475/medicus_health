import React, { ChangeEvent, EventHandler, useState } from "react";
import { Input, Button } from "antd";
import _Classes from "./InputWitLi.module.scss";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";


type IMyProps={
  disable: boolean,
}
function InputWithLi(props:IMyProps) {
  const disable={props}
  const [treated, setTreated] = useState<string>();
  const [treatedList, setTreatedList] = useState<Array<string>>();

  const ShowData = () => {
    const arrayData = [];
    arrayData.push(treated);
    // setTreatedList([...treatedList, arrayData]);
  };
  console.log(treatedList)
  return (
    <div className="mt-3">
      <span>Conditions Treated</span>
      <div className={`${_Classes["input-with-li"]} relative`}>
        {!disable && <div>
        <Input
          placeholder="Basic usage"
          className=""
          onChange={({ target }) => setTreated(target?.value)}
        />
        <div className="absolute top-1 right-2 ">
          <Button
            icon={<PlusOutlined className="font-bold text-sm pb-0.5" />}
            type="primary"
            size="large"
            className="my-auto"
            onClick={ShowData}
          >
            ADD
          </Button>
        </div>
        </div>}
        <div>
          <ul className="gap-2 flex flex-wrap">
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              <CloseOutlined className="px-2 py-3" style={{ color: "red" }} />
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              <CloseOutlined className="px-2 py-3" style={{ color: "red" }} />
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              <CloseOutlined className="px-2 py-3" style={{ color: "red" }} />
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              <CloseOutlined className="px-2 py-3" style={{ color: "red" }} />
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              <CloseOutlined className="px-2 py-3" style={{ color: "red" }} />
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              <CloseOutlined className="px-2 py-3" style={{ color: "red" }} />
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              <CloseOutlined className="px-2 py-3" style={{ color: "red" }} />
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              <CloseOutlined className="px-2 py-3" style={{ color: "red" }} />
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              <CloseOutlined className="px-2 py-3" style={{ color: "red" }} />
              <span className="px-2">das</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InputWithLi;
