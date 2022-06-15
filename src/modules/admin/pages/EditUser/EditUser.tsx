import React from "react";
import Image from "next/image";
import { Button, Select, Form, notification } from "antd";
import Router, { useRouter } from "next/router";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import MessageIcon from "../../../../../public/assets/images/messageIcon.svg";
import {
  useEnableOrDisablePatientMutation,
  useGetAdminUserByIdQuery,
  User,
  useRemoveAdminUserMutation,
  useUpdateAdminMutation,
  useUserForgotPasswordMutation,
} from "generated/graphql";
import _classes from "../../staff/staff.module.scss";
import EditAdminUserForm from "common/components/EditAdminUserFormItems/EditAdminUserFormItems";
import ConfirmationModal from "common/components/ConfirmationModal/ConfirmationModal";

type Props = {};
const { Option } = Select;

function EditAdminUserDetails({}: Props) {
  const { query } = useRouter();
  const [formInstance] = Form.useForm();
  const [data, enableOrDisableAdmin] = useEnableOrDisablePatientMutation();
  const [disableInputs, setDisableInputs] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);

  const [{ fetching: loading }, setForgotPass] =
    useUserForgotPasswordMutation();
  const [{ fetching }, executeUpdateAdminMutation] = useUpdateAdminMutation();
  const [{ data: adminData }, executeUseGetAdminUserByIdQuery] =
    useGetAdminUserByIdQuery({
      variables: {
        id: Number(query.userId),
      },
      pause: !query.userId,
      requestPolicy: "network-only",
    });
  const { user: adminUser } = adminData || {};

  const [{ fetching: RemoveFetching }, executeRemoveAdminUser] =
    useRemoveAdminUserMutation();
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

  const onFinish = async (values: any) => {
    try {
      const { password, confirm_password, email, first_name, last_name } =
        values;
      if (password !== confirm_password) {
        throw new Error("Password Does not match");
      }
      const response = await executeUpdateAdminMutation({
        id: Number(query.userId),
        updateAdminUserInput: {
          first_name,
          last_name,
          email,
          password: values.password || "",
          contact_number: "",
        },
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        executeUseGetAdminUserByIdQuery({ requestPolicy: "network-only" });
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
  const changeAccountStatusHandler = async () => {
    try {
      const response = await enableOrDisableAdmin({
        id: Number(query.userId),
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

  const deleteAdminUser = async () => {
    try {
      const response = await executeRemoveAdminUser({
        id: Number(query.userId),
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        notification.success({
          message: "User Delete Successfully",
        });
        Router.push(`/admin/user`);
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something Went Wrong",
      });
    }
  };
  return (
    <AppLayout>
      <>
        <div className="flex justify-between items-center">
          <div className="lg:w-3/5">
            <h6 className="">{adminUser?.id}</h6>
            <h1>
              {adminUser?.first_name} {adminUser?.last_name}
            </h1>
            <p>{adminUser?.email}</p>
          </div>
          <div className="flex">
            <div className="flex">
              <Button
                // className="ml-auto"
                loading={loading}
                type="link"
                icon={<Image alt="" src={MessageIcon} width={20} height={50} />}
                disabled={loading}
                onClick={handleResetLink}
              >
                <span className="mx-3">Send Password Reset link</span>
              </Button>
            </div>
            <div className="flex">
              <Button
                type="link"
                className="ml-auto"
                danger
                icon={<CloseOutlined />}
                onClick={() => setOpen(true)}
              >
                Delete profile
              </Button>
            </div>
          </div>
        </div>
        <Form
          initialValues={{ ...adminUser }}
          onFinish={onFinish}
          className="max-w-[800px]"
          form={formInstance}
          layout="vertical"
        >
          <div className="flex">
            <Form.Item name="status">
              <Select
                className="mr-5"
                onChange={changeAccountStatusHandler}
                style={{ width: 200 }}
              >
                <Option value={true}>Enabled</Option>
                <Option value={false}>Disabled</Option>
              </Select>
            </Form.Item>
            <Button
              className="ml-5"
              type="default"
              icon={<EditOutlined />}
              onClick={() => setDisableInputs(!disableInputs)}
            >
              Edit Info
            </Button>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-x-4">
            <EditAdminUserForm disableInputs={disableInputs} />
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <div className="flex gap-4">
                <Button onClick={() => Router.back()}>Cancel</Button>
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
      <ConfirmationModal
        visible={open}
        confirmLoading={RemoveFetching}
        onCancel={() => setOpen(false)}
        onOk={deleteAdminUser}
        message="Are you sure you want ot delete this user?"
      />
    </AppLayout>
  );
}
export default EditAdminUserDetails;
function removeAdminUser(): [{ data: any }] {
  throw new Error("Function not implemented.");
}
