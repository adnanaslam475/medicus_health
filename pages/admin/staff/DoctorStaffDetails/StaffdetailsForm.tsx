import React from "react";
import { Button, Select, Form, FormInstance } from "antd";
import Router from "next/router";
import { UpdateStaffInput, User } from "generated/graphql";
import AddStaffFormItems from "common/components/AddStaffFormItems/AddStaffFormItems";

import _classes from "../../staff/staff.module.scss";
import { isChrome } from "utils/helper";

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
      <div
        className={
          disableAccountInput
            ? `${_classes["staff-select-enable"]} flex mb-8`
            : `${_classes["staff-select-disable"]} flex mb-8`
        }
      >
        <Select
          className="mr-5"
          placeholder="Send reset password link"
          onChange={handleChange}
          value={disableAccountInput}
          style={{ width: 220 }}
        >
          <Option value={true}>Enable</Option>
          <Option value={false}>Disable</Option>
        </Select>
        <Button
          className={`ml-4 ${isChrome && 'antCustomBtn'}`}
          loading={loading}
          disabled={loading}
          onClick={handleResetLink}
        >
          Send reset password link
        </Button>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-4">
        <AddStaffFormItems />
      </div>
      <div className="flex justify-end">
        <Form.Item>
          <div className="flex gap-4">
            <Button
              className={`${isChrome && 'antCustomBtn'}`}
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
              className={`${isChrome && 'antCustomBtn'}`}
              loading={fetching}
              disabled={fetching}
              type="primary"
              htmlType="submit"
            >
              Save changes
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
}
export default StaffDetailsFrom;
