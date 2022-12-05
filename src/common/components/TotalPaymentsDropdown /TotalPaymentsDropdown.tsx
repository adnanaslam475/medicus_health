import { Button, Form, FormInstance, InputNumber } from "antd";
import React from "react";
import { isChrome } from "utils/helper";
import _classes from "../PhysicianMyEarningsSearchFilter/MyEarningsSearchFilters.module.scss";
type Props = {
  onFinishLocal: (values: {
    initialCharges: number;
    finalCharges: number;
  }) => void;
  form: FormInstance<any>;
};

function TotalPaymentsDropdown(props: Props) {
  const { onFinishLocal, form } = props || {};

  return (
    <Form form={form} layout="vertical" onFinish={onFinishLocal}>
      <div
        className={`${_classes["range-filter"]} flex items-center gap-2 p-2`}
      >
        <Form.Item name="initialCharges" className="mb-0">
          <InputNumber placeholder="Initial($)" type="number" min={0} />
        </Form.Item>
        <Form.Item name="finalCharges">
          <InputNumber placeholder="Final($)" className="mb-0" type="number" />
        </Form.Item>

        <Button type="primary" className={`${isChrome && 'antCustomBtn'}`} htmlType="submit">
          Apply
        </Button>
      </div>
    </Form>
  );
}

export default TotalPaymentsDropdown;
