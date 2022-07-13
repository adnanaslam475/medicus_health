import { Button, Form, Input } from "antd";

type Props = {
  onFinish: (values: any) => void;
};

function ResendLinkForm({ onFinish }: Props) {
  return (
    <Form
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email Address"
        name="email"
        className="mb-1"
        rules={[
          {
            required: false,
            message: "Please enter your email address",
          },
          {
            type: "email",
            message: "Email is invalid",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          className="ant-btn ant-btn-secondary ant-btn-block nb-button"
          type="primary"
          htmlType="submit"
        >
          Send Reset Password Link
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ResendLinkForm;
