import React, { useRef, useState, useEffect } from "react";
import CalendarView from "../../common/components/CalendarView/CalendarView";
import AppLayout from "common/components/AppLayout/AppLayout";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
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
    Router.push("/doctor/appointments/upcoming");
  };

  const calendarComponentRef = useRef<FullCalendar>();
  const [calender, setCalender] = useState<events>({
    calenderEvents: [],
  });
  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [doctorIds, setDoctorId] = useState<number>();
  const [{ data }] = usePhysicianAppointmentsQuery({
    variables: {
      filter: {},
    },
  });
  const { physicianAppointments } = data || {};

  const handleDateClick = (arg: any) => {
    const data = arg?.event?.toJSON();
    setModalData({
      id: data?.id,
      patient: data?.extendedProps?.patient,
      serviceType: data?.extendedProps?.serviceType,
      dateValue: data.start,
      className: data?.extendedProps?.extraData?.class_name,
      startDate: data?.extendedProps?.extraData?.start,
      endDate: data?.extendedProps?.extraData?.end,
      status: data?.extendedProps?.status,
      charges: data?.extendedProps?.charges,
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
      calenderEvents: physicianAppointments?.map(
        ({ id, patient, requestedDate, serviceType, charges }) => ({
          id: id,
          title: patient.first_name,
          start: requestedDate,
          patient: patient.first_name + " " + patient.last_name,
          serviceType: serviceType?.name,
          charges: charges,
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
