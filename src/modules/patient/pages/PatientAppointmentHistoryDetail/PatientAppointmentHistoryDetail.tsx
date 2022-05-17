import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import {
	useDoctorAppointmentDetailQuery,
	useGetAppointmentReportUrlByIdQuery,
	
} from "generated/graphql";
import { Tabs } from "antd";
import PatientAppointmentInfoTab from "./PatientAppointmentInfoTab";
import PatientInfoTab from "./PatientInfoTab";
import HealthQuestionnaireFrom from "./HealthQuestionnaireFromTab";
import PhysicianQuestionnaireForm from "./PhysicianQuestionnaireFormTab";
import AttachmentTab from "./AttachmentTab";
import NoteWithTextTab from "./NoteWithTextTab";

function PatientAppointmentHistoryDetail() {
	return (
		<AppLayout>
			<>
				<h2 className="mb-4">Appointment History Detail</h2>
				<div className="profile-tabs">
					<Tabs type="card">
						<Tabs.TabPane tab="Appointment Info" key="1" className="">
							<PatientAppointmentInfoTab />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Patient Info" key="2">
							<PatientInfoTab />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Health Questionnaire" key="3">
							<HealthQuestionnaireFrom />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Physician Questionnaire" key="4">
							<PhysicianQuestionnaireForm />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Attachment" key="5">
							<AttachmentTab/>
						</Tabs.TabPane>
						<Tabs.TabPane tab="Notes" key="6">
							<NoteWithTextTab/>
						</Tabs.TabPane>
					</Tabs>
				</div>
			</>
		</AppLayout>
	);
}
export default PatientAppointmentHistoryDetail;
