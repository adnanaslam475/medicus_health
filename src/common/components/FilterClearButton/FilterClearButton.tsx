import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { isChrome } from "utils/helper";

export function FilterClearButton({ onClear }: { onClear: () => void }) {
  return (
    <Button type="text" onClick={onClear} className={`${isChrome && 'antCustomBtn'}`}>
      <CloseOutlined className="text-sm" />
      <span className="text-gray-1">Clear</span>
    </Button>
  );
}
