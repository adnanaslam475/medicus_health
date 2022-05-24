import React from "react";
import { useRouter } from "next/router";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";

type Props = { data: object | undefined };
function AdminHealthQuestionnaireFormTab({ data }: Props) {
  // const { appointments } = data || {};

  return (
    <div className="max-w-1/2">
      {/* <CardWithProfileImageInfo
        name={`${appointments?.patient?.first_name} ${appointments?.patient?.last_name}`}
        serviceName={data?.serviceType?.name}
      >
        <QuestionnaireForm
          data={appointments?.patient?.patientHealthHistory?.history}
        />
      </CardWithProfileImageInfo> */}
    </div>
  );
}

export default AdminHealthQuestionnaireFormTab;
