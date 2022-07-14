import { Button, Form, FormInstance, InputNumber } from "antd";
import React from "react";
import _classes from "../PhysicianMyEarningsSearchFilter/MyEarningsSearchFilters.module.scss";
type Props = {
  onFinishLocal: (values: {
    initialRefunds: number;
    finalRefunds: number;
  }) => void;
  form: FormInstance<any>;
};

function RefundsDropdown(props: Props) {
  const { onFinishLocal, form } = props || {};

  return (
    <Form form={form} layout="vertical" onFinish={onFinishLocal}>
      <div
        className={`${_classes["range-filter"]} flex items-center gap-2 p-2`}
      >
        <Form.Item name="initialRefunds" className="mb-0">
          <InputNumber placeholder="Initial($)" type="number" min={0} />
        </Form.Item>
        <Form.Item name="finalRefunds">
          <InputNumber placeholder="Final($)" className="mb-0" type="number" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Apply
        </Button>
      </div>
    </Form>
  );
}

export default RefundsDropdown;
