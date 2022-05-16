import React from "react";
import AppointmentTabs from "common/components/Appointments/AppointmentTabs";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import {
	useDoctorAppointmentDetailQuery,
	useGetAppointmentReportUrlByIdQuery,
	usePatientHealthHistoryQuery,
} from "generated/graphql";
import { Tabs } from "antd";
import NotesWithText from "common/components/NotesWithText/NotesWithText";
import PatientAppointmentInfoTab from "./PatientAppointmentInfoTab";
import PatientInfoTab from "./PatientInfoTab";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import HealthQuestionnaireFrom from "./HealthQuestionnaireFromTab";
import PhysicianQuestionnaireForm from "./PhysicianQuestionnaireFormTab";
import AttachmentTab from "./AttachmentTab";

function PatientAppointmentHistoryDetail() {
	const { query } = useRouter();

	const [{ data }] = useDoctorAppointmentDetailQuery({
		variables: {
			id: Number(query.appointmentId),
		},
		pause: !query.appointmentId,
	});
	const { appointment } = data || {};

	const [{ data: appoinmentUrl }] = useGetAppointmentReportUrlByIdQuery({
		variables: {
			id: Number(appointment?.id),
		},
	});

	const { reportUrl } = appoinmentUrl?.appointment || {};

	function parseJson(jsonString: string) {
		let obj = null;
		try {
			obj = JSON.parse(jsonString);
		} catch (error) {
			console.log(error);
			obj = null;
		}
		return obj;
	}

	let urlArr = parseJson(reportUrl);
	if (urlArr && urlArr.length > 0) {
		urlArr = urlArr[0]?.map((item: any) => item.split("com/")[1]);
	}

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
							<div className="max-w-1/2">
								<NotesWithText />
							</div>
						</Tabs.TabPane>
					</Tabs>
				</div>
			</>
		</AppLayout>
	);
}
export default PatientAppointmentHistoryDetail;
