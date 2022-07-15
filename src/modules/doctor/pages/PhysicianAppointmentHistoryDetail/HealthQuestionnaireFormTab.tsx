import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { usePhysicianAppointmentsHistoryQuery } from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";

function HealthQuestionnaireFromTab() {
  const { query } = useRouter();

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchString: String(query?.id), status: "Completed" },
    },
    requestPolicy: "network-only",
  });
  const { appointments } = data || {};
  const appointment = appointments?.items && appointments.items[0];

  return (
    <div className="md:max-w-1/2">
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

export default HealthQuestionnaireFromTab;
