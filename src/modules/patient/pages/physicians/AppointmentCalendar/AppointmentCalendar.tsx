import React, { useRef, useState, useEffect } from "react";
import Router from "next/router";
import CalendarView from "../../../../common/components/CalendarView/CalendarView";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "../../../../../generated/graphql";
import CalendarModalComponent from "../../../../common/components/CalendarModal";
import FullCalendar from "@fullcalendar/react";

type events = {
  calenderEvents: Appointment | undefined | any;
};
function AppointmentCalendar() {
  const calendarComponentRef = useRef<FullCalendar>();
  const [calender, setCalender] = useState<events>({
    calenderEvents: [],
  });
  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: "Confirmed",
      },
      pagination: { limit: -1, page: 1 },
    },
  });
  const redirectToRequested = function () {
    Router.push("/patient/appointments/upcoming");
  };

  const { appointments } = data || {};

  const handleDateClick = (arg: any) => {
    const data = arg?.event?.toJSON();
    setModalData({
      id: data?.id,
      patient: data?.extendedProps?.patient,
      doctor: data?.title,
      serviceType: data?.extendedProps?.serviceType,
      dateValue: data.start,
      className: data?.extendedProps?.extraData?.class_name,
      startDate: data?.extendedProps?.extraData?.start,
      endDate: data?.extendedProps?.extraData?.end,
      status: data?.extendedProps?.status,
      charges: data?.extendedProps?.charges,
      appointmentTimeSlots:data?.extendedProps?.appointmentTimeSlots,
      type: "Assignment",
    });

    setModalVisible(true);
  };
  console.log("datadata far", data);
  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const setCalendarData = () => {
    setCalender({
      ...calender,
      calenderEvents: appointments?.items?.map(
        ({
          id,
          patient,
          requestedDate,
          doctor,
          serviceType,
          charges,
          appointmentTimeSlots,
        }) => ({
          id: id,
          title:
            "Appointmetn with " + doctor?.first_name?.includes("Dr.")
              ? `${serviceType?.name}: ${doctor?.first_name}`
              : `${serviceType?.name}: Dr. ${doctor?.first_name}` +
                " " +
                doctor?.last_name,
          start: appointmentTimeSlots?.filter((item) => item?.selected)?.[0]
            ?.startTime,
          patient: patient?.first_name + " " + patient?.last_name,
          serviceType: serviceType?.name,
          charges: charges,
          appointmentTimeSlots:appointmentTimeSlots
        })
      ),
    });
  };
  useEffect(() => {
    setCalendarData();
  }, [appointments]);

  const handleDateChange = (arg: string) => {
    setCalender({
      ...calender,
    });
    setTimeout(() => {
      // getCalendarData();
    }, 200);
    const calenderApi: any =
      calendarComponentRef.current?.getApi()?.currentDataManager;
    switch (arg) {
      case "next":
        calenderApi?.data.calendarApi.next();
        break;
      case "prev":
        calenderApi?.data.calendarApi.prev();
        break;
      default:
        break;
    }
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="">
          <CalendarView
            calender={calender}
            handleDateChange={handleDateChange}
            calendarComponentRef={calendarComponentRef}
            handleDateClick={handleDateClick}
            redirectToListing={redirectToRequested}
            enableButton={false}
          />
        </div>
        <CalendarModalComponent
          modalVisible={modalVisible}
          closeModal={closeModal}
          data={modalData}
          okText="Edit"
        />
      </div>
    </AppLayout>
  );
}

export default AppointmentCalendar;
