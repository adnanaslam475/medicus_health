import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import {
  GetAppointmentInput,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";

function HealthQuestionnaireFromTab() {
  const { query } = useRouter();

  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      // filter: { appointmentId: Number(query?.id) },
      filter: { searchString: String(query?.id), status: "Completed" },
      pagination,
      sorting,
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
