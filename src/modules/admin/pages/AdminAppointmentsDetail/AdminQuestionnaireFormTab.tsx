import React from "react";
import { useRouter } from "next/router";
import PhysicianQuestionnaire from "common/components/Appointments/PhysicianQuestionnaire";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { usePhysicianAppointmentsHistoryQuery } from "generated/graphql";

type Props = {
  data: object | undefined;
};
function AdminQuestionnaireFormTab({ data }: Props) {
  
  return (
    <div className="">
      
    </div>
  );
}

export default AdminQuestionnaireFormTab;
