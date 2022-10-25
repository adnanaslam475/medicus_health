import React from "react";
import { Button, notification, Form, FormInstance } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import { CreateAdminInput, useCreateAdminMutation } from "generated/graphql";
import AddAdminUserFormItems from "common/components/AddAdminUserFormItems/AddAdminUserFormItems";
import Router from "next/router";
import { GraphQLError } from "graphql";
import { isChrome } from "utils/helper";

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
          password: values.password,
        },
      });
      if (response?.error) {
        let graphQLError = response?.error?.graphQLErrors[0]?.extensions
          ?.response as GraphQLError;
        let customError = response?.error?.graphQLErrors[0]?.extensions
          ?.exception as GraphQLError;
        let errorMessage =
          graphQLError?.message[0] ||
          customError?.message ||
          "Something went wrong";
        notification.error({
          message: errorMessage,
        });
      }
      if (response.data) {
        form.resetFields();
        notification.success({
          message: "User added successfully",
        });
        Router.push("/admin/users");
      }
    } catch (error: any) {
      notification.error({
        message: error.message || "Something went wrong",
      });
    }
  };

  return (
    <AppLayout>
      <div className="relative h-[85vh]">
        <Form onFinish={onFinish} layout="vertical" className="flex flex-col ">
          <div className="w-full max-w-[600px]">
            <div className="flex flex-col">
              <h2 className="mb-4">Add user</h2>
              <div className="md:grid md:grid-cols-2 md:gap-x-4">
                <AddAdminUserFormItems />
              </div>
              <div className="text-right">
                <Form.Item noStyle>
                  <Button
                    loading={fetching}
                    disabled={fetching}
                    type="primary"
                    htmlType="submit"
                    className={`ml-0 py-2 ${isChrome && 'antCustomBtn'}`}
                  >
                    Add user
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
          {/* <div className="flex justify-end pb-0 absolute bottom-0 right-0">
            <Form.Item noStyle>
              <Button
                loading={fetching}
                disabled={fetching}
                type="primary"
                htmlType="submit"
                className="ml-4 py-2"
              >
                Add user
              </Button>
            </Form.Item>
          </div> */}
        </Form>
      </div>
    </AppLayout>
  );
}
export default AdminAddUser;
