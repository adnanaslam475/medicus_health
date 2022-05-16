import { Button, Form, InputNumber } from "antd";
import React from "react";
import _classes from "../../../../src/common/components/PhysicianMyEarningsSearchFilter/MyEarningsSearchFilters.module.scss";

type Props = {
  onFinishLocal: (values: { minValue: number; maxValue: number }) => void;
};

function AmountDropdown(props: Props) {
  const [form] = Form.useForm();
  const { onFinishLocal } = props;

  return (
    <Form form={form} layout="vertical" onFinish={onFinishLocal}>
      <div
        className={`${_classes["range-filter"]} flex items-center gap-2 p-2`}
      >
        <Form.Item name="minValue" className="mb-0">
          <InputNumber placeholder="From ($)" type="number" min={0} />
        </Form.Item>
        <Form.Item name="maxValue">
          <InputNumber placeholder="To ($)" className="mb-0" type="number" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Apply
        </Button>
      </div>
    </Form>
  );
}

export default AmountDropdown;
