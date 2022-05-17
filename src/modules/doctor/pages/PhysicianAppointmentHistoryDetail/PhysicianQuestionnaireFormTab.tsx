import PhysicianQuestionnaire from 'common/components/Appointments/PhysicianQuestionnaire'
import CardWithProfileImageInfo from 'common/components/CardWithProfileImageInfo/CardWithProfileImageInfo'
import { useDoctorAppointmentDetailQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import React from 'react'

function PhysicianQuestionnaireFormTab() {
    const { query } = useRouter();

	const [{ data }] = useDoctorAppointmentDetailQuery({
		variables: {
			id: Number(query.appointmentId),
		},
		pause: !query.appointmentId,
	});
	const { appointment } = data || {};
  return (
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
  )
}

export default PhysicianQuestionnaireFormTab