import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

export function FilterClearButton({ onClear }: { onClear: () => void }) {
  return (
    <Button
      // className={`${_classes["btn-clear"]} sm:ml-3`}
      type="text"
      onClick={onClear}
    >
      <CloseOutlined className="text-sm" />
      <span className="text-gray-1">Clear</span>
    </Button>
  );
}
