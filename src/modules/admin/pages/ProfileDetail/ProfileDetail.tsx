/* eslint-disable react/jsx-key */
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import {
	BellOutlined,
	CalendarOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import AppLayout from "../../../../common/components/AppLayout/AppLayout";
import { Profile } from "../../components/Profile/Profile";
import EmailNotification from "../EmailNotification/EmailNotification";
import AdminPhysicianPatientAppointment from "../AdminPhysicianPatientAppointment/AdminPhysicianPatientAppointment";
import {
	useCreateDoctorScheduleMutation,
	useDoctorProfileQuery,
	useRemoveDoctorScheduleMutation,
	useScheduleQuery,
} from "../../../../generated/graphql";
import { ViewProfile } from "common/components/ViewProfile/ViewProfile";
import { RangeValue } from "rc-picker/lib/interface";
import AdminPhysicianPatientAppointmentTab from "./AdminPhysicianPatientAppointmentTab";
import StaffListing from "modules/doctor/pages/staff/StaffListing/StaffListing";

const { TabPane } = Tabs;

function ProfileDetail() {
	const [isEdit, setIsEdit] = useState(false);
	const [addScheduleDay, setAddScheduleDay] = useState<number | string>(
		"Select Day"
	);
	const [addScheduleTime, setAddScheduleTime] = useState<{
		time: RangeValue<moment.Moment> | null;
		timeString: string[];
	}>({ timeString: [], time: null });
	const [deleteScheduleId, setDeleteScheduleId] = useState("");

	const editData = () => {
		setIsEdit(!isEdit);
	};
	//   GET ID FROM URL
	const router = useRouter();
	const { query } = router;
	const docId = query?.id;

	const [{ data }] = useDoctorProfileQuery({
		variables: { doctor_id: Number(docId) },
	});

	const { doctorProfile } = data || {};

	const [doctorSchedules, executeDoctorSchedules] = useScheduleQuery({
		variables: { doctorId: Number(docId) },
	});
	const schedules = doctorSchedules?.data?.doctorSchedules;

	const [createDoctorScheduleResponse, executeCreateDoctorScheduleMutation] =
		useCreateDoctorScheduleMutation();
	const { fetching } = createDoctorScheduleResponse;

	const [, executeRemoveDoctorScheduleMutation] =
		useRemoveDoctorScheduleMutation();

	async function onAddClick() {
		if (isEdit && addScheduleDay && addScheduleTime?.timeString?.length) {
			const variable = {
				doctorId: Number(docId),
				day: Number(addScheduleDay),
				startTime: addScheduleTime.timeString[0],
				endTime: addScheduleTime.timeString[1],
			};

			await executeCreateDoctorScheduleMutation(variable);
			await executeDoctorSchedules({ requestPolicy: "network-only" });
			setAddScheduleDay("Select Day");
			setAddScheduleTime({ timeString: [], time: null });
		}
	}
	useEffect(() => {
		if (deleteScheduleId) {
			executeRemoveDoctorScheduleMutation({ id: Number(deleteScheduleId) });
		}
	}, [deleteScheduleId]);

	return (
		<AppLayout>
			<div className="w-full">
				<div className="w-full py-5">
					<Tabs
          defaultActiveKey="1"
					 activeKey={String(query.activeTab) || "1"}
						onChange={(key) => {
							router.push({
								pathname: `/admin/physicians/${query?.id}`,
								query: {
									activeTab: key,
								},
							});
						}}
					>
						<TabPane
							tab={
								<span>
									<UserOutlined className="" />
									Profile
								</span>
							}
							key="1"
						>
							{isEdit ? (
								<Profile
									doctorId={String(query?.id)}
									doctorData={doctorProfile}
									edit={editData}
									setIsEdit={setIsEdit}
									// schedules={schedules}
									// setDeleteScheduleId={setDeleteScheduleId}
									// setAddScheduleDay={setAddScheduleDay}
									// addScheduleDay={String(addScheduleDay)}
									// setAddScheduleTime={setAddScheduleTime}
									// addScheduleTime={addScheduleTime}
									// onAddClick={onAddClick}
									// loading={fetching}
								/>
							) : (
								<ViewProfile
									doctorId={String(query?.id)}
									doctorData={doctorProfile}
									setIsEdit={setIsEdit}
									showLoginInfo={false}
									schedules={schedules}
								/>
							)}
						</TabPane>
						<TabPane
							tab={
								<span>
									<BellOutlined />
									Email Notifications
								</span>
							}
							key="2"
						>
							<EmailNotification />
						</TabPane>
						<TabPane
							tab={
								<span>
									<CalendarOutlined />
									Appointment
								</span>
							}
							key="3"
						>
							<AdminPhysicianPatientAppointmentTab />
						</TabPane>
						<TabPane
							tab={
								<span>
									<TeamOutlined />
									Staff
								</span>
							}
							key="4"
						>
							<StaffListing />
						</TabPane>
					</Tabs>
				</div>
			</div>
		</AppLayout>
	);
}

export default ProfileDetail;
