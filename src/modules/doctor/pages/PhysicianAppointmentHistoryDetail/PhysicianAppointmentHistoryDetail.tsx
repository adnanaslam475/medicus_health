import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Tabs } from "antd";
import PatientAppointmentInfoTab from "./PatientAppointmentInfoOfPhysicianTab";
import PatientInfoTab from "./PatientInfoTab";
import PhysicianQuestionnaireFormTab from "./PhysicianQuestionnaireFormTab";
import HealthQuestionnaireFormTab from "./HealthQuestionnaireFormTab";
import NotesWithTextTab from "./NotesWithTextTab";

import PhysicianAttachmentTab from "./PhysicianAttachmentTab";

function PhysicianAppointmentHistoryDetail() {
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
							<HealthQuestionnaireFormTab />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Physician Questionnaire" key="4">
							<PhysicianQuestionnaireFormTab />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Attachment" key="5">
							<PhysicianAttachmentTab />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Notes" key="6">
							<NotesWithTextTab />
						</Tabs.TabPane>
					</Tabs>
				</div>
			</>
		</AppLayout>
	);
}
export default PhysicianAppointmentHistoryDetail;
