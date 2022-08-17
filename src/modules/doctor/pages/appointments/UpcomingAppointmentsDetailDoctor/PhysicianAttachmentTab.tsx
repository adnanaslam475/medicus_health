import Attachment from "common/components/Attachment/Attachment";
import { parseJson } from "common/utils/helper";
import {
  useDoctorAppointmentDetailQuery,
  useGetAppointmentReportUrlByIdQuery,
} from "generated/graphql";
import word from "public/assets/images/word-file.svg";
import { useRouter } from "next/router";
import React from "react";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { AttachmentObject } from "common/types/types";
import { Empty } from "antd";

function PhysicianAttachmentTab() {
  const { query } = useRouter();

  const [{ data }] = useDoctorAppointmentDetailQuery({
    variables: {
      id: Number(query.appointmentId),
    },
    pause: !query.appointmentId,
  });
  const { appointment } = data || {};

  const [{ data: appoinmentUrl }] = useGetAppointmentReportUrlByIdQuery({
    variables: {
      id: Number(appointment?.id),
    },
    pause: !appointment?.id,
  });

  //get appointment URL
  const { reportUrl } = appoinmentUrl?.appointment || {};
  let urlArr = parseJson(reportUrl);
  if (urlArr && urlArr.length > 0) {
    urlArr = urlArr[0]?.map((item: any) => ({
      name: item.split("com/")[1],
      url: item,
    }));
  }
  const { patient, serviceType } = appointment || {};
  return (
    <CardWithProfileImageInfo
      name={`${patient?.first_name} ${patient?.last_name}`}
      serviceName={serviceType?.name}
    >
      <div className="">
        {urlArr?.length ? (
          urlArr?.map((item: AttachmentObject) => (
            <Attachment item={item} enable={false} />
          ))
        ) : (
          <div className="flex items-center justify-center w-3/5 mt-5">
            <Empty />
          </div>
        )}
      </div>
    </CardWithProfileImageInfo>
  );
}

export default PhysicianAttachmentTab;
