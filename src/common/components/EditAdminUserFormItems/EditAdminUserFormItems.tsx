import React from "react";
import { Form, Input } from "antd";

const editAdminUserForm = [
  {
    label: "First name",
    name: "first_name",
    required: true,
    type: "text",
  },
  {
    label: "Last name",
    name: "last_name",
    type: "text",
    required: true,
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
    required: false,
  },
  {
    label: "Confirm password",
    name: "confirm_password",
    type: "password",
    required: false,
  },
];

type Props = {
  disableInputs: boolean;
};
function EditAdminUserForm({ disableInputs }: Props) {
  return (
    <>
      {editAdminUserForm.map((value) => (
        <Form.Item
          key={value.name}
          label={value.label}
          rules={[
            {
              required: value.required,
              message: `Please fill ${value.label}`,
            },
          ]}
          className={`font-bold`}
          name={value.name}
        >
          <Input disabled={disableInputs} type={value.type} />
        </Form.Item>
      ))}
    </>
  );
}

export default EditAdminUserForm;
