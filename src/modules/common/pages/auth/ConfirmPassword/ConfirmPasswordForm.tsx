import { Alert, Button, Form, Input } from "antd";
import Link from "next/link";
import { Router, useRouter } from "next/router";

type Props = {
  onFinish: (values: { password: string }) => void;
  loading: boolean;
  response: any;
};

function ConfirmPasswordForm({ onFinish, loading, response }: Props) {
  console.log(response, "rrr");
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
      {response && response.error?.graphQLErrors[0].message && (
        <Alert
          className=""
          message={response.error?.graphQLErrors[0].message}
          type="error"
        />
      )}
      {response && !response.error && (
        <Alert
          className=""
          message={"Your password has been reset!"}
          type="success"
          action={
            <Link href="/login" passHref>
              <Button size="small" type="primary">
                Login
              </Button>
            </Link>
          }
        />
      )}
    </Form>
  );
}

export default ConfirmPasswordForm;
