import React from "react";
import { Form, Input } from "antd";
import _classes from "./AddStaffFormItems.module.scss";

const createStaffForm = [
  {
    label: "First Name",
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
    required: true,
  },
  {
    label: "Contact Number",
    name: "contact_number",
    type: "number",
    required: true,
  },
];

function AddStaffFormItems() {
  return (
    <>
      {createStaffForm.map((value) => (
        <Form.Item
          key={value.name}
          label={value.label}
          rules={[
            {
              required: value.required,
              message: `Please fill ${value.label}`,
            },
          ]}
          className={`font-bold ${_classes["clr-black"]} text-black`}
          name={value.name}
        >
          <Input placeholder="" className="" />
        </Form.Item>
      ))}
    </>
  );
}

export default AddStaffFormItems;
