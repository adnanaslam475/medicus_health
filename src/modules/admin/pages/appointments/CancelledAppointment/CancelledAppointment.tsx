import { Button, Empty, Spin, Tooltip } from "antd";
import React, { useState } from "react";
import AppointmentCard from "../../../../../common/components/AppointmentCard/AppointmentCard";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import {
  Appointment,
  AppointmentTimeSlots,
  BookingDate,
  DoctorProfile,
  Transaction,
  useGetAllRequestedAppointmentsQuery,
  useGetPhysiciansQuery,
  usePatientHealthHistoryQuery,
  User,
} from "../../../../../generated/graphql";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import { getUserData } from "common/utils/userData";
import Link from "next/link";

function CancelledAppointment() {
  const [dueDates, setDueDates] = useState<Date | null>();
  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
  const [bookingDate, setBookingDate] = useState<BookingDate>({});
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentId, setAppointmentId] = useState<number>();
  const [currentAppointmentId, setCurrentAppointmentId] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [status, setStatus] = useState<string>("Cancelled");
  const [{ data, fetching }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: status,
        physicianName: dataListPhysician,
        doctorId: doctorIds,
        appointmentId: appointmentId,
        serviceId: serviceIds,
        bookingDate: bookingDate,
      },
    },
  });

  //Get logged in User
  const { user } = getUserData();
  const { id: loggedInUser } = user || {};

  const [{ data: physicianList }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
    },
  });
  const { getPhysicians } = physicianList || {};

  function onViewSuggestedSlots(id: number) {
    setCurrentAppointmentId(id);
    setShowModal(true);
  }

  const { appointments } = data || {};

  const [showModal, setShowModal] = useState<boolean>(false);
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

  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: Number(loggedInUser) },
    requestPolicy: "network-only",
  });

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">Canceled appointments</h2>
            <h5 className="text-gray">
              Suspendisse ac nulla non ante viverra feugiat. Duis
              ullamcorperequesty tortor a fringilla tempus.
            </h5>
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
                Request an appointment
              </span>
            </Button>
          </Tooltip>
        </div>

        <div className="md:w-5/6">
          <SearchFilters
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setDataListPhysician={setDataListPhysician}
            setDoctorId={setDoctorId}
            setAppointmentId={setAppointmentId}
            setServiceIds={setServiceIds}
            setBookingDate={setBookingDate}
          />
        </div>
        {fetching == false ? (
          <div className="w-full">
            {appointments?.length !== 0 && appointments ? (
              // <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              <div className="flex gap-3 flex-wrap  min-w-max justify-center md:justify-start">
                {appointments?.map((appointmentDetail, i) => {
                  const {
                    id,
                    requestedDate,
                    status,
                    serviceType,
                    doctor,
                    appointmentTimeSlots,
                    transaction,
                  } = appointmentDetail || {};
                  return (
                    <AppointmentCard
                      appointmentId={Number(id)}
                      requestedDate={requestedDate}
                      status={status}
                      serviceType={serviceType?.name}
                      doctor={doctor?.first_name}
                      appointmentTimeSlots={
                        appointmentTimeSlots as AppointmentTimeSlots[]
                      }
                      onViewSuggestedSlots={() => {}}
                      setShowModal={setShowModal}
                      doctorProfile={doctor?.doctorProfile as DoctorProfile}
                      transaction={transaction as Transaction}
                      appointmentDetail={appointmentDetail as Appointment}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <Empty />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex justify-center py-10">
            <Spin />
          </div>
        )}
      </div>
      <BookAppointmentJourney
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        patientData={getPhysicians as User[]}
      />
    </AppLayout>
  );
}
export default CancelledAppointment;
