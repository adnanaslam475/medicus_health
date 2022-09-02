import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";

import {
  Appointment,
  GetAppointmentInput,
  useGetAllRequestedAppointmentsQuery,
  useGetPhysiciansQuery,
  usePatientHealthHistoryQuery,
  User,
} from "generated/graphql";
import AppointmentHistoryTable from "common/components/AppointmentHistoryTable/AppointmentHistoryTable";
import _classes from "./HistoryAppointments.module.scss";
import PatientAppointmentHistoryFilter from "common/components/PatientAppointmentHistoryFilter/PatientAppointmentHistoryFilter";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import { getUserData } from "common/utils/userData";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { translationJson } from "common/locales/translationJson";

function CancelledAppointment() {
  const t = useTranslations("HistoryAppointments");

  //Get logged in User
  const { user } = getUserData();
  const { id: loggedInUser } = user || {};

  const [filterValues, setFilterValues] = useState<GetAppointmentInput>({
    status: "Completed",
  });
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showAppointmentBookingModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // GET ALL APPOINMENTS
  const [{ data, fetching }, executeUseGetAllRequestedAppointmentsQuery] =
    useGetAllRequestedAppointmentsQuery({
      variables: {
        filter: filterValues,
        pagination: { limit: -1, page: 1 },
        sorting,
      },
    });
  const { appointments } = data || {};

  const [{ data: physicianList }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
      pagination: { limit: -1, page: 1 },
    },
  });
  const { getPhysicians } = physicianList || {};

  function onChangeFilters(values: GetAppointmentInput) {
    setPagination({ ...pagination, page: 1 });
    setFilterValues({ ...values, status: "Completed" });
    executeUseGetAllRequestedAppointmentsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }
  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order
        ? `${
            (sorter.field === "transaction" && "transaction") ||
            (/(status|charges|requestedDate|createdAt|id)/.test(
              sorter.columnKey
            ) &&
              "appointment") ||
            (sorter.columnKey === "name" && "appointment_service_type") ||
            (sorter.columnKey === "startTime" && "appointment_time_slots") ||
            (sorter.columnKey === "requestedDate" && "appointment") ||
            "user"
          }.${sorter.columnKey || sorter.field}`
        : "",
    });
  };

  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: Number(loggedInUser) },
    requestPolicy: "network-only",
  });

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">
              {t("appointments_history")}
              {/* History */}
            </h2>
          </div>
          <Tooltip
            title={
              patientHealthHistory?.patientHealthHistory?.id ? (
                ""
              ) : (
                <Link passHref href={`/patient/account?activeTab=2`}>
                  {t("please_complete_health_questionnaire")}
                  {/* please complete health questionnaire */}
                </Link>
              )
            }
          >
            <Button
              type="primary"
              className="text-sm"
              onClick={showAppointmentBookingModal}
              disabled={
                patientHealthHistory?.patientHealthHistory?.id ? false : true
              }
            >
              <span className="text-xs sm:text-base">
                {t("request_an_appointment")}
                {/* Request an appointment */}
              </span>
            </Button>
          </Tooltip>
        </div>

        <PatientAppointmentHistoryFilter onChange={onChangeFilters} />
        <div className="custom-table-ui">
          <AppointmentHistoryTable
            pagination={pagination}
            data={appointments?.items as Appointment[]}
            loading={fetching}
            meta={appointments?.meta}
            onChange={onChange}
            onPaginationChange={onPaginationChange}
          />
        </div>
        <BookAppointmentJourney
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          patientData={getPhysicians?.items as User[]}
        />
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
