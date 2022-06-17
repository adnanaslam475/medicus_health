import React from "react";
import { Button, Empty, Form, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddStaffModal from "./AddStaffModal";
import StaffAppointmentsFilter from "../../appointments/StaffAppointmentsFilter";
import StaffTable from "modules/doctor/components/StaffTable/StaffTable";
import {
  CreateStaffInput,
  GetStaffFilter,
  useCreateStaffMutation,
  useGetAllStaffByDoctorQuery,
  User,
} from "generated/graphql";
import { getUserData } from "common/utils/userData";
import { useRouter } from "next/router";
import { GraphQLError } from "graphql";

function StaffListing() {
  const { user } = getUserData();
  const id = user?.id;
  const { query } = useRouter();
  const doctorId =
    user?.role === "Admin" ? Number(query?.id) : Number(user?.id);
  const [form] = Form.useForm();
  const [filterValues, setFilterValues] = React.useState<GetStaffFilter>({
    doctorId: doctorId,
  });
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);
  const [{ fetching }, createStaff] = useCreateStaffMutation();

  const [{ data, fetching: loading }, executeUseStaffQuery] =
    useGetAllStaffByDoctorQuery({
      variables: {
        filter: filterValues,
      },
    });
  const { staff } = data || {};

  // // ENABLE OR DISABLE STAFF DATA API CALL
  // const [{ fetching: diableFetching }, enableOrDisableStaff] =
  //   useEnableOrDisableStaffMutation();

  const onFinish = async (values: CreateStaffInput) => {
    try {
      const response = await createStaff({
        createStaffInput: {
          ...values,
          first_name: values?.first_name,
          last_name: values?.last_name,
          email: values?.email,
          contact_number: values?.contact_number,
          doctorId: Number(id),
        },
      });
      if (response?.error) {
        let errorResponse = response?.error?.graphQLErrors[0]?.extensions?.response as GraphQLError
        response?.error?.graphQLErrors[0]?.message &&
          notification.error({
            message:
            errorResponse?.message[0] ||
              "Something went wrong",
          });
      }
      if (response.data) {
        setVisibleModal(false);
        form.resetFields();
        executeUseStaffQuery({ requestPolicy: "network-only" });
        notification.success({
          message: "staff added successfully",
        });
      }
    } catch (error) {
      console.log("catch_err", error);
    }
  };
  function onChangeFilters(values: any) {
    setFilterValues({
      ...values,
      status: values?.status === "true" ? true : false,
      doctorId: doctorId,
    });

    executeUseStaffQuery({
      filter: values,
      requestPolicy: "network-only",
    });
  }
  const closeModal = () => {
    setVisibleModal(false);
  };
  return (
    <>
      <div className="w-full">
        <div className="my-2 sm:my-0 flex items-center justify-between">
          <div className="sm:mb-0">
            <h2 className="mb-0">Staff</h2>
          </div>
          <Button
            onClick={() => setVisibleModal(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            Add Staff
          </Button>
        </div>
        <div className="">
          <StaffAppointmentsFilter onChange={onChangeFilters} />
        </div>
        <div className="w-full">
          {staff?.length ? (
            <StaffTable dataSource={staff as User[]} loading={loading}  />
          ) : (
            <div className="flex items-center justify-center w-full">
              <Empty />
            </div>
          )}
        </div>
      </div>
      <AddStaffModal
        closeModal={closeModal}
        onFinish={onFinish}
        fetching={fetching}
        visibleModal={visibleModal}
        form={form}
      />
    </>
  );
}
export default StaffListing;
