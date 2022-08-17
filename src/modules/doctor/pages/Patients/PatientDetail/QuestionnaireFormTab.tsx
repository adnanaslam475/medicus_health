import React, { useRef } from "react";
import { notification, Skeleton } from "antd";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { getUserData } from "common/utils/userData";
import {
  useGetAllTransactionsQuery,
  usePatientHealthHistoryQuery,
  User,
  useUpdatePatientHealthHistoryMutation,
} from "generated/graphql";
import { useRouter } from "next/router";

type Props = {
  userDetail: User;
  fetching: boolean;
};
function QuestionnaireFormTab(props: Props) {
  const { userDetail, fetching: userDataFetching } = props;
  const form: any = useRef();
  // GET USER ID
  const { user } = getUserData();
  const { query } = useRouter();

  const id = Number(query?.id);
  // Get patient Health History
  const [{ data }] = usePatientHealthHistoryQuery({
    variables: { input: id },
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
            message: "Successfully updated",
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const firstName = userDetail?.first_name;
  const email = userDetail?.email;
  const profilePicture = userDetail?.patientProfile?.profileImage;

  return (
    <div className="max-w-[800px]">
      <Skeleton loading={userDataFetching} paragraph={{ rows: 0 }} active>
        <CardWithProfileImageInfo
          name={firstName}
          serviceName={email}
          imageUrl={profilePicture}
        >
          {
            <QuestionnaireForm
              ref={form}
              data={data?.patientHealthHistory?.history}
              onFinishSuccess={onFinishHealthQuestionnarySuccess}
            />
          }
        </CardWithProfileImageInfo>
      </Skeleton>
    </div>
  );
}

export default QuestionnaireFormTab;
