import React from "react";
import { Form, Input } from "antd";
import _classes from "./AddStaffFormItems.module.scss";
import { date } from "common/utils";

const createStaffForm = [
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
    required: true,
  },
  {
    label: "Contact number",
    name: "contact_number",
    type: "number",
    required: true,
  },
];

type Props = {
  accountCreatedAt?: string;
};

function AddStaffFormItems(props: Props) {
  const { accountCreatedAt } = props || {};
  return (
    <>
      {createStaffForm.map((value) => (
        <div className={`{${_classes["form-item-wrapper"]}}`}>
        <Form.Item
        // className={`{${_classes["form-item-wrapper"]}}`}
          key={value.name}
          label={value.label}
          rules={[
            {
              required: value.required,
              message: `Please fill ${value.label}`,
            },
            value?.type === "email"
              ? {
                  type: "email",
                  message: "Email is invalid",
                }
              : {},
          ]}
          className={`${_classes["clr-black"]} text-black`}
          name={value.name}
        >
          <Input placeholder="" className="" />
        </Form.Item>
        </div>
      ))}
      <div className="flex flex-col gap-2 account-creation-date">
        <span className="text-secondary font-semibold text-sm py-1">
          Account creation date
        </span>
        <div className="border border-gray-4 rounded min-h-[48px] bg-gray-4  flex items-center pl-5">
          {`${date?.formatDAYMMDDYY(
            accountCreatedAt as string
          )} ${date?.formathhmma(accountCreatedAt as string)}`}
        </div>
      </div>
    </>
  );
}

export default AddStaffFormItems;
