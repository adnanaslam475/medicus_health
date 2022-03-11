import { Button, Form, Input } from "antd";

type Props = {
  onFinish: (values: any) => void;
  loading: boolean;
};

function ConfirmPasswordForm({ onFinish, loading }: Props) {
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
        rules={[
          { required: false, message: "Confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          loading={loading}
          disabled={loading}
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
