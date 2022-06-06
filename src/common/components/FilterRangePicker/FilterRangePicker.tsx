import { CaretDownOutlined } from "@ant-design/icons";
import { Input, Button, Select, DatePicker } from "antd";
import Image from "next/image";
import { calendarFilterIcon } from "utils/images";
import { RangePickerFooter } from "./RangePickerFooter";
import _classes from "./FilterRangePicker.module.scss";

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
  return (
    <div className="relative mb-6 my-0 pl-2 ">
      <DatePicker.RangePicker
        value={null}
        onChange={(_, formatString) => onChange(formatString)}
        open={open}
        className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
        renderExtraFooter={() => (
          <RangePickerFooter onCancel={onCancel} onApply={onApply} />
        )}
      />
      <Button className={`${_classes["range-style"]} flex date-btn`} block type="default" onClick={onOpen}>
        {!!title ? (
          title
        ) : (
          <div
            className={`flex justify-between items-center w-full px-3`}
          >
            <div className="flex items-center font-thin">
              <span className="mr-2 mt-1">
                <Image width={18} height={18} src={calendarFilterIcon} alt="" />
              </span>
              {heading}
            </div>
            <div>
              <CaretDownOutlined />
            </div>
          </div>
        )}
      </Button>
    </div>
  );
}
