import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";

type Props = {
  onFinish?: ((values: any) => void) | undefined;
  loading: boolean;
};

const AddPaymentForm = React.forwardRef(function AddPaymentForm(
  { onFinish, loading }: Props,
  ref: any
) {
  useEffect(() => {
    if (ref) {
      ref.current = form;
    }
  }, []);

  const [form] = useForm();
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Bank Name"
        name="bankName"
        rules={[
          {
            required: true,
            message: "Please input your bank name!",
          },
          {
            whitespace: true,
            message: "Bank name cannot be empty",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Account Title"
        name="accountTitle"
        rules={[
          {
            required: true,
            message: "Please input your account title!",
          },
          {
            whitespace: true,
            message: "Account title cannot be empty!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Account Number"
        name="bankAccountNumber"
        rules={[
          {
            required: true,
            message: "Please input your account number!",
          },
          {
            whitespace: true,
            message: "Account number cannot be empty!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Routing Number"
        name="routingNumber"
        rules={[
          {
            required: true,
            message: "Please input your routing number!",
          },
          {
            whitespace: true,
            message: "Routing number cannot be empty!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});

export default AddPaymentForm;
