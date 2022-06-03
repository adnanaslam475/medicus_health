import React from "react";
import { Button, Select, Form, FormInstance } from "antd";
import Router from "next/router";
import { UpdateStaffInput, User } from "generated/graphql";
import AddStaffFormItems from "common/components/AddStaffFormItems/AddStaffFormItems";

import _classes from "../../staff/staff.module.scss";

type Props = {
  form: FormInstance<any> | undefined;
  staffDetail: User | undefined;
  handleChange: (value: boolean) => void;
  loading: boolean;
  fetching: boolean;
  disableAccountInput: boolean | undefined;
  adminId: string | undefined;
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
  adminId,
  disableAccountInput,
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
          value={disableAccountInput}
          style={{ width: 200 }}
        >
          <Option value={true}>Active</Option>
          <Option value={false}>Inactive</Option>
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
        <AddStaffFormItems />
      </div>
      <div className="flex justify-end">
        <Form.Item>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                Router.push({
                  pathname: `/admin/physicians/${adminId}`,
                  query: { activeTab: "4" },
                });
              }}
            >
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
