import React from "react";
import { Form, Input } from "antd";

const createAdminUserForm = [
  {
    label: "Name",
    name: "first_name",
    required: true,
    type: "text",
  },
  {
    label: "Last Name",
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
