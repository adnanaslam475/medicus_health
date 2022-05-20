import React from "react";
import Router from "next/router";
import { Button, Select, notification, Form, FormInstance } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import {
  UpdateStaffInput,
  useCreateStaffMutation,
  User,
} from "generated/graphql";
import AddAdminUserFormItems from "common/components/AddAdminUserFormItems/AddAdminUserFormItems";
// import _classes from "../../staff/staff.module.scss";

type Props = {};
const { Option } = Select;

function AdminAddUser({}: Props) {
  const [form] = Form.useForm();
  const [{ fetching }, createStaff] = useCreateStaffMutation();

  const onFinish = async (values: UpdateStaffInput) => {
    console.log("values", values);
    try {
      const response = await createStaff({
        createStaffInput: {
          ...values,
        },
      });
      if (response?.error) {
        response?.error?.graphQLErrors[0]?.message &&
          notification.error({
            message:
              response?.error?.graphQLErrors[0]?.message ||
              "Something went wrong",
          });
      }
      if (response.data) {
        form.resetFields();
      }
    } catch (error) {
      console.log("catch_err", error);
    }
  };

  return (
    <AppLayout>
      <div className="w-full max-w-[600px]">
        <div className="flex flex-col">
          <h2 className="mb-4">Add User</h2>
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="flex flex-col "
          >
            <div className="md:grid md:grid-cols-2 md:gap-x-4">
              <AddAdminUserFormItems />
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-4">
              <Form.Item name="status" label="Status">
                <Select>
                  <Option value={false}>Active</Option>
                  <Option value={true}>Disabled</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex justify-end pb-0">
              <Form.Item noStyle>
                <Button
                  loading={fetching}
                  disabled={fetching}
                  type="primary"
                  htmlType="submit"
                  className={`ml-4 py-2`}
                >
                  Add Staff
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminAddUser;
