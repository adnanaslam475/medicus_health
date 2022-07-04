import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { useRouter } from "next/router";
import { usePhysicianAppointmentsHistoryQuery } from "generated/graphql";
import React from "react";
import { Spin } from "antd";

function HealthQuestionnaireFrom() {
  const { query } = useRouter();
  const [{ data,fetching }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchString: String(query?.id), status: "Completed" },
    },
    requestPolicy: "network-only",
  });
  const { appointments } = data || {};
  const appointment = appointments && appointments[0];
  return (fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <div className="max-w-1/2">
      <CardWithProfileImageInfo
        name={`${appointment?.patient?.first_name || ""} ${appointment?.patient?.last_name || ""}`}
        serviceName={appointment?.serviceType?.name || ""}
      >
        <QuestionnaireForm
          data={appointment?.patient?.patientHealthHistory?.history}
        />
      </CardWithProfileImageInfo>
    </div>)
  );
}

export default HealthQuestionnaireFrom;
