import React, { useRef, useState, useEffect } from "react";
import CalendarView from "../../../../common/components/CalendarView";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useGetAllRequestedAppointmentsQuery } from "../../../../../generated/graphql";
import CalendarModalComponent from "../../../../common/components/CalendarModal";
import { Router } from "next/router";

type events = {
  calenderEvents: any;
};
function AppointmentCalendar() {
  const calendarComponentRef = useRef(null);
  const [calender, setCalender] = useState<events>({
    calenderEvents: [],
  });
  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        doctorId: 520,
        serviceId: 12,
        status: "Requested",
      },
    },
  });

  const { appointments } = data || {};

  const handleDateClick = (arg: any) => {
    const data = arg?.event?.toJSON();

    setModalData({
      id: data?.id,
      patient: data?.title,
      doctor: data?.extendedProps.doctor,
      serviceType: data?.extendedProps?.serviceType,
      date: data.start,
      className: data?.extendedProps?.extraData?.class_name,
      startDate: data?.extendedProps?.extraData?.start,
      endDate: data?.extendedProps?.extraData?.end,
      status: data?.extendedProps?.status,
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
      calenderEvents: appointments?.map(
        ({ id, patient, requestedDate, doctor, serviceType }) => ({
          id: id,
          title: patient.first_name + patient.last_name,
          start: requestedDate,
          doctor: doctor.first_name,
          serviceType: serviceType?.name,
        })
      ),
    });
  };
  console.log(calendarComponentRef, "g");
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
    const calenderApi =
      calendarComponentRef.current?.getApi()?.currentDataManager;
    switch (arg) {
      case "next":
        calenderApi.data.calendarApi.next();
        break;
      case "prev":
        calenderApi.data.calendarApi.prev();
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
