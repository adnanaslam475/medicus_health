import React from "react";
import { Button, Empty, Form, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
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

function StaffListing() {
  const [form] = Form.useForm();
  const [filterValues, setFilterValues] = React.useState<GetStaffFilter>({});
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);
  const [{ fetching }, createStaff] = useCreateStaffMutation();

  const { user } = getUserData();
  const id = user?.id;

  const [{ data }, executeUseStaffQuery] = useGetAllStaffByDoctorQuery({
    variables: {
      filter: {
        ...filterValues,
      },
    },
  });
  const { staff } = data || {};
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
        response?.error?.graphQLErrors[0]?.message &&
          notification.error({
            message:
              response?.error?.graphQLErrors[0]?.message ||
              "Something went wrong",
          });
      }
      if (response.data) {
        setVisibleModal(false);
        form.resetFields();
      }
    } catch (error) {
      console.log("catch_err", error);
    }
  };

  function onChangeFilters(values: any) {
    setFilterValues(values);
    executeUseStaffQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }
  const closeModal = () => {
    setVisibleModal(false);
  };
  return (
    <>
      <AppLayout>
        <div className="w-full">
          <div className="flex-none sm:flex items-center justify-between mb-5">
            <div className="pr-3 mb-3 sm:mb-0">
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
          <div className="w-5/6">
            <StaffAppointmentsFilter onChange={onChangeFilters} />
          </div>
          <div className="w-full">
            {staff?.length ? (
              <StaffTable dataSource={staff as User[]} />
            ) : (
              <div className="flex items-center justify-center w-full">
                <Empty />
              </div>
            )}
          </div>
        </div>
      </AppLayout>
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
