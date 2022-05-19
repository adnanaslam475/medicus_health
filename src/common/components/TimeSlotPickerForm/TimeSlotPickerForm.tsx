import React from "react";
import { DatePicker, Form, FormInstance, Space } from "antd";
import { FORMAT_DATE_TIME_WITH_AM_PM } from "common/constants";

type Props = {
  onChangeDatePicker?: (dateString: string, name: string) => void;
  form?: FormInstance<any> | undefined;
};

const TimeSlotPickerForm = (props: Props) => {
  const { onChangeDatePicker, form } = props || {};
  return (
    <div className="mt-3">
      <Form
        layout="horizontal"
        form={form}
        className="flex mt-2 mb-3 border-gray-8 gap-3"
      >
        <div className="w-50">
          <Form.Item label="Start Time" name="start_time">
            <Space direction="vertical" size={12}>
              <DatePicker
                className="w-full"
                showTime
                format={FORMAT_DATE_TIME_WITH_AM_PM}
                showNow={false}
                onChange={(_, date: string) => {
                  onChangeDatePicker?.(date, "startDate");
                }}
              />
            </Space>
          </Form.Item>
        </div>
        <div className="w-50">
          <Form.Item label="End Time" name="end_time">
            <Space direction="vertical" size={12}>
              <DatePicker
                className="w-full"
                showTime
                format={FORMAT_DATE_TIME_WITH_AM_PM}
                showNow={false}
                onChange={(_, date) => onChangeDatePicker?.(date, "endDate")}
              />
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default TimeSlotPickerForm;
