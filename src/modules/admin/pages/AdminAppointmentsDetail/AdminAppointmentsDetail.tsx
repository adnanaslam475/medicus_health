import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Button, notification, Tabs } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import AdminAppointmentInfoTab from "./AdminAppointmentInfoTab";
import AdminQuestionnaireFormTab from "./AdminQuestionnaireFormTab";
import AdminHealthQuestionnaireFormTab from "./AdminHealthQuestionnaireFormTab";
import AdminNotesWithTextTab from "./AdminNotesWithTextTab";
import AdminAttachmentTab from "./PhysicianAttachmentTab";
import { Appointment, useGetAppointmentByIdQuery } from "generated/graphql";
import { REQUESTED, PROPOSED, COMPLETED } from "common/constants/status";
import NotesTab from "common/components/NotesTab/NotesTab";

function AdminAppointmentHistoryDetail() {
	const { query } = useRouter();
	const [activeTab, setActiveTab] = useState<string>("");

	const [{ data, fetching }] = useGetAppointmentByIdQuery({
		variables: { id: Number(query?.id) },
	});

	const { appointment } = data || {};
	const status = appointment?.status;

	const doctorNotes =
		appointment?.currentAppointmentNote &&
		Object?.entries(appointment?.currentAppointmentNote);
	const isNotesShow = [REQUESTED, PROPOSED, COMPLETED].includes(
		appointment?.status || ""
	);

	const onChangeTabHandler = (key: string) => {
		setActiveTab(key);
		history.pushState({}, "", "?activeTab=" + key);
	};
	useEffect(() => {
		query?.activeTab && setActiveTab(String(query?.activeTab));
	}, [query]);

	return (
		<AppLayout>
			<div>
				<h2 className="mb-4">Appointments History Detail</h2>

				<div className="profile-tabs">
					<Tabs
						type="card"
						defaultActiveKey="1"
						activeKey={activeTab || "1"}
						onChange={onChangeTabHandler}
					>
						<Tabs.TabPane tab="Appointment info" key="1" className="">
							<AdminAppointmentInfoTab
								appointment={appointment as Appointment}
								loading={fetching}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab="Health questionnaire" key="3">
							<AdminHealthQuestionnaireFormTab
								appointment={appointment as Appointment}
								loading={fetching}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab="Physician questionnaire" key="4">
							<AdminQuestionnaireFormTab
								appointment={appointment as Appointment}
								loading={fetching}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab="Attachment" key="5">
							<AdminAttachmentTab
								appointment={appointment as Appointment}
								loading={fetching}
							/>
						</Tabs.TabPane>
						{/* {isNotesShow && (
              <Tabs.TabPane tab="Notes" key="6">
                <AdminNotesWithTextTab
                  appointment={appointment as Appointment}
                  doctorNotes={doctorNotes as [[string, string]]}
                />
              </Tabs.TabPane>
            )} */}
						{(status === "Confirmed" ||
							status === "Completed" ||
							status === "Canceled" ||
							status === "Requested") && (
							<>
								{/* {pathname.includes("appointments") && ( */}
								<Tabs.TabPane tab={<span>Notes</span>} key="6">
									<NotesTab />
								</Tabs.TabPane>
								{/* )} */}
							</>
						)}
					</Tabs>
				</div>
			</div>
		</AppLayout>
	);
}
export default AdminAppointmentHistoryDetail;
