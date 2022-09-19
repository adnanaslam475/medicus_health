import React from "react";
import { Form, Input } from "antd";

const createAdminUserForm = [
  {
    label: "First name",
    name: "first_name",
    required: true,
    type: "text",
    errorName: "first name",
  },
  {
    label: "Last name",
    name: "last_name",
    type: "text",
    required: true,
    errorName: "last name",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: false,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
    errorName: "password",
  },
  {
    label: "Confirm password",
    name: "confirmPassword",
    type: "confirmPassword",
    required: true,
    errorName: "confirm password",
  },
];

function CreateAdminUserForm() {
  return (
    <>
      {createAdminUserForm.map((value) => (
        <Form.Item
          key={value.name}
          label={value.label}
          rules={[
            value?.name === "email"
              ? {
                  type: "email",
                  required: true,
                  message: "Email must be valid",
                }
              : {
                  required: value.required,
                  message: `Please fill ${value.errorName}`,
                },
            ({ getFieldValue }) => ({
              validator() {
                if (
                  value?.name === "confirmPassword" &&
                  getFieldValue("password") !== getFieldValue("confirmPassword")
                ) {
                  return Promise.reject(
                    "Confirm password should match with password "
                  );
                } else if (
                  value?.name === "password" &&
                  getFieldValue("password")?.length <8
                ) {
                  return Promise.reject("Password must be 8 characters long ");
                }
                return Promise.resolve();
              },
            }),
          ]}
          // className={`font-bold`}
          name={value.name}
        >
          {value?.name === "password" || value?.name === "confirmPassword" ? (
            <Input.Password
              autoComplete="new-password"
              onPressEnter={(e) => e.preventDefault()}
            />
          ) : (
            <Input />
          )}
        </Form.Item>
      ))}
    </>
  );
}

export default CreateAdminUserForm;
