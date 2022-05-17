import React from "react";
import AppointmentTabs from "../../../../../common/components/Appointments/AppointmentTabs";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import AppointmentsDetailTabs from "../../AppointmentsDetailTabs/AppointmentsDetailTabs";
import {
	useDoctorAppointmentDetailQuery,
	useGetAppointmentReportUrlByIdQuery,
	usePatientHealthHistoryQuery,
} from "generated/graphql";
import { Tabs } from "antd";
import AppointmentInfoTab from "./AppointmentInfoTab";
import PatientInfoTab from "./PatientInfoTab";
import NotesTab from "./NotesTab";
import HealthQuestionnaireFormTab from "./HealthQuestionnaireFormTab";
import PhysicianQuestionnaireFormTab from "./PhysicianQuestionnaireFormTab";
import PhysicianAttachmentTab from "../../PhysicianAppointmentHistoryDetail/PhysicianAttachmentTab";

function UpcomingAppointmentsDetailDoctor() {
	return (
		<AppLayout>
			<>
				<h2 className="mb-4">Appointment Detail</h2>
				<div className="profile-tabs">
					<Tabs type="card">
						<Tabs.TabPane tab="Appointment Info" key="1" className="">
							<AppointmentInfoTab />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Patient Info" key="2">
							<PatientInfoTab />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Health Questionnaire" key="3">
							<HealthQuestionnaireFormTab />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Physician Questionnaire" key="4">
							<PhysicianQuestionnaireFormTab />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Attachment" key="5">
							<PhysicianAttachmentTab />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Notes" key="6">
							<NotesTab />
						</Tabs.TabPane>
					</Tabs>
				</div>
			</>
		</AppLayout>
	);
}
export default UpcomingAppointmentsDetailDoctor;
