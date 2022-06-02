import Attachment from 'common/components/Attachment/Attachment'
import { parseJson } from 'common/utils/helper';
import { useDoctorAppointmentDetailQuery, useGetAppointmentReportUrlByIdQuery } from 'generated/graphql';
import word from "public/assets/images/word-file.svg";
import { useRouter } from 'next/router';
import React from 'react'
import CardWithProfileImageInfo from 'common/components/CardWithProfileImageInfo/CardWithProfileImageInfo';

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
    });
  
    //get appointment URL
    const { reportUrl } = appoinmentUrl?.appointment || {};
    let urlArr = parseJson(reportUrl);
    if (urlArr && urlArr.length > 0) {
      urlArr = urlArr[0]?.map((item: any) => item.split("com/")[1]);
    }
    const { patient, serviceType } = appointment || {}
  return (
    <CardWithProfileImageInfo
    name={`${patient?.first_name} ${patient?.last_name}`}
    serviceName={serviceType?.name}
  >
    <div className="">
    {urlArr?.map((item:string) => (
      <Attachment name={item} enable={false} />
    ))}
  </div>
  </CardWithProfileImageInfo>
  )
}

export default PhysicianAttachmentTab