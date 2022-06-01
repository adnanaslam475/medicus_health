import React from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import AdminPhysicianNotesWithTextTab from "./AdminPhysicianNotesWithTextTab";
import AdminPhysicianAttachmentTab from "./AdminPhysicianAttachmentTab";
import AdminPhysicianQuestionnaireFormTab from "./AdminPhysicianQuestionnaireFormTab";
import AdminPhysicianHealthQuestionnaireFormTab from "./AdminPhysicianHealthQuestionnaireFormTab";
import AdminPhysicianAppointmentInfoTab from "./AdminPhysicianAppointmentInfoTab";
import { Appointment, useGetAppointmentByIdQuery } from "generated/graphql";

function AdminPhysicianAppointmentDetail() {
	const { query } = useRouter();
	const [{ data }] = useGetAppointmentByIdQuery({
		variables: { id: Number(query?.id) },
	});

	const { appointment } = data || {};

	let doctorNotes =
		appointment?.doctorNote && Object?.entries(appointment?.doctorNote);

	return (
		<AppLayout>
			<>
				<h2 className="mb-4">Appointment Detail</h2>
				<div className="profile-tabs">
					<Tabs type="card">
						<Tabs.TabPane tab="Appointment Info" key="1" className="">
							<AdminPhysicianAppointmentInfoTab
								appointment={appointment as Appointment}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab="Health Questionnaire" key="3">
							<AdminPhysicianHealthQuestionnaireFormTab
								appointment={appointment as Appointment}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab="Physician Questionnaire" key="4">
							<AdminPhysicianQuestionnaireFormTab
								appointment={appointment as Appointment}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab="Attachment" key="5">
							<AdminPhysicianAttachmentTab
								appointment={appointment as Appointment}
							/>
						</Tabs.TabPane>

						<Tabs.TabPane tab="Notes" key="6">
							<AdminPhysicianNotesWithTextTab
								appointment={appointment as Appointment}
								doctorNotes={doctorNotes as [[string, string]]}
							/>
						</Tabs.TabPane>
					</Tabs>
				</div>
			</>
		</AppLayout>
	);
}
export default AdminPhysicianAppointmentDetail;
