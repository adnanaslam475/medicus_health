import React from "react";
import Image from "next/image";
import { Button, Select, Form, notification } from "antd";
import Router, { useRouter } from "next/router";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import MessageIcon from "../../../../../public/assets/images/messageIcon.svg";
import _classes from "./EditUser.module.scss";
import {
  useEnableOrDisablePatientMutation,
  useGetAdminUserByIdQuery,
  useRemoveAdminUserMutation,
  useUpdateAdminMutation,
  useUserForgotPasswordMutation,
} from "generated/graphql";
// import _classes from "../../staff/staff.module.scss";
import EditAdminUserForm from "common/components/EditAdminUserFormItems/EditAdminUserFormItems";
import ConfirmationModal from "common/components/ConfirmationModal/ConfirmationModal";
import { GraphQLError } from "graphql";
import { isChrome } from "utils/helper";

type Props = {};
const { Option } = Select;

function EditAdminUserDetails({ }: Props) {
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
        notification.success({
          message: "User Updated successfully",
        });
        Router.push(`/admin/users`);
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
      } else
        notification.success({
          message: "Password reset link sent successfully.",
        });
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
        Router.push(`/admin/users`);
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
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="w-full lg:w-3/5">
            <h6 className="my-0">{adminUser?.id}</h6>
            <h1 className="my-0 text-xs leading-8  md:text-lg">
              {adminUser?.first_name} {adminUser?.last_name}
            </h1>
            <p>{adminUser?.email}</p>
          </div>
          <div
            className={`${_classes["btn-wrapper-user"]} my-2 sm:my-0 flex flex-col sm:flex-row justify-self-start items-start mr-auto sm:mr-0`}
          >
            <div className="flex">
              <Button
                className={`${isChrome && 'antCustomBtn'}`}
                loading={loading}
                type="link"
                icon={
                  <Image
                    priority={true}
                    alt=""
                    src={MessageIcon}
                    width={20}
                    height={50}
                  />
                }
                disabled={loading}
                onClick={handleResetLink}
              >
                <span className="sm:mx-3 ml-2">Send reset password link</span>
              </Button>
            </div>
            <div className="flex px-0 mx-0">
              <Button
                type="link"
                className={` sm:ml-auto ${isChrome && 'antCustomBtn'}`}
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
                className="mr-5 max-w-[200px] min-w-[150px]"
                onChange={changeAccountStatusHandler}
              >
                <Option value={true}>Enabled</Option>
                <Option value={false}>Disabled</Option>
              </Select>
            </Form.Item>
            <Button
              className={`ml-5 ${isChrome && 'antCustomBtn'}`}
              type="default"
              icon={<EditOutlined />}
              onClick={() => setDisableInputs(!disableInputs)}
            >
              Edit info
            </Button>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-x-4">
            <EditAdminUserForm disableInputs={disableInputs} />
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <div className="flex gap-4">
                <Button onClick={() => Router.back()} className={`${isChrome && 'antCustomBtn'}`}>Cancel</Button>
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
      </>
      <ConfirmationModal
        visible={open}
        confirmLoading={RemoveFetching}
        onCancel={() => setOpen(false)}
        onOk={deleteAdminUser}
        message="Are you sure you want to delete this user?"
      />
    </AppLayout>
  );
}
export default EditAdminUserDetails;
