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
  form,
  adminId,
  disableAccountInput,
}: Props) {
  return (
    <Form
      initialValues={{ ...staffDetail }}
      onFinish={onFinish}
      form={form}
      layout="vertical"
    >
      <h1 className="pb-0 mb-0">
        {staffDetail?.first_name} {staffDetail?.last_name}
      </h1>
      <p>{staffDetail?.email}</p>
      <div className={`${_classes["staff-wrapper"]} sm:flex mb-8`}>
        {/* <Select className="mr-5" onChange={handleChange} style={{ width: 200 }}> */}
        <div
          className={
            disableAccountInput
              ? `${_classes["staff-select-enable"]}`
              : `${_classes["staff-select-disable"]}`
          }
        >
          <Select
            className="mr-5"
            placeholder="Send reset password link"
            onChange={handleChange}
            value={disableAccountInput}
            style={{ width: 216 }}
          >
            <Option value={true}>Enable</Option>
            <Option value={false}>Disable</Option>
          </Select>
        </div>
        <Button
          className="sm:ml-2 mt-2 sm:mt-0"
          loading={loading}
          disabled={loading}
          onClick={handleResetLink}
        >
          Send reset password link
        </Button>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-4">
        <AddStaffFormItems accountCreatedAt={staffDetail?.createdAt} />
      </div>
      <div className="flex justify-end mt-2">
        <Form.Item>
          <div className="flex gap-4">
            <Button onClick={() => Router.push("/physician/staff")}>
              Cancel
            </Button>
            <Button
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
