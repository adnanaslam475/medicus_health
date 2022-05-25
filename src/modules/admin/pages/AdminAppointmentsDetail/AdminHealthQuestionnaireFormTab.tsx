import React from "react";
import { useRouter } from "next/router";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";
import { Appointment } from "generated/graphql";

type Props = { data: Appointment | undefined };
function AdminHealthQuestionnaireFormTab({ data }: Props) {
  return <div className="max-w-1/2"></div>;
}

export default AdminHealthQuestionnaireFormTab;
