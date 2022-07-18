import React, { useState } from "react";
import { Button, Empty, Spin } from "antd";
import AppointmentCard from "common/components/AppointmentCard/AppointmentCard";
import AppLayout from "common/components/AppLayout/AppLayout";
import SearchFilter from "common/components/SearchFilters/SearchFilter";
import {
  AppointmentDateTimeResponse,
  AppointmentTimeSlots,
  GetCurrentAppointmentInput,
  useCurrentAppointmentsQuery,
  useGetPhysiciansQuery,
  User,
} from "generated/graphql";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";

function CurrentAppointment() {
  const [filterValues, setFilterValues] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }, executeUseCurrentAppointmentsQuery] =
    useCurrentAppointmentsQuery({
      variables: {
        filter: { status: "ongoing", ...filterValues },
        pagination,
        sorting,
      },
    });

  const { currentAppointments } = data || {};
  const [showModal, setShowModal] = useState<boolean>(false);

  function onChangeFilters(values: GetCurrentAppointmentInput) {
    setFilterValues(values);
    executeUseCurrentAppointmentsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

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
      pagination,
      sorting,
    },
  });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: `user.${sorter.field}` || "",
    });
  };

  const { getPhysicians } = physicianList || {};

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">Current appointments</h2>
            <h5 className="text-gray">
              Suspendisse ac nulla non ante viverra feugiat. Duis
              ullamcorperequesty tortor a fringilla tempus.
            </h5>
          </div>
          <div className="flex gap-3">
            <Button
              type="primary"
              className="text-sm"
              onClick={showAppointmentBookingModal}
            >
              <span className="text-xs sm:text-base">
                Request an appointment
              </span>
            </Button>
          </div>
        </div>

        <div className="">
          <SearchFilter onChange={onChangeFilters} />
        </div>
        {!fetching ? (
          <div className="w-full">
            {currentAppointments?.items?.length ? (
              // <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              <div className="flex gap-3 flex-wrap  min-w-max justify-center md:justify-start">
                {currentAppointments.items?.map((currentAppointment) => {
                  return (
                    <AppointmentCard
                      doctorId={currentAppointment?.doctorId}
                      patientId={currentAppointment?.patientId}
                      requestedDate={
                        currentAppointment?.appointmentDateTime?.startTime || ""
                      }
                      appointmentId={Number(currentAppointment?.id)}
                      // status={status}
                      status="Current"
                      serviceType={
                        currentAppointment?.serviceType?.name || "Service type"
                      }
                      doctor={currentAppointment?.doctor?.first_name}
                      appointmentTimeSlots={
                        currentAppointment?.appointmentTimeSlots as AppointmentTimeSlots[]
                      }
                      appointmentDateTime={
                        currentAppointment?.appointmentDateTime as AppointmentDateTimeResponse
                      }
                      onViewSuggestedSlots={() => {}}
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
export default CurrentAppointment;
