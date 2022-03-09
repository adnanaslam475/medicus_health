import { Button, Form, Input } from "antd";

type Props = {
  onFinish: (values: any) => void;
};

function ForgotPasswordForm({ onFinish }: Props) {
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
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ForgotPasswordForm;
