import React, { useRef } from 'react'
import { notification } from 'antd';
import CardWithProfileImageInfo from 'common/components/CardWithProfileImageInfo/CardWithProfileImageInfo'
import { QuestionnaireForm } from 'common/components/Questionnary/Questionnary';
import { getUserData } from 'common/utils/userData';
import { useGetAllTransactionsQuery, usePatientHealthHistoryQuery, useUpdatePatientHealthHistoryMutation } from 'generated/graphql';


function QuestionnaireFormTab() {
    const form: any = useRef();
      // GET USER ID
  const { user } = getUserData();
  const id = user?.id;
  // Get patient Health History
  const [{ data }] = usePatientHealthHistoryQuery({
    variables: { input: id as number },
  });
  //GET ALL TRANSACTIONS
  const [{ data: allTransactions }] = useGetAllTransactionsQuery();
  const { transactions } = allTransactions || {};

  // UPDATE PATIENT HEALTH HISTORY

  const [result, updatePatientHealthHistory] =
    useUpdatePatientHealthHistoryMutation();

  const { error, fetching } = result;

  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    const healthQuesJson = JSON.stringify(quesPayload);
    try {
      await updatePatientHealthHistory({
        input: {
          history: healthQuesJson,
          user_id: id as number,
        },
      });
      {
        result?.data?.updatePatientHealthHistory &&
          notification.success({
            message: "Successfully Updated",
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-[800px]">
    <CardWithProfileImageInfo name="usama" serviceName="consultation">
      {
        <QuestionnaireForm
          ref={form}
          data={data?.patientHealthHistory?.history}
          onFinishSuccess={onFinishHealthQuestionnarySuccess}
        />
      }
    </CardWithProfileImageInfo>
  </div>
  )
}

export default QuestionnaireFormTab