import React from "react";
import { Button, Empty, Form, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import {
  Appointment,
  UpdateStaffInput,
  useCreateStaffMutation,
  useGetAllStaffByDoctorQuery,
  User,
} from "generated/graphql";
import StaffTable from "modules/doctor/components/StaffTable";
import { getUserData } from "common/utils/userData";
import { staffFilterType } from "common/types/types";
import AddStaffModal from "./AddStaffModal";
import UpcomingAppointmentFilter from "../../appointments/UpcomingAppointmentFilter";

function StaffListing() {
  const [form] = Form.useForm();
  const [filterValues, setFilterValues] = React.useState<staffFilterType>({});
  const [{ data: staffData }, executeUseStaffQuery] =
    useGetAllStaffByDoctorQuery();
  const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [, createStaff] = useCreateStaffMutation();

  const { user } = getUserData();
  const id = user?.id;

  const [{ data }] = useGetAllStaffByDoctorQuery();
  const { staff } = data || {};
  const handleSubmit = async (values: UpdateStaffInput) => {
    setLoadingSubmit(true);
    try {
      const response = await createStaff({
        createStaffInput: {
          ...values,
          first_name: values?.first_name,
          last_name: values?.last_name,
          email: values?.email,
          contact_number: values?.contact_number,
          doctorId: id as number,
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
      setLoadingSubmit(false);
      if (response.data) {
        setShowModal(false);
        form.resetFields();
      }
    } catch (error) {
      setLoadingSubmit(false);
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
    setShowModal(false);
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
              onClick={() => setShowModal(true)}
              type="primary"
              icon={<PlusOutlined />}
            >
              Add Staff
            </Button>
          </div>
          <div className="w-5/6">
            <UpcomingAppointmentFilter onChange={onChangeFilters} />
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
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
        showModal={showModal}
        form={form}
      />
    </>
  );
}
export default StaffListing;
