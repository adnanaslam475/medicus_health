import { Alert, Button, Form, Input } from "antd";
import Password from "antd/lib/input/Password";
import Link from "next/link";
import { Router, useRouter } from "next/router";

type Props = {
  onFinish: (values: { password: string }) => void;
  loading: boolean;
  response: any;
};

function ConfirmPasswordForm({ onFinish, loading, response }: Props) {
  return (
    <Form
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={({ password }) => onFinish({ password })}
      autoComplete="off"
    >
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "password must be minimum 8 characters!",
            min: 8,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm password"
        name="confirmpassword"
        rules={[
          {
            required: true,
            message: "Confirm password must be minimum 8 characters!",
            min: 8,
          },
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
          Confirm password
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ConfirmPasswordForm;
