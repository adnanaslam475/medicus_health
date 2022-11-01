import React, { useState } from "react";
import { Button, notification, Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentPriceResponse,
  AppointmentServiceType,
  AppointmentTimeSlots,
  GetAppointmentInput,
  useAdminPhysicianAppointmentQuery,
  usePhysicianPaymentByAdminMutation,
  User,
} from "generated/graphql";
import AdminPhysicianPatientAppointmentSearchFilters from "./AdminPhysicianPatientAppointmentSearchFilters";
import StatusChip from "common/components/StatusChip/StatusChip";
import { useRouter } from "next/router";
import { date } from "common/utils";
import { StatusName } from "common/types/types";
import { tableFooter } from "utils/helper";
import { currencyFormatter } from "common/utils/date";

function AdminPhysicianList() {
  const { query } = useRouter();
  let defaultPageSize =
    localStorage.getItem("adminPhysicianPatientAppointmentPerPageLimit") || 10;

  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: Number(defaultPageSize),
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [filterValues, setFilterValues] = useState<GetAppointmentInput>({});

  const [{ data, fetching }, executeUseAdminPhysicianAppointmentQuery] =
    useAdminPhysicianAppointmentQuery({
      variables: {
        filter: {
          ...filterValues,
          doctorId: Number(query.id),
        },
        pagination,
        sorting,
      },
    });
  const { appointments } = data || {};

  // Physician Payment By Admin Mutatio
  const [result, PhysicianPaymentByAdmin] =
    usePhysicianPaymentByAdminMutation();

  const onPayPhysician = async (appointmentId: number) => {
    try {
      appointmentId;
      const res = await PhysicianPaymentByAdmin({
        paymentInput: {
          appointmentId: appointmentId,
        },
      });

      if (res?.data) {
        res?.data &&
          notification.success({
            message: "Payment Successfull",
          });
      }

      if (res?.error) {
        notification.error({
          message:
            res?.error?.graphQLErrors[0]?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "ID#",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Patient name",
      dataIndex: "patient",
      key: "patient",
      render: (patient: User) => {
        return <div>{`${patient?.first_name} ${patient?.last_name}`}</div>;
      },
      sorter: true,
    },
    {
      title: "Appointment type",
      // dataIndex: "serviceType",
      key: "serviceType",
      sorter: true,
      render: (value: Appointment) => {
        const appointmentType =
          value?.appointmentTypeProposed?.type ||
          value?.serviceType?.name ||
          "-";
        return <div>{appointmentType}</div>;
      },
    },
    {
      title: "Appointment date",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        let formatedStartTime = date.formatMMMMDDYYYY(
          String(appointmentDateTime?.startTime)
        );
        return (
          <div>
            {appointmentDateTime?.startTime ? `${formatedStartTime} ` : "--"}
          </div>
        );
      },
      sorter: true,
    },
    {
      title: "Appointment time",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        return (
          <div>
            {appointmentDateTime?.startTime && appointmentDateTime?.endTime
              ? `${date?.formathhmma(
                appointmentDateTime?.startTime
              )} - ${date?.formathhmma(appointmentDateTime.endTime)}`
              : "--"}
          </div>
        );
      },
      sorter: true,
    },
    {
      title: "Total amount",
      dataIndex: "appointmentCharges",
      key: "appointmentCharges",
      render: (appointmentCharges: AppointmentPriceResponse) => {
        return <div>{appointmentCharges?.total ? currencyFormatter(appointmentCharges?.total) : "--"}</div>;
      },
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return (
          <div className="text-primary">
            <StatusChip type={status.toUpperCase() as StatusName} />
          </div>
        );
      },
      sorter: true,
    },
    // {
    //   title: "",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (appointmentId: number) => {
    //     return (
    //       <Button
    //         className=""
    //         type="primary"
    //         size={"large"}
    //         onClick={() => onPayPhysician(appointmentId)}
    //       >
    //         Pay Now
    //       </Button>
    //     );
    //   },
    // },
    {
      title: "",
      dataIndex: "id",
      key: "view",
      className: "table-action-icon",
      render: (value: string) => (
        <div className="text-primary">
          <EyeFilled
            className="text-primary"
            onClick={() => {
              Router.push(`/admin/physicians/detail/${value}`);
            }}
          />
        </div>
      ),
    },
  ];

  const onPaginationChange = (page: number, limit: number) => {
    localStorage.setItem(
      "adminPhysicianPatientAppointmentPerPageLimit",
      String(limit)
    );
    setPagination({ page, limit });
  };

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order ? `user.${sorter.field}` : "",
    });
  };

  function onChangeFilters(filterValue: GetAppointmentInput) {
    setFilterValues(filterValue);
    setPagination({ ...pagination, page: 1 });
    executeUseAdminPhysicianAppointmentQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="pb-0">Appointments</h2>
      </div>

      <AdminPhysicianPatientAppointmentSearchFilters
        onChange={onChangeFilters}
      />
      <div className="w-full">
        <div>
          <Table
            scroll={{ x: true }}
            columns={columns}
            dataSource={appointments?.items}
            loading={fetching}
            onChange={onChange}
            footer={(currentPageCount) =>
              tableFooter(
                currentPageCount?.length,
                Number(appointments?.meta?.totalItems || 0)
              )
            }
            pagination={{
              total: Number(appointments?.meta?.totalPages) * pagination.limit,
              current: appointments?.meta?.currentPage,
              defaultPageSize: Number(defaultPageSize),
              onChange: onPaginationChange,
              pageSizeOptions: ["10", "20", "30", "40"],
              showSizeChanger: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default AdminPhysicianList;
