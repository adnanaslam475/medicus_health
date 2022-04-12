import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import React from "react";
import MultiRangeListing from "./MultiRangeListing";
const { RangePicker } = DatePicker;
function MultiRangeDatePicker() {
	return (
		<>
			<div className="border flex rounded-lg">
				<RangePicker
					showTime
					format="YYYY/MM/DD HH:mm:ss"
					className="border-none"
				/>
				<Button
					icon={<PlusOutlined className="font-bold text-sm pb-0.5" />}
					type="primary"
					size="large"
					className="my-auto"
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
