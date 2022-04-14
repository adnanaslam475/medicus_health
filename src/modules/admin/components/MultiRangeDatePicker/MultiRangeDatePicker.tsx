import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import React from "react";
import MultiRangeListing from "./MultiRangeListing";
const { RangePicker } = DatePicker;
import _Classes from './MultiRangeDatePicker.module.scss'
function MultiRangeDatePicker() {
	return (
		<>
			<div className={`${_Classes["multiRange-date"]}  border flex rounded-lg`}>
				<RangePicker
					showTime
					format="YYYY/MM/DD HH:mm:ss"
					className={`${_Classes["multiRange"]}`} 
					
					
				/>
				<Button
					icon={<PlusOutlined className="font-bold text-sm pb-0.5" />}
					type="primary"
					size="large"
					className="my-auto mr-1"
				>
					ADD
				</Button>
			</div>
		<MultiRangeListing/>
    <MultiRangeListing/>
    <MultiRangeListing/>
    <MultiRangeListing/>
		</>
	);
}

export default MultiRangeDatePicker;
