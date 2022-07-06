import { CaretDownOutlined } from "@ant-design/icons";
import { Input, Button, Select, DatePicker } from "antd";
import Image from "next/image";
import { calendarFilterIcon } from "utils/images";
import { RangePickerFooter } from "./RangePickerFooter";
import _classes from "./FilterRangePicker.module.scss";
import { ReactChild } from "react";

export function FilterRangePicker({
  title,
  open,
  onChange,
  onCancel,
  onApply,
  onOpen,
  heading,
  isAdminFilter
}: {
  open: boolean;
  title: ReactChild | undefined | null;
  heading: string;
  onChange: (formatString: string[]) => void;
  onCancel: () => void;
  onApply: () => void;
  onOpen: () => void;
  isAdminFilter?:boolean
}) {
  return (
    <div className={` ${isAdminFilter && "admin-filter-date-picker"} relative my-0  " ${_classes["filter-date-wrapper"]}`} >
      <DatePicker.RangePicker
        value={null}
        onChange={(_, formatString) => onChange(formatString)}
        open={open}
        className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
        renderExtraFooter={() => (
          <RangePickerFooter onCancel={onCancel} onApply={onApply} />
        )}
      />
      <Button
        className={`${_classes["range-style"]} flex date-btn`}
        block
        type="default"
        onClick={onOpen}
      >
        {!!title ? (
          <span className={`${_classes["heading-verbage-selected"]}`}>{title}</span>
        ) : (
          <div className={`${_classes["filter-date-wrapper"]} flex justify-between items-center w-full px-2`}>
            <div className="flex items-center">
              <span className="mr-1 mt-1">
                <Image
                  priority={true}
                  width={18}
                  height={18}
                  src={calendarFilterIcon}
                  alt=""
                />
              </span>
             <span className={`${_classes["heading-verbage"]}`}> {heading}</span>
          
            </div>
            <div className="flex">
              <CaretDownOutlined />
            </div>
          </div>
        )}
      </Button>
    </div>
  );
}
