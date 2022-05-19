import { CaretDownOutlined } from "@ant-design/icons";
import { Input, Button, Select, DatePicker } from "antd";
import { RangePickerFooter } from "./RangePickerFooter";

export function FilterRangePicker({
	title,
	open,
	onChange,
	onCancel,
	onApply,
	onOpen,
	heading,
}: {
	open: boolean;
	title: React.ReactChild | undefined;
	heading: string;
	onChange: (formatString: string[]) => void;
	onCancel: () => void;
	onApply: () => void;
	onOpen: () => void;
}) {
	const { RangePicker } = DatePicker;
	return (
		<div className="relative mb-6 my-0 pl-2 ">
			<RangePicker
				value={null}
				onChange={(_, formatString) => onChange(formatString)}
				open={open}
				className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
				renderExtraFooter={() => (
					<RangePickerFooter onCancel={onCancel} onApply={onApply} />
				)}
			/>
			<Button className="flex date-btn" block type="default" onClick={onOpen}>
				{!!title ? (
					title
				) : (
					<div className="flex justify-between items-center w-full px-3">
						<div>{heading}</div>
						<div>
							<CaretDownOutlined style={{ color: `primary` }} />
						</div>
					</div>
				)}
			</Button>
		</div>
	);
}
