import { DatePicker, Button, Tooltip } from "antd";
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

const { RangePicker } = DatePicker;

function CancelledAppointment() {
  //Get logged in User
  const { user } = getUserData();
  const { id: loggedInUser } = user || {};

  const [filterValues, setFilterValues] = useState<GetAppointmentInput>({
    status: "Completed",
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
      },
    });
  const { appointments } = data || {};

  const [{ data: physicianList }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
    },
  });
  const { getPhysicians } = physicianList || {};

  function onChangeFilters(values: GetAppointmentInput) {
    setFilterValues({ ...values, status: "Completed" });
    executeUseGetAllRequestedAppointmentsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }
  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: Number(loggedInUser) },
    requestPolicy: "network-only",
  });

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">History</h2>
          </div>
          <Tooltip
            title={
              patientHealthHistory?.patientHealthHistory?.id ? (
                ""
              ) : (
                <Link passHref href={`/patient/account?activeTab=2`}>
                  please complete health questionnaire
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
                Request an Appointment
              </span>
            </Button>
          </Tooltip>
        </div>

        <PatientAppointmentHistoryFilter onChange={onChangeFilters} />
        <div className="custom-table-ui">
          <AppointmentHistoryTable
            data={appointments as Appointment[]}
            loading={fetching}
          />
        </div>
        <BookAppointmentJourney
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          patientData={getPhysicians as User[]}
        />
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
