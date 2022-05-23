import { Button } from "antd";

export function RangePickerFooter({
	onCancel,
	onApply,
}: {
	onCancel: () => void;
	onApply: () => void;
}) {
	return (
		<div className="flex gap-3 justify-end p-3">
			<Button className="bg-gray-300" onClick={onCancel}>
				Cancel
			</Button>
			<Button className=" text-white" type="primary" onClick={onApply}>
				Apply
			</Button>
		</div>
	);
}