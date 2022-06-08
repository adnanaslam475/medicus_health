import React from "react";
import { Button, notification, Form, FormInstance } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import { CreateAdminInput, useCreateAdminMutation } from "generated/graphql";
import AddAdminUserFormItems from "common/components/AddAdminUserFormItems/AddAdminUserFormItems";
import Router from "next/router";

type Props = {};

function AdminAddUser({}: Props) {
  const [form] = Form.useForm();
  const [{ fetching }, createAdminUser] = useCreateAdminMutation();

  const onFinish = async (values: CreateAdminInput) => {
    try {
      const response = await createAdminUser({
        createAdminInput: {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
        },
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        form.resetFields();
        notification.success({
          message: "User added successfully",
        });
        Router.push("/admin/user");
      }
    } catch (error: any) {
      notification.error({
        message: error.message || "Something went wrong",
      });
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
            <div className="flex justify-end pb-0">
              <Form.Item noStyle>
                <Button
                  loading={fetching}
                  disabled={fetching}
                  type="primary"
                  htmlType="submit"
                  className={`ml-4 py-2`}
                >
                  Add User
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
