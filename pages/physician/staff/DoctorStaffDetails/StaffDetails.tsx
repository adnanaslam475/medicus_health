import React from "react";
import { useRouter } from "next/router";
import { CloseOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import StaffDetailsFrom from "./StaffdetailsForm";
import Notification from "antd/lib/notification";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import {
  UpdateStaffInput,
  useGetStaffDetailsUrlByIdQuery,
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
      Notification.error({
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
      await setForgotPass({
        input: email as string,
      });
    } catch (err) {
      Notification.error({
        message: "Something Went Wrong",
      });
    }
  };
  return (
    <AppLayout>
      <div className="lg:w-5/5">
        <Button
          type="link"
          className="absolute right-0"
          danger
          icon={<CloseOutlined />}
        >
          Delete profile
        </Button>
        <div className="lg:w-3/5">
          <h6 className="">{staffDetail?.id}</h6>
          <StaffDetailsFrom
            onFinish={onFinish}
            form={formInstance}
            loading={loading}
            handleChange={handleChange}
            fetching={fetching}
            handleResetLink={handleResetLink}
            staffDetail={staffDetail}
          />
        </div>
      </div>
    </AppLayout>
  );
}
export default DoctorStaffDetails;
