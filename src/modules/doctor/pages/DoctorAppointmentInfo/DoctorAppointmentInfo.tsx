import React from "react";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import { Button } from "antd";
import LabelWithText from "common/components/LabelWithText/LabelWithText";

// scss
import _classes from "./DoctorAppointmentInfo.module.scss";
import Router from "next/router";

function DoctorAppointmentInfo() {
	return (
		<>
			<div className="max-w-[700px]">
				<LabelWithText label="ID" text="1" />
				<LabelWithText label="Patient" text="1" />
				<LabelWithText label="Type" text="1" />
				<LabelWithText label="Date" text="1" />
				<LabelWithText label="Time" text="1" />
				<LabelWithText label="Total Amount" text="1" />
				<LabelWithText label="Status" text="Pending" />
			</div>
			<div className="max-w-1/2 flex justify-between mt-6">
				<div className="flex">
					<Button
						icon={<MessageOutlined />}
						className={`${_classes["appointments-btn"]} mr-3`}
						onClick={() => Router.push("/admin/messages")}
					>
						Message Admin
					</Button>
					<Button
						icon={<MessageOutlined />}
						className={`${_classes["appointments-btn"]}`}
						onClick={() => Router.push("/doctor/messages")}
					>
						Message Physician
					</Button>
				</div>
				<Button
					type="primary"
					icon={<VideoCameraFilled />}
					className={`${_classes["appointments-btn"]} bg-current`}
				>
					Join Now
				</Button>
			</div>
		</>
	);
}

export default DoctorAppointmentInfo;
