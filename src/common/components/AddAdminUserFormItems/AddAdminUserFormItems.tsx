import React from "react";
import { Form, Input } from "antd";

const createAdminUserForm = [
  {
    label: "First name",
    name: "first_name",
    required: true,
    type: "text",
    errorName:"first name"
  },
  {
    label: "Last name",
    name: "last_name",
    type: "text",
    required: true,
    errorName:"last name"

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
    name: "confirmPassword",
    type: "confirmPassword",
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
            value?.name ==="email"?
            {
              type:"email",
              required: true,
              message: "Email must be valid",
            }
           
            :{
              required: value.required,
              message: `Please fill ${value.errorName}`,
            }
          ]}
         
          className={`font-bold`}
          name={value.name}
        >
          {value?.name === "password" || value?.name === "confirmPassword" ? (
            <Input.Password
              autoComplete="new-password"
              onPressEnter={(e) => e.preventDefault()}
            />
          ) : (
            <Input/>
          )}
        </Form.Item>
      ))}
    </>
  );
}

export default CreateAdminUserForm;
