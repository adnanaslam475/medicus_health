import React, { SetStateAction } from "react";
import Router, { useRouter } from "next/router";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, notification } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import StaffDetailsFrom from "./StaffdetailsForm";
import {
  UpdateStaffInput,
  useEnableOrDisableDoctorMutation,
  useEnableOrDisableStaffMutation,
  useGetStaffDetailsUrlByIdQuery,
  User,
  useRemoveStaffMutation,
  useUpdateStaffProfileMutation,
  useUserForgotPasswordMutation,
} from "generated/graphql";
import { getUserData } from "common/utils/userData";

// scss
import _classes from "../../staff/staff.module.scss";
import ConfirmationModal from "common/components/ConfirmationModal/ConfirmationModal";

function DoctorStaffDetails() {
  const { query } = useRouter();
  const [{ fetching: diableFetching }, enableOrDisableStaff] =
    useEnableOrDisableStaffMutation();
  const [formInstance] = Form.useForm();
  const [{ fetching: loading }, setForgotPass] =
    useUserForgotPasswordMutation();
  const [{ fetching }, executeUpdateStaffProfileMutation] =
    useUpdateStaffProfileMutation();
  const [disableAccountInput, setDisableAccountInput] =
    React.useState<boolean>(false);
  const [{ fetching: deleteFetching }, removeStaff] = useRemoveStaffMutation();
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

  const [open, setOpen] = React.useState<boolean>(false);

  const { user } = getUserData();
  const { id } = user || {};

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      ...staffDetail,
    });
    setDisableAccountInput(staffDetail?.status as SetStateAction<boolean>);
  }
  const deleteStaffHandler = async () => {
    try {
      const response = await removeStaff({
        id: Number(query.staffId),
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        notification.success({
          message: "Staff delete successfully",
        });
        Router.push(`/admin/physicians/${query.adminId}`);
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something Went Wrong",
      });
    }
  };
  const doctorId =
    user?.role === "Admin" ? Number(query?.adminId) : Number(user?.id);
  const onFinish = async (values: UpdateStaffInput) => {
    try {
      const response = await executeUpdateStaffProfileMutation({
        id: Number(query?.staffId),
        updateStaffInput: {
          first_name: values?.first_name,
          last_name: values?.last_name,
          email: values?.email,
          contact_number: values?.contact_number,
          doctorId: doctorId,
          // deletedAt: false,
        },
      });

      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        formInstance.resetFields();
        notification.success({
          message: "Successfully updated",
        });
        Router.push({
          pathname: `/admin/physicians/${query.adminId}`,
          query: { activeTab: "4" },
        });
      }
    } catch (error: any) {
      notification.error({
        message: error.message || "Something went wrong",
      });
    }
  };
  const handleChange = async (value: SetStateAction<boolean>) => {
    setDisableAccountInput(value);
    try {
      const response = await enableOrDisableStaff({
        id: Number(query.staffId),
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        notification.success({
          message: "Staff updated successfully",
        });
        Router.push(`/admin/physicians/${query.adminId}`);
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong",
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
  return (
    <AppLayout>
      <>
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
        <div className="lg:w-3/5">
          <h6 className="">{staffDetail?.id}</h6>
          <StaffDetailsFrom
            onFinish={onFinish}
            form={formInstance}
            loading={loading}
            disableAccountInput={disableAccountInput}
            adminId={String(query?.adminId)}
            handleChange={handleChange}
            fetching={fetching}
            handleResetLink={handleResetLink}
            staffDetail={staffDetail as User}
          />
        </div>
        <ConfirmationModal
          visible={open}
          confirmLoading={deleteFetching}
          onCancel={() => setOpen(false)}
          onOk={deleteStaffHandler}
          message="Are you sure you want to delete this staff?"
        />
      </>
    </AppLayout>
  );
}

export default DoctorStaffDetails;
