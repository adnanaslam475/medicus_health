import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button, InputNumber } from "antd";
import { DownOutlined } from "@ant-design/icons";

function MenuData(
  {
    //   placeholderMin,
    //   placeholderMax,
    //   onChangeMin,
    //   onChangeMax,
    //   onApply,
    //   min,
    //   max,
    //   minValueLocal,
    //   setMinValueLocal,
    //   maxValueLocal,
    //   setMaxValueLocal,
    //   setVisible,
  }
) {
  return (
    <Menu>
      <div className="flex gap-1 items-center p-2 border border-purple-900">
        <InputNumber
          placeholder={"placeholderMin"}
          value={"minValueLocal"}
          //   onChange={(value) => {
          //     onChangeMin(value);
          //     setMinValueLocal(value);
          //   }}
          //   min={min}
        />
        <InputNumber
          placeholder={"placeholderMax"}
          value={"maxValueLocal"}
          //   onChange={(value) => {
          //     onChangeMax(value);
          //     setMaxValueLocal(value);
          //   }}
          //   min={max}
        />
        <Button
          type="primary"
          className="w-px-110"
          //   onClick={() => {
          //     onApply(minValueLocal, maxValueLocal, setVisible);
          //   }}
        >
          Apply
        </Button>
      </div>
    </Menu>
  );
}

function RangeDropdown(
  {
    //   btnName,
    //   className,
    //   placeholderMin,
    //   placeholderMax,
    //   onChangeMin,
    //   onChangeMax,
    //   onApply,
    //   min,
    //   max,
    //   minValue,
    //   maxValue,
    //   show,
    //   onShow,
  }
) {
  const [visible, setVisible] = useState(false);
  const [minValueLocal, setMinValueLocal] = useState(0);
  const [maxValueLocal, setMaxValueLocal] = useState(1000);
  //   useEffect(() => {
  //     setVisible(show);
  //   }, [show]);

  //   useEffect(() => {
  //     setMinValueLocal(minValue);
  //   }, [minValue]);

  //   useEffect(() => {
  //     setMaxValueLocal(maxValue);
  //   }, [maxValue]);

  return (
    <Dropdown
      //   className={className}
      className="w-full lg:w-auto"
      overlay={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <MenuData
        //   placeholderMin={"placeholderMin"}
        //   placeholderMax={"placeholderMax"}
        //   onChangeMin={"onChangeMin"}
        //   onChangeMax={"onChangeMax"}
        //   onApply={"onApply"}
        //   min={"min"}
        //   max={"max"}
        //   minValueLocal={minValueLocal}
        //   setMinValueLocal={setMinValueLocal}
        //   maxValueLocal={maxValueLocal}
        //   setMaxValueLocal={setMaxValueLocal}
        //   setVisible={setVisible}
        />
      }
      placement="bottomRight"
      arrow
      trigger={["click"]}
      visible={visible}
      //   onClick={() => {
      //     setVisible(!visible);
      //     onShow(!visible);
      //   }}
    >
      
      <Button className="font-medium text-primary">
        {/* {btnName} */}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}

RangeDropdown.defaultProps = {
  btnName: "Range Picker",
  className: "",
  placeholderMin: "From",
  placeholderMax: "To",
  min: 0,
  max: 0,
  minValue: null,
  maxValue: null,
  onChangeMin: () => {},
  onChangeMax: () => {},
  apply: () => {},
  show: false,
  onShow: () => {},
};

export default RangeDropdown;
