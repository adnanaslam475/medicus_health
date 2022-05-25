import Attachment from "common/components/Attachment/Attachment";
import { useRouter } from "next/router";
import { parseJson } from "common/utils/helper";
import { usePhysicianAppointmentsHistoryQuery } from "generated/graphql";
import word from "../../../../../public/assets/images/word-file.svg";
import React from "react";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";

type Props = {
  data: object | undefined;
};
function AdminAttachmentTab({ data }: Props) {
 
  return (
    <>
     
    </>
  );
}

export default AdminAttachmentTab;
