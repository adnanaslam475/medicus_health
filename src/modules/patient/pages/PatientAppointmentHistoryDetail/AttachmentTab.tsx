import Attachment from "common/components/Attachment/Attachment";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import React from "react";
import jpgIcon from "../../../../../public/assets/images/jpg.svg";
import word from "../../../../../public/assets/images/word-file.svg";

function AttachmentTab() {
	return (
        <CardWithProfileImageInfo
        name="usama"
        serviceName="doctor"
    >
		<div className="flex gap-2">
			<Attachment src={word} name="test_reports.pdf" enable={true} />
			<Attachment src={jpgIcon} name="test_reports.jpg" enable={true} />
		</div>
        </CardWithProfileImageInfo>
	);
}

export default AttachmentTab;
