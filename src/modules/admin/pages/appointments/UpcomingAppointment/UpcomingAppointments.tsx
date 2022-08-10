import React, { useState } from "react";
import Link from "next/link";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import AppointmentCard from "../../../../../common/components/AppointmentCard/AppointmentCard";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import { Button, Empty, Select, Spin, Tooltip } from "antd";
import {
  AppointmentTimeSlots,
  BookingDate,
  DueDate,
  useGetAllRequestedAppointmentsQuery,
  useGetPhysiciansQuery,
  usePatientHealthHistoryQuery,
  User,
} from "../../../../../generated/graphql";
import Router, { useRouter } from "next/router";
import { getUserData } from "common/utils/userData";
import { useTranslations } from "next-intl";

function UpcomingAppointments() {
  const t = useTranslations("UpcomingAppointments");
  //Get logged in User
  const { user } = getUserData();
  const { id: loggedInUser } = user || {};

  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
  const [bookingDate, setBookingDate] = useState<BookingDate>({});
  const [dueDate, setDueDate] = useState<DueDate>({});
  const [searchString, setSearchString] = useState<string>();
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentId, setAppointmentId] = useState<string>("");
  const [serviceIds, setServiceIds] = useState<number>();
  const [status, setStatus] = useState<string>("Confirmed");
  const [currentAppointmentId, setCurrentAppointmentId] = useState<number>();

  const [{ data, fetching }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: status,
        physicianName: dataListPhysician,
        doctorId: doctorIds,
        // searchString: String(appointmentId),
        serviceId: serviceIds,
        dueDate: dueDate,
        searchString: searchString,
      },
      pagination: { limit: -1, page: 1 },
      sorting: { order: "", column: "" },
    },
    requestPolicy:"network-only"
  });
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

  const [{ data: physicianList }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
      pagination: { page: 1, limit: -1 },
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
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">
              {t("upcoming_appointments")}
              {/* Upcoming appointments */}
            </h2>
            {/* <h2 className="mb-0">{t("upcomingAppointmentsHead")}</h2>                       */}
            {/* <p className="text-gray mb-0">
              Suspendisse ac nulla non ante viverra feugiat. Duis
              ullamcorperequesty tortor a fringilla tempus.
            </p> */}
          </div>
          <div className="flex gap-3">
            <div className="lg:ml-3 mt-0 sm:mt-0">
              {/* <Select defaultValue="List view" className="w-full sm:w-40">
                <Select.Option value="Calendar view">
                  <Link href="/patient/calendar">
                    <a>
                      {t("calendar_view")}
                    
                    </a>
                  </Link>
                </Select.Option>
                <Select.Option selected value="List view">
                  {t("list_view")}
           
                </Select.Option>
              </Select> */}
              <Button
                type="primary"
                className="text-sm"
                onClick={() => Router.push(`/patient/calendar`)}
              >
                <span className="text-xs sm:text-base">
                  {t("calendar_view")}
                  {/* Request an appointment */}
                </span>
              </Button>
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
        </div>
        <div className="">
          <SearchFilters
            setDataListPhysician={setDataListPhysician}
            setDoctorId={setDoctorId}
            setAppointmentId={setAppointmentId}
            setServiceIds={setServiceIds}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setBookingDate={setBookingDate}
            setDueDate={setDueDate}
            setSearchString={setSearchString}
          />
        </div>
        {fetching == false ? (
          <div className="w-full">
            {appointments?.items?.length !== 0 && appointments ? (
              // <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              <div className="flex gap-3 flex-wrap  min-w-max justify-center md:justify-start">
                {appointments.items?.map((appointmentDetail, i) => {
                  const {
                    id,
                    requestedDate,
                    status,
                    serviceType,
                    doctor,
                    appointmentTimeSlots,
                  } = appointmentDetail || {};
                  var doctorFirstName = `${doctor?.first_name} ${doctor?.last_name}`;
                  return (
                    <AppointmentCard
                      appointmentId={Number(id)}
                      requestedDate={requestedDate}
                      status={status}
                      serviceType={serviceType?.name}
                      doctor={doctorFirstName}
                      appointmentTimeSlots={
                        appointmentTimeSlots as AppointmentTimeSlots[]
                      }
                      setShowModal={setShowModal}
                      onViewSuggestedSlots={() =>
                        onViewSuggestedSlots(Number(appointmentDetail?.id))
                      }
                      specialization={String(appointmentDetail?.doctor?.doctorProfile?.specialization || "")}
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
export default UpcomingAppointments;
