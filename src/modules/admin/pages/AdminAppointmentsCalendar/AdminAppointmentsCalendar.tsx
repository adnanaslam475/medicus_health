import React, { useRef, useState, useEffect } from "react";
import CalendarView from "../../../common/components/CalendarView/CalendarView";
import AppLayout from "../../../../common/components/AppLayout/AppLayout";
import {
	Appointment,
	usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import CalendarModalComponent from "../../../common/components/CalendarModal";
import FullCalendar from "@fullcalendar/react";
import Router from "next/router";

type events = {
	calenderEvents: Appointment | undefined | any;
};
function AdminAppointmentsCalendar() {
	const calendarComponentRef = useRef<FullCalendar>();
	const [calender, setCalender] = useState<events>({
		calenderEvents: [],
	});
	const [modalData, setModalData] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [{ data }] = usePhysicianAppointmentsHistoryQuery({
		variables: {
			filter: {},
		},
	});
	const redirectToListing = function () {
		Router.push("/admin/appointments");
	};
	const { appointments } = data || {};

	const handleDateClick = (arg: any) => {
		const data = arg?.event?.toJSON();
		setModalData({
			id: data?.id,
			patient: data?.extendedProps?.patient,
			doctor: `${data?.extendedProps?.first_name}  ${data?.extendedProps?.last_name}`,
			serviceType: data?.extendedProps?.serviceType,
			dateValue: data?.createdAt,
			className: data?.extendedProps?.extraData?.class_name,
			startDate: data?.extendedProps?.appointmentTimeSlots?.startTime,
			endDate: data?.extendedProps?.appointmentTimeSlots?.endTime,
			status: data?.status,
			charges: data?.extendedProps?.charges,
			type: "Assignment",
		});

		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(!modalVisible);
	};
console.log(calender,"ddddd")
	const setCalendarData = () => {
		setCalender({
			...calender,
			calenderEvents: appointments?.map(
				({ id, patient, requestedDate, doctor, serviceType, charges ,status}) => ({
					id: id,
					title: doctor.first_name,
					start: requestedDate,
					patient: patient.first_name + " " + patient.last_name,
					serviceType: serviceType?.name,
					total: charges,
          status:charges,
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
						redirectToListing={redirectToListing}
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

export default AdminAppointmentsCalendar;
