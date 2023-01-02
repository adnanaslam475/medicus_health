import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { useRouter } from "next/router";
import {
  GetAppointmentInput,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import React from "react";
import { Spin } from "antd";

function HealthQuestionnaireFrom() {
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
      // filter: { searchString: String(query?.id), status: "Completed" },
      filter: { ...filterValues, status: "Completed" },
      pagination: { limit: -1, page: 1 },
      sorting,
    },
    requestPolicy: "network-only",
  });
  const { appointments } = data || {};
  const appointment = appointments?.items && appointments.items[0];
  return fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <div className="max-w-1/2">
      {/* <CardWithProfileImageInfo
        name={`${appointment?.patient?.first_name || ""} ${
          appointment?.patient?.last_name || ""
        }`}
        serviceName={appointment?.serviceType?.name || ""}
        imageUrl={appointment?.patient?.patientProfile?.profileImage}

      > */}
      <QuestionnaireForm
        data={appointment?.patient?.patientHealthHistory?.history}
      />
      {/* </CardWithProfileImageInfo> */}
    </div>
  );
}

export default HealthQuestionnaireFrom;
