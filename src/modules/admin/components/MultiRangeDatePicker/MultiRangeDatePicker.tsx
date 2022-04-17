import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import React from "react";
import MultiRangeListing from "./MultiRangeListing";
const { RangePicker } = DatePicker;
import _Classes from './MultiRangeDatePicker.module.scss'

type Props={
disable:boolean;
}
function MultiRangeDatePicker(props:Props) {
	const {disable}=props
	return (
		<>
		<div className="font-medium text-lightBlue-1">Availability</div>
			{disable == false && <div className={`${_Classes["multiRange-date"]}  border flex flex-1 rounded-lg`}>
				<RangePicker
					showTime
					format="YYYY/MM/DD HH:mm:ss"
					className={`${_Classes["multiRange"]}`} 
					
					
				/>
				<Button
					icon={<PlusOutlined className="font-bold text-sm pb-0.5" />}
					type="primary"
					size="large"
					className={`my-auto ml-auto mr-2 ${ _Classes["button-custom"]}`}
				>
					ADD
				</Button>
			</div>}
		<MultiRangeListing disable={disable}/>
    <MultiRangeListing disable={disable}/>
    <MultiRangeListing disable={disable}/>
    <MultiRangeListing disable={disable}/>
		</>
	);
}

export default MultiRangeDatePicker;
