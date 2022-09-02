import React from "react";
import { Button, Empty, Form, notification, Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddStaffModal from "./AddStaffModal";
import StaffAppointmentsFilter from "../../appointments/StaffAppointmentsFilter";
import StaffTable from "modules/doctor/components/StaffTable/StaffTable";
import {
  CreateStaffInput,
  GetStaffFilter,
  useCreateStaffMutation,
  useDoctorProfileQuery,
  useGetAllStaffByDoctorQuery,
  useGetUserQuery,
  User,
} from "generated/graphql";
import { getRole, getUserData } from "common/utils/userData";
import { useRouter } from "next/router";
import { GraphQLError } from "graphql";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";

function StaffListing() {
  const { user } = getUserData();
  const id = user?.id;
  const { query } = useRouter();
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const doctorId =
    user?.role === "Admin" ? Number(query?.id) : Number(user?.id);
  const [form] = Form.useForm();
  const [filterValues, setFilterValues] = React.useState<GetStaffFilter>({
    doctorId: doctorId,
  });
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);
  const [{ fetching }, createStaff] = useCreateStaffMutation();

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching: loading }, executeUseStaffQuery] =
    useGetAllStaffByDoctorQuery({
      variables: {
        filter: filterValues,
        pagination,
        sorting,
      },
    });

  const { staff } = data || {};

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order:
        (sorter.order === "ascend" &&
          sorter.columnKey === "status" &&
          "desc") ||
        (sorter.order === "ascend" &&
          !(sorter.columnKey === "status") &&
          "asc") ||
        (sorter.order === "ascend" &&
          !(sorter.columnKey === "status") &&
          "asc") ||
        (sorter.order === "descend" &&
          sorter.columnKey === "status" &&
          "asc") ||
        (sorter.order === "descend" &&
          !(sorter.columnKey === "status") &&
          "desc") ||
        "",
      column: sorter.order ? `user.${sorter.field || sorter.columnKey}` : "",
    });
  };

  // // ENABLE OR DISABLE STAFF DATA API CALL
  // const [{ fetching: diableFetching }, enableOrDisableStaff] =
  //   useEnableOrDisableStaffMutation();

  const onFinish = async (values: CreateStaffInput) => {
    try {
      const response = await createStaff({
        createStaffInput: {
          ...values,
          doctorId: getRole() === "Admin" ? Number(query?.id) : Number(id),
          first_name: values?.first_name,
          last_name: values?.last_name,
          email: values?.email,
          contact_number: `+${values?.contact_number}`,
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
        response?.error?.graphQLErrors[0]?.message &&
          notification.error({
            message: errorMessage,
          });
      }
      if (response.data) {
        setVisibleModal(false);
        form.resetFields();
        executeUseStaffQuery({ requestPolicy: "network-only" });
        notification.success({
          message: "Staff added successfully",
        });
      }
    } catch (error) {
      console.log("catch_err", error);
    }
  };

  function onChangeFilters(values: any) {
    setPagination({ ...pagination, page: 1 });
    setSorting({ column: "", order: "" });
    setFilterValues({
      ...values,
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
  const [{ data: physicianProfileData, fetching: physicianLoading }] =
    useDoctorProfileQuery({
      variables: { doctor_id: doctorId },
      pause: !doctorId,
    });

    const [{ data: userData }] = useGetUserQuery({
      variables: { input: Number(doctorId) },
      pause: !doctorId,
    });
    const {
      first_name,
      last_name,
      email:userEmail
    } = userData?.user || {};

  const { doctorProfile } = physicianProfileData || {};
  const userName = `${doctorProfile?.user?.first_name || first_name} ${doctorProfile?.user?.last_name || last_name}`;
  const profilePicture = doctorProfile?.profile_image;
  const email = doctorProfile?.user?.email || userEmail;
  return (
    <>
      <div className="w-full">
        <Skeleton
          loading={physicianLoading}
          paragraph={{ rows: 1 }}
          active
        >
          <CardWithProfileImageInfo
            name={userName}
            serviceName={String(email)}
            imageUrl={profilePicture}
          >
          </CardWithProfileImageInfo>
        </Skeleton>
        <div className="my-2 sm:my-0 flex items-center justify-between">
          <div className="sm:mb-0">
            <h2 className="mb-0">Staff</h2>
          </div>
          <Button
            onClick={() => setVisibleModal(true)}
            type="primary"
            icon={<div className="text-2xl mb-[3px]">+&nbsp;</div>} 
          >
            Add staff
          </Button>
        </div>
        <div className="">
          <StaffAppointmentsFilter onChange={onChangeFilters} />
        </div>
        <div className="w-full">
          {staff?.items ? (
            <StaffTable
              dataSource={staff.items as User[]}
              loading={loading}
              onChange={onChange}
              pagination={pagination}
              meta={staff?.meta}
              onPaginationChange={onPaginationChange}
            />
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
