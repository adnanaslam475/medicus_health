import React from "react";
import Button from "antd/lib/button";
import Form, { FormInstance } from "antd/lib/form";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import Router from "next/router";
import { createStaffForm } from "../../../../src/constants";
import { UpdateStaffInput, User } from "generated/graphql";

import _classes from "../../staff/staff.module.scss";

interface StaffData {
  first_name: string;
  email: string;
  last_name: string;
}
type Props = {
  form: FormInstance<any> | undefined;
  staffDetail: StaffData | undefined;
  handleChange: (value: boolean) => void;
  loading: boolean;
  fetching: boolean;
  onFinish: (values: UpdateStaffInput) => void;
  handleResetLink: React.MouseEventHandler<HTMLButtonElement>;
};
const { Option } = Select;

function StaffDetailsFrom({
  handleChange,
  loading,
  fetching,
  onFinish,
  staffDetail,
  handleResetLink,
  form,
}: Props) {
  return (
    <Form
      initialValues={{ ...staffDetail }}
      onFinish={onFinish}
      form={form}
      layout="vertical"
    >
      <h1>
        {staffDetail?.first_name} {staffDetail?.last_name}
      </h1>
      <p>{staffDetail?.email}</p>
      <div className="flex mb-8">
        <Select
          className="mr-5"
          placeholder="Send Password Reset link"
          onChange={handleChange}
          style={{ width: 200 }}
        >
          <Option value={false}>Active</Option>
          <Option value={true}>Disabled</Option>
        </Select>
        <Button
          className="ml-7"
          loading={loading}
          disabled={loading}
          onClick={handleResetLink}
        >
          Send Password Reset link
        </Button>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-4">
        {createStaffForm.map((value, i) => (
          <Form.Item
            key={i}
            label={value.label}
            rules={[
              {
                required: value.required,
                message: `Please fill ${value.label}`,
              },
            ]}
            className={`font-bold ${_classes["clr-black"]}`}
            name={value.name}
          >
            <Input placeholder="" type={value.type} className="" />
          </Form.Item>
        ))}
      </div>
      <div className="flex justify-end">
        <Form.Item>
          <div className="flex gap-4">
            <Button htmlType="submit" onClick={() => Router.back()}>
              Cancel
            </Button>
            <Button
              loading={fetching}
              disabled={fetching}
              type="primary"
              htmlType="submit"
            >
              Save Changes
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
}
export default StaffDetailsFrom;
