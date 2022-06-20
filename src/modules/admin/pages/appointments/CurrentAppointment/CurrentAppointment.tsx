import React, { useState } from "react";
import { Empty, Spin } from "antd";
import AppointmentCard from "common/components/AppointmentCard/AppointmentCard";
import AppLayout from "common/components/AppLayout/AppLayout";
import SearchFilters from "common/components/SearchFilters/SearchFilters";
import {
	AppointmentDateTimeResponse,
	AppointmentTimeSlots,
	BookingDate,
	useCurrentAppointmentsQuery,
} from "generated/graphql";

function CurrentAppointment() {
	const [dueDates, setDueDates] = useState<Date | null>();
	const [dueStartDate, setStartDate] = useState<Date | null>();
	const [dueEndDate, setEndDate] = useState<Date | null>();
	const [bookingDate, setBookingDate] = useState<BookingDate>({});
	const [dataListPhysician, setDataListPhysician] = useState<string>();
	const [doctorIds, setDoctorId] = useState<number>();
	const [appointmentId, setAppointmentId] = useState<number>();
	const [currentAppointmentId, setCurrentAppointmentId] = useState<number>();
	const [serviceIds, setServiceIds] = useState<number>();
	const [status, setStatus] = useState<string>("Cancelled"); //it wll be replaced by current when api will be  integrated
	const [{ data,fetching}] = useCurrentAppointmentsQuery({
		variables: {
		},
	});

	function onViewSuggestedSlots(id: number) {
		setCurrentAppointmentId(id);
		setShowModal(true);
	}
	const { currentAppointments } = data || {};
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<AppLayout>
			<div className="w-full">
				<div className="flex-none sm:flex items-center justify-between mb-5">
					<div className="pr-3 mb-3 sm:mb-0">
						<h2 className="mb-0">Current Appointments</h2>
						<h5 className="text-gray">
							Suspendisse ac nulla non ante viverra feugiat. Duis
							ullamcorperequesty tortor a fringilla tempus.
						</h5>
					</div>
				
				</div>

				<div className="w-5/6">
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
						{currentAppointments?.length ? (
							<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
								{currentAppointments?.map((currentAppointment) => {
									return (
										<AppointmentCard
											doctorId={currentAppointment?.doctorId }
											patientId={currentAppointment?.patientId}
											requestedDate={currentAppointment?.appointmentDateTime?.startTime || ""}
											appointmentId={Number(currentAppointment?.id)}
											// status={status}
											status="Current"
											serviceType={currentAppointment?.serviceType?.name || "Service type"}
											doctor={currentAppointment?.doctor?.first_name}
											appointmentTimeSlots={currentAppointment?.appointmentTimeSlots as AppointmentTimeSlots[]}
											appointmentDateTime={currentAppointment?.appointmentDateTime as AppointmentDateTimeResponse}
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
						<Spin/>
					</div>
				)}
			</div>
		</AppLayout>
	);
}
export default CurrentAppointment;
