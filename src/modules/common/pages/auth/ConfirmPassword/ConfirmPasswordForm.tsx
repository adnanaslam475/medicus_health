import { Button, Form, Input } from "antd";

type Props = {
  onFinish: (values: any) => void;
};

function ConfirmPasswordForm({ onFinish }: Props) {
  return (
    <Form
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: false,
            message: "Please enter your new password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmpassword"
        rules={[{ required: false, message: "Confirm password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          className="ant-btn ant-btn-secondary ant-btn-block nb-button"
          type="primary"
          htmlType="submit"
        >
          Confirm Password
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ConfirmPasswordForm;
