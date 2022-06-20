import React, { useRef, useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import AppointmentCard from "../../../../../common/components/AppointmentCard/AppointmentCard";
import {
  Appointment,
  AppointmentTimeSlots,
  BookingDate,
  useGetAllRequestedAppointmentsQuery,
  useGetPhysiciansQuery,
  usePatientHealthHistoryQuery,
  User,
} from "../../../../../generated/graphql";
import { Button, Empty, Select, Spin, Tooltip } from "antd";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import Link from "next/link";
import AppointmentModalJourney from "../../../../patient/components/AppointmentModalJourney/AppointmentModalJourney";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import { getUserData } from "common/utils/userData";

function RequestedAppointment() {
  const [dueStartDate, setStartDate] = useState<BookingDate>();
  const [dueEndDate, setEndDate] = useState<BookingDate>();
  const [bookingDate, setBookingDate] = useState<BookingDate>({});
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentId, setAppointmentId] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [status, setStatus] = useState<string>("Requested");

  const [isModalVisible, setIsModalVisible] = useState(false);

  //Get logged in User
  const { user } = getUserData();
  const { id: loggedInUser } = user || {};

  const showAppointmentBookingModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [{ data, fetching }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: status,
        physicianName: dataListPhysician,
        doctorId: doctorIds,
        appointmentId: appointmentId,
        serviceId: serviceIds,
        dueDate: bookingDate,
      },
    },
  });

  const { appointments } = data || {};

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState<number>();

  function onViewSuggestedSlots(id: number) {
    setCurrentAppointmentId(id);
    setShowModal(true);
  }

  function onCancel() {
    setShowModal(false);
    setCurrentAppointmentId(undefined);
  }

  const [{ data: physicianList }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
    },
  });
  const { getPhysicians } = physicianList || {};

  // Get patient Health History
  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: Number(loggedInUser) },
    requestPolicy: "network-only",
  });

  return (
    <AppLayout>
      <>
        <div className="w-full">
          <div className="flex-none sm:flex items-center justify-between mb-5">
            <div className="pr-3 mb-3 sm:mb-0">
              <h2 className="mb-0">Requested Appointments</h2>
            </div>
            <div className="flex gap-3">
              <div className="lg:ml-3 mt-0 sm:mt-0">
                <Select defaultValue="List View" className="w-full sm:w-40">
                  <Select.Option value="Calendar View">
                    <Link href="/patient/calendar">
                      <a>Calendar View</a>
                    </Link>
                  </Select.Option>
                  <Select.Option selected value="List View">
                    List View
                  </Select.Option>
                </Select>
              </div>
              <Tooltip
                title={
                  patientHealthHistory?.patientHealthHistory ? (
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
                    patientHealthHistory?.patientHealthHistory ? false : true
                  }
                >
                  <span className="text-xs sm:text-base">
                    Request an Appointment
                  </span>
                </Button>
              </Tooltip>
            </div>
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {appointments?.map((appointmentDetail, i) => {
                    const {
                      id,
                      requestedDate,
                      status,
                      serviceType,
                      doctor,
                      appointmentTimeSlots,
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
                        onViewSuggestedSlots={() =>
                          onViewSuggestedSlots(Number(appointmentDetail?.id))
                        }
                        setShowModal={setShowModal}
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
        <AppointmentModalJourney
          visible={showModal}
          onCancel={onCancel}
          appointmentId={currentAppointmentId}
        />
        <BookAppointmentJourney
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          patientData={getPhysicians as User[]}
        />
      </>
    </AppLayout>
  );
}
export default RequestedAppointment;
