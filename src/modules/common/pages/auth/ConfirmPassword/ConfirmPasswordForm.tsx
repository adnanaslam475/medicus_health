import { Alert, Button, Form, Input } from "antd";
import Password from "antd/lib/input/Password";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useTranslations } from "next-intl";

type Props = {
  onFinish: (values: { password: string }) => void;
  loading: boolean;
  response: any;
};

function ConfirmPasswordForm({ onFinish, loading, response }: Props) {
  const t = useTranslations("Confirm_pass");
  return (
    <Form
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={({ password }) => onFinish({ password })}
      autoComplete="off"
    >
      <Form.Item
        // label="Password"
        // label={t("password")}
        label="Ingrese contraseña"
        name="password"
        rules={[
          {
            required: true,
            message: t("password_message_8_character"),
            min: 8,
            // message: "password must be minimum 8 characters!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        // label="Confirm password"
        // label={t("confirm_password")}
        label="Confirme contraseña"
        name="confirmpassword"
        rules={[
          {
            required: true,
            message: t("confirm_password_message_8_character"),
            min: 8,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(t("two_passwords_mismatch_message"))
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
          Confirme contraseña
          {/* {t("confirm_password")} */}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ConfirmPasswordForm;
