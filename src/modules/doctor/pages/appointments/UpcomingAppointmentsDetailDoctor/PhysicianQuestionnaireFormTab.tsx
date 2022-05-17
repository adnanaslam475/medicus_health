import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { useDoctorAppointmentDetailQuery } from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";

function PhysicianQuestionnaireFormTab() {
	const { query } = useRouter();

	const [{ data }] = useDoctorAppointmentDetailQuery({
		variables: {
			id: Number(query.appointmentId),
		},
		pause: !query.appointmentId,
	});
	const { appointment } = data || {};
    const { patient, serviceType } = appointment || {}
	return (
        <CardWithProfileImageInfo
        name={`${patient?.first_name} ${patient?.last_name}`}
        serviceName={serviceType?.name}
      >
		<div className="">
			<PhysicianQuestionnaire
				appointmentHealthHistory={
					appointment?.appointmentHealthHistory?.history
				}
			/>
		</div>
        </CardWithProfileImageInfo>
	);
}

export default PhysicianQuestionnaireFormTab;
