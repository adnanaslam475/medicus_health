import React from "react";
import Router, { useRouter } from "next/router";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, notification } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import StaffDetailsFrom from "./StaffdetailsForm";
import {
  UpdateStaffInput,
  useGetStaffDetailsUrlByIdQuery,
  User,
  useUpdateStaffProfileMutation,
  useUserForgotPasswordMutation,
} from "generated/graphql";
import { getUserData } from "common/utils/userData";

// scss
import _classes from "../../staff/staff.module.scss";

function DoctorStaffDetails() {
  const { query } = useRouter();
  const [formInstance] = Form.useForm();
  const [{ fetching: loading }, setForgotPass] =
    useUserForgotPasswordMutation();
  const [{ fetching }, executeUpdateStaffProfileMutation] =
    useUpdateStaffProfileMutation();
  const [disableAccountInput, setDisableAccountInput] =
    React.useState<boolean>(false);
  const [{ data }] = useGetStaffDetailsUrlByIdQuery({
    variables: {
      id: Number(query.staffId),
    },
    pause: !query.staffId,
  });
  const { staffDetail } = data || {};
  React.useEffect(() => {
    if (staffDetail) {
      prepareAndSetEditPayload();
    }
  }, [staffDetail]);

  const { user } = getUserData();
  const { id } = user || {};

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      ...staffDetail,
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
          deleted: false,
        },
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        Router.push("/physician/staff");
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
  return (
    <AppLayout>
      <div className="lg:w-3/5">
        <h6 className="">{staffDetail?.id}</h6>
        <StaffDetailsFrom
          onFinish={onFinish}
          form={formInstance}
          loading={loading}
          handleChange={handleChange}
          fetching={fetching}
          handleResetLink={handleResetLink}
          staffDetail={staffDetail as User}
        />
      </div>
    </AppLayout>
  );
}
export default DoctorStaffDetails;
