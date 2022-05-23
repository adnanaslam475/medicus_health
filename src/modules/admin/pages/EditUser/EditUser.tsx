import React from "react";
import Image from "next/image";
import { Button, Select, Form, notification } from "antd";
import Router, { useRouter } from "next/router";
import AddStaffFormItems from "common/components/AddStaffFormItems/AddStaffFormItems";
import AppLayout from "common/components/AppLayout/AppLayout";
import MessageIcon from "../../../../../public/assets/images/messageIcon.svg";
import CreateAdminUserForm from "common/components/AddAdminUserFormItems/AddAdminUserFormItems";
import {
  UpdateAdminMutation,
  useGetAdminUserByIdQuery,
  User,
  useUpdateAdminMutation,
  useUserForgotPasswordMutation,
} from "generated/graphql";
import _classes from "../../staff/staff.module.scss";

type Props = {};
const { Option } = Select;

function EditAdminUserDetails({}: Props) {
  const { query } = useRouter();
  const [formInstance] = Form.useForm();
  const [disableInputs, setDisableInputs] = React.useState<boolean>(true);
  const [{ fetching: loading }, setForgotPass] =
    useUserForgotPasswordMutation();
  const [{ fetching }, executeUpdateAdminMutation] = useUpdateAdminMutation();
  const [{ data }] = useGetAdminUserByIdQuery({
    variables: {
      id: 710,
    },
    // pause: !query.adminId,
  });
  const { user: adminUser } = data || {};
  React.useEffect(() => {
    if (adminUser) {
      prepareAndSetEditPayload();
    }
  }, [adminUser]);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      ...adminUser,
    });
  }
  const onFinish = async (values: UpdateAdminMutation) => {
    try {
      const response = await executeUpdateAdminMutation({
        id: Number(query?.admin),
        updateAdminUserInput: {
          // first_name: values?.first_name,
          // last_name: values?.last_name,
          // email: values?.email,
          // contact_number: values?.contact_number,
          // deleted: disableAccountInput,
        },
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        formInstance.resetFields();
      }
    } catch (error: any) {
      notification.error({
        message: error.message || "Something went wrong",
      });
    }
  };
  const handleResetLink = async () => {
    let { email } = formInstance.getFieldsValue();
    try {
      const response = await setForgotPass({
        input: email as string,
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something Went Wrong",
      });
    }
  };
  console.log("admin", adminUser);
  return (
    <AppLayout>
      <>
        <div className="lg:w-3/5">
          <h6 className="">{adminUser?.id}</h6>
          <h1>
            {" "}
            {adminUser?.first_name} {adminUser?.last_name}{" "}
          </h1>
          <p>{adminUser?.email}</p>
        </div>
        <div className="flex">
          <Button
            className="ml-auto"
            loading={loading}
            type="link"
            icon={
              <Image
                src={MessageIcon}
                className="mr-10 pr-12"
                width={20}
                height={50}
              />
            }
            disabled={loading}
            onClick={handleResetLink}
          >
            Send Password Reset link
          </Button>
        </div>
        <Form
          initialValues={{ ...adminUser }}
          onFinish={onFinish}
          className="max-w-[800px]"
          aria-disabled
          form={formInstance}
          layout="vertical"
        >
          <div className="flex mb-8">
            <Form.Item name="status">
              <Select className="mr-5" style={{ width: 200 }}>
                <Option value={false}>Active</Option>
                <Option value={true}>Disabled</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-x-4">
            <CreateAdminUserForm  />
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
      </>
    </AppLayout>
  );
}
export default EditAdminUserDetails;
