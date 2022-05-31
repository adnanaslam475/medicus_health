import React from "react";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { Appointment } from "generated/graphql";

type Props = { appointment: Appointment | undefined };
function AdminPhysicianHealthQuestionnaireFormTab({ appointment }: Props) {
  return (
    <div className="max-w-1/2">
      <CardWithProfileImageInfo
        name={`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}
        serviceName={appointment?.serviceType?.name}
      >
        <QuestionnaireForm
          data={appointment?.patient?.patientHealthHistory?.history}
        />
      </CardWithProfileImageInfo>
    </div>
  );
}

export default AdminPhysicianHealthQuestionnaireFormTab;
