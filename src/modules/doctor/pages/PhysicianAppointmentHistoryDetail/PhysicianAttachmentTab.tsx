import Attachment from 'common/components/Attachment/Attachment';
import { parseJson } from 'common/utils/helper';
import { useDoctorAppointmentDetailQuery, useGetAppointmentReportUrlByIdQuery } from 'generated/graphql';
import word from "../../../../../public/assets/images/word-file.svg";
import { useRouter } from 'next/router';
import React from 'react'

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

	const { reportUrl } = appoinmentUrl?.appointment || {};

	let urlArr = parseJson(reportUrl);
	if (urlArr && urlArr.length > 0) {
		urlArr = urlArr[0]?.map((item: any) => item.split("com/")[1]);
	}
  return (

    <div className="">
    {urlArr?.map((item: any) => (
        <Attachment src={word} name={item}  enable={false}/>
    ))}
</div>
  )
}

export default PhysicianAttachmentTab