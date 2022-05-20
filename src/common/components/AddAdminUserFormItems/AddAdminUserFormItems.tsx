import React from "react";
import { Form, Input } from "antd";
// import _classes from "./AddStaffFormItems.module.scss";

const createAdminUserForm = [
  {
    label: "Name",
    name: "name",
    required: true,
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: false,
  },
  {
    label: "Confirm Password",
    name: "confirm_password",
    type: "password",
    required: false,
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
            {
              required: value.required,
              message: `Please fill ${value.label}`,
            },
          ]}
          className={`font-bold`}
          name={value.name}
        >
          <Input placeholder="" className="" />
        </Form.Item>
      ))}
    </>
  );
}

export default CreateAdminUserForm;
