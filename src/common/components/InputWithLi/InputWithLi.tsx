import React, { ChangeEvent, EventHandler, useState } from "react";
import { Input, Button } from "antd";
import _Classes from "./InputWitLi.module.scss";
import { PlusOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";


type IMyProps={
  disable: boolean,
}
function InputWithLi(props:IMyProps) {
  const {disable}=props
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
      <span className="font-medium text-lightBlue-1">Conditions Treated</span>
      <div className={`${_Classes["input-with-li"]} relative`}>
        {!disable && <div>
        <Input
          placeholder="Basic usage"
          className=""
          onChange={({ target }) => setTreated(target?.value)}
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
        </div>}
        <div>
          <ul className="gap-2 flex flex-wrap">
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              {disable ==false? (<CloseOutlined className="pl-2 pr-0 py-3" style={{ color: "#D53E4F" }} />):
             ( <CheckOutlined className="pl-2 pr-0 py-3 font-black" style={{ color: "#30cec2" }} />)}
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              {disable ==false? (<CloseOutlined className="pl-2 pr-0 py-3" style={{ color: "#D53E4F" }} />):
             ( <CheckOutlined className="pl-2 pr-0 py-3 font-black" style={{ color: "#30cec2" }} />)}
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              {disable ==false? (<CloseOutlined className="pl-2 pr-0 py-3" style={{ color: "#D53E4F" }} />):
             ( <CheckOutlined className="pl-2 pr-0 py-3 font-black" style={{ color: "#30cec2" }} />)}
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              {disable ==false? (<CloseOutlined className="pl-2 pr-0 py-3" style={{ color: "#D53E4F" }} />):
             ( <CheckOutlined className="pl-2 pr-0 py-3 font-black" style={{ color: "#30cec2" }} />)}
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              {disable ==false? (<CloseOutlined className="pl-2 pr-0 py-3" style={{ color: "#D53E4F" }} />):
             ( <CheckOutlined className="pl-2 pr-0 py-3 font-black" style={{ color: "#30cec2" }} />)}
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              {disable ==false? (<CloseOutlined className="pl-2 pr-0 py-3" style={{ color: "#D53E4F" }} />):
             ( <CheckOutlined className="pl-2 pr-0 py-3 font-black" style={{ color: "#30cec2" }} />)}
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              {disable ==false? (<CloseOutlined className="pl-2 pr-0 py-3" style={{ color: "#D53E4F" }} />):
             ( <CheckOutlined className="pl-2 pr-0 py-3 font-black" style={{ color: "#30cec2" }} />)}
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              {disable ==false? (<CloseOutlined className="pl-2 pr-0 py-3" style={{ color: "#D53E4F" }} />):
             ( <CheckOutlined className="pl-2 pr-0 py-3 font-black" style={{ color: "#30cec2" }} />)}
              <span className="px-2">das</span>
            </li>
            <li className=" rounded flex items-center inline-flex bg-gray-4 my-2">
              {disable ==false? (<CloseOutlined className="pl-2 pr-0 py-3" style={{ color: "#D53E4F" }} />):
             ( <CheckOutlined className="pl-2 pr-0 py-3 font-black" style={{ color: "#30cec2" }} />)}
              <span className="px-2">das</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InputWithLi;
