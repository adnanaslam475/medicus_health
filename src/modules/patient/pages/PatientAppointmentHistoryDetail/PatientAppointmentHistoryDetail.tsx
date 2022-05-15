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
// import ProfileImageWithInfo from "common/components/ProfleImageWithInfo/ProfileImageWithInfo";
// import DoctorAppointmentInfo from "components/DoctorAppointmentInfo/DoctorAppointmentInfo";
import PatientInfo from "common/components/PatientInfo/PatientInfo";
import Questionnary, {
	QuestionnaireForm,
} from "common/components/Questionnary/Questionnary";
import Attachment from "common/components/Attachment/Attachment";
import NotesWithText from "common/components/NotesWithText/NotesWithText";
import jpgIcon from "../../../../../public/assets/images/jpg.svg";
import word from "../../../../../public/assets/images/word-file.svg";
import PatientAppointmentInfoTab from "./PatientAppointmentInfoTab";
import PatientInfoTab from "./PatientInfoTab";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import CardWithProfileImageInfo from "./CardWithProfileImageInfo";

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

	//Get Patient ID
	const { patientId } = appointment || {};

	// Get patient Health History
	const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
		variables: { input: patientId as number },
	});
	const { appointmentHealthHistory } = data?.appointment || {};

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
							<div className="max-w-1/2">
				
								<CardWithProfileImageInfo
									name="usama"
									serviceName="consultation"
								>
									<QuestionnaireForm
										data={patientHealthHistory?.patientHealthHistory.history}
									/>
								</CardWithProfileImageInfo>
							</div>
						</Tabs.TabPane>
						<Tabs.TabPane tab="Physician Questionnaire" key="4">
							<div className="">
								<CardWithProfileImageInfo
									name="usama"
									serviceName="consultation"
								>
									<PhysicianQuestionnaire
										appointmentHealthHistory={
											appointment?.appointmentHealthHistory?.history
										}
									/>
								</CardWithProfileImageInfo>
							</div>
						</Tabs.TabPane>
						<Tabs.TabPane tab="Attachement" key="5">
							<div className="flex gap-2">
								{/* {urlArr?.map((item: any) => ( */}
									<Attachment src={word} name="test_reports.pdf" enable={true} />
									<Attachment src={jpgIcon} name="test_reports.jpg" enable={true} />
								{/* ))} */}
							</div>
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
