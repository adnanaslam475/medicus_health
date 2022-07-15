import React, { useRef, useState, useEffect } from "react";
import CalendarView from "../../common/components/CalendarView/CalendarView";
import AppLayout from "common/components/AppLayout/AppLayout";
import {
  Appointment,
  usePhysicianAppointmentsQuery,
} from "../../../generated/graphql";
import CalendarModalComponent from "../../common/components/CalendarModal";
import FullCalendar from "@fullcalendar/react";
import Router from "next/router";

type events = {
  calenderEvents: Appointment | undefined | Array<object>;
};
function DoctorCalendar() {
  const redirectToUpcoming = function () {
    Router.push("/physician/appointments/upcoming");
  };

  const calendarComponentRef = useRef<FullCalendar>();
  const [calender, setCalender] = useState<events>({
    calenderEvents: [],
  });
  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [{ data }] = usePhysicianAppointmentsQuery({
    variables: {
      filter: { status: "Confirmed" },
      pagination: { limit: -1, page: 1 },
    },
  });
  const { physicianAppointments } = data || {};

  const handleDateClick = (arg: any) => {
    const data = arg?.event?.toJSON();
    let selectedTimeSlot =
      data?.extendedProps?.appointmentTimeSlots &&
      data?.extendedProps?.appointmentTimeSlots.find(
        (item: any) => item.selected
      );
    setModalData({
      id: data?.id,
      patient: data?.extendedProps?.patient,
      serviceType: data?.extendedProps?.serviceType,
      dateValue: selectedTimeSlot?.startTime || data.start,
      className: data?.extendedProps?.extraData?.class_name,
      startDate:
        selectedTimeSlot?.startTime || data?.extendedProps?.extraData?.start,
      endDate: selectedTimeSlot?.endTime || data?.extendedProps?.extraData?.end,
      status: data?.extendedProps?.status,
      charges: data?.extendedProps?.charges,
      appointmentTimeSlots: data?.extendedProps?.appointmentTimeSlots,
      type: "Assignment",
    });

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const setCalendarData = () => {
    setCalender({
      ...calender,
      calenderEvents: physicianAppointments?.items?.map(
        ({
          id,
          patient,
          requestedDate,
          serviceType,
          charges,
          appointmentTimeSlots,
        }) => ({
          id: id,
          title: patient?.first_name,
          start:
            (appointmentTimeSlots &&
              appointmentTimeSlots.find((item) => item.selected)?.startTime) ||
            requestedDate,
          patient: patient?.first_name + " " + patient?.last_name,
          serviceType: serviceType?.name,
          charges: charges,
          appointmentTimeSlot: appointmentTimeSlots,
        })
      ),
    });
  };

  useEffect(() => {
    setCalendarData();
  }, [physicianAppointments]);

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
            redirectToListing={redirectToUpcoming}
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

export default DoctorCalendar;
