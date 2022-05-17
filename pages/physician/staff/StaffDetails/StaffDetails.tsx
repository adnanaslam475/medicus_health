import React from "react";
import Router, { useRouter } from "next/router";
import _classes from "../../staff/staff.module.scss";
import AppLayout from "common/components/AppLayout/AppLayout";
import { CloseOutlined } from "@ant-design/icons";
import { Form, Button, notification, Input, Select } from "antd";
import {
  UpdateStaffInput,
  useGetStaffDetailsUrlByIdQuery,
  useUpdateStaffProfileMutation,
  useUserForgotPasswordMutation,
} from "generated/graphql";
import { createStaffForm } from "utils/helper";
import { getUserData } from "common/utils/userData";

const { Option } = Select;
function StaffDetails() {
  const { query } = useRouter();
  const { user } = getUserData();
  const id = user?.id;
  const [forgotPass, setForgotPass] = useUserForgotPasswordMutation();
  const [{ fetching }, executeUpdateStaffProfileMutation] =
    useUpdateStaffProfileMutation();
  // const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
  const [loadingResetLink, setLoadingResetLink] =
    React.useState<boolean>(false);
  const [disableAccountInput, setDisableAccountInput] =
    React.useState<boolean>(false);
  const [formInstance] = Form.useForm();
  const [{ data }] = useGetStaffDetailsUrlByIdQuery({
    variables: {
      id: Number(query.staffId),
    },
    pause: !query.staffId,
  });
  React.useEffect(() => {
    if (data?.staffDetail) {
      prepareAndSetEditPayload();
    }
  }, [data?.staffDetail]);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      ...data?.staffDetail,
    });
  }

  const onFinish = async (values: UpdateStaffInput) => {
    try {
      const response = await executeUpdateStaffProfileMutation({
        id: Number(query?.staffId),
        updateStaffInput: {
          first_name: values?.first_name,
          last_name: values?.last_name,
          email: values?.email,
          contact_number: values?.contact_number,
          doctorId: id as number,
          deleted: disableAccountInput,
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
  const handleChange = (value: boolean) => {
    setDisableAccountInput(value);
  };

  const handleResetLink = async () => {
    setLoadingResetLink(true);
    let { email } = formInstance.getFieldsValue();
    try {
      await setForgotPass({
        input: email as string,
      });
      setLoadingResetLink(false);
    } catch (err) {
      notification.error({
        message: "Something Went Wrong",
      });
      setLoadingResetLink(false);
    }
  };

  return (
    <AppLayout>
      <div className="lg:w-5/5">
        <Button type="link" danger icon={<CloseOutlined />}>
          Delete profile
        </Button>
        <div className="lg:w-3/5">
          <h6 className="">{data?.staffDetail.id}</h6>
          <Form
            initialValues={{ ...data?.staffDetail }}
            onFinish={onFinish}
            form={formInstance}
            layout="vertical"
          >
            <h1>
              {data?.staffDetail.first_name} {data?.staffDetail.last_name}
            </h1>
            <p>{data?.staffDetail.email}</p>
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
                loading={loadingResetLink}
                disabled={loadingResetLink}
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
            <div className="flex justify-end pb-0">
              <Form.Item>
                <Button
                  type="default"
                  className="h-px-48"
                  htmlType="submit"
                  onClick={() => Router.back()}
                  size="large"
                >
                  Cancel
                </Button>
                <Button
                  loading={fetching}
                  disabled={fetching}
                  type="primary"
                  htmlType="submit"
                  className="ml-4 py-2"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
}
export default StaffDetails;
