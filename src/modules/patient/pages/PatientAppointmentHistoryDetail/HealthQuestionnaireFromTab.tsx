import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import  {
	QuestionnaireForm,
} from "common/components/Questionnary/Questionnary";
import { useRouter } from "next/router";
import {
	useDoctorAppointmentDetailQuery,
	useGetAppointmentReportUrlByIdQuery,
	usePatientHealthHistoryQuery,
} from "generated/graphql";
import React from "react";

function HealthQuestionnaireFrom() {
	const { query } = useRouter();
	const [{ data }] = useDoctorAppointmentDetailQuery({
		variables: {
			id: Number(query.appointmentId),
		},
		pause: !query.appointmentId,
	});
	const { appointment } = data || {};
	const { patientId } = appointment || {};
	const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
		variables: { input: patientId as number },
	});
	return (
		<div className="max-w-1/2">
			<CardWithProfileImageInfo name="usama" serviceName="consultation">
				<QuestionnaireForm
					data={patientHealthHistory?.patientHealthHistory.history}
				/>
			</CardWithProfileImageInfo>
		</div>
	);
}

export default HealthQuestionnaireFrom;
