import { Button } from "antd";
import { isChrome } from "utils/helper";

export function RangePickerFooter({
	onCancel,
	onApply,
}: {
	onCancel: () => void;
	onApply: () => void;
}) {
	return (
		<div className="flex gap-3 justify-end p-3">
			<Button className={`bg-gray-300 ${isChrome && 'antCustomBtn'}`} onClick={onCancel}>
				Cancel
			</Button>
			<Button className={`text-white ${isChrome && 'antCustomBtn'}`} type="primary" onClick={onApply}>
				Apply
			</Button>
		</div>
	);
}