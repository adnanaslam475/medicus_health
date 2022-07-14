import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { useRouter } from "next/router";
import {
  useGetUserQuery,
  usePatientHealthHistoryQuery,
  usePhysicianAppointmentsHistoryQuery,
  useUpdatePatientHealthHistoryMutation,
} from "generated/graphql";
import React, { useRef } from "react";
import { Button, notification } from "antd";
import { getUserData } from "common/utils/userData";

function AdminHealthQuestionnaireFrom() {
  const { query } = useRouter();
  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchString: String(query?.id) },
    },
    requestPolicy: "network-only",
  });
  const { appointments } = data || {};
  const appointment = appointments?.items && appointments.items[0];

  console.log("appointments", appointments);

  const form: any = useRef();

  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  // Get patient Health History
  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: Number(query?.id) },
  });

  // UPDATE PATIENT HEALTH HISTORY

  const [result, updatePatientHealthHistory] =
    useUpdatePatientHealthHistoryMutation();

  const { error, fetching } = result;

  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    const healthQuesJson = JSON.stringify(quesPayload);
    try {
      const res = await updatePatientHealthHistory({
        input: {
          history: healthQuesJson,
          user_id: Number(query?.id),
        },
      });
      {
        res?.data?.updatePatientHealthHistory &&
          notification.success({
            message: "Successfully Updated",
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:max-w-1/2">
      <CardWithProfileImageInfo
        name={`${appointment?.patient?.first_name || ""} ${appointment?.patient?.last_name || ""}`}
        serviceName={appointment?.serviceType?.name}
      >
        <QuestionnaireForm
          ref={form}
          data={patientHealthHistory?.patientHealthHistory?.history}
          onFinishSuccess={onFinishHealthQuestionnarySuccess}
        />
        <div className="flex items-center justify-end">
          <Button
            loading={fetching}
            disabled={fetching}
            className="ant-btn ant-btn-primary ant-btn mb-0"
            type="primary"
            onClick={() => form?.current?.submit()}
          >
            Update
          </Button>
        </div>
      </CardWithProfileImageInfo>
    </div>
  );
}

export default AdminHealthQuestionnaireFrom;
