import React, { useState, useEffect, useRef } from "react";
import { Tabs, Button, Alert, notification, Tag } from "antd";
import PersonalInfo from "./PersonelInfo/PersonelInfo";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import HealthQuestionnary, {
	QuestionnaireForm,
} from "../Questionnary/Questionnary";
import {
	useUpdatePatientHealthHistoryMutation,
	usePatientHealthHistoryQuery,
	useGetAllTransactionsQuery,
	Transaction,
} from "../../../generated/graphql";
import { getUserData } from "../../utils/userData";
import _classes from "./AccountTabs.module.scss";
import { useRouter } from "next/router";
import { date } from "../../utils";
import { EyeFilled } from "@ant-design/icons";
import EmailNotificationPage from "modules/common/components/EmailNotification/EmailNotificationPage";

function AccountTabs() {
	const form: any = useRef();
	const [activeTab, setActiveTab] = React.useState<string>("");
	// GET USER ID
	const { user } = getUserData();
	const id = user?.id;

	// Get patient Health History
	const [{ data }] = usePatientHealthHistoryQuery({
		variables: { input: id as number },
	});
	const router = useRouter();
	const { query } = router;
	//GET ALL TRANSACTIONS
	const [{ data: allTransactions }] = useGetAllTransactionsQuery();
	const { transactions } = allTransactions || {};

	// UPDATE PATIENT HEALTH HISTORY

	const [result, updatePatientHealthHistory] =
		useUpdatePatientHealthHistoryMutation();

	const { error, fetching } = result;
	useEffect(() => {
		query?.activeTab && setActiveTab(String(query?.activeTab));
	}, [query]);
	const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
		const healthQuesJson = JSON.stringify(quesPayload);
		try {
			const res = await updatePatientHealthHistory({
				input: {
					history: healthQuesJson,
					user_id: id as number,
				},
			});
			{
				res?.data?.updatePatientHealthHistory &&
					notification.success({
						message: "Successfully Updated",
					});
			}
		} catch (err) {
			console.log(err);
		}
	};
	const onChangeTabHandler = (key: string) => {
		setActiveTab(key);
		history.pushState({}, "", "?activeTab=" + key);
	};

	return (
		<div>
			<div className={`${_classes["mobile-tabs"]} profile-tabs card-container`}>
				<Tabs
					type="card"
					defaultActiveKey="1"
					activeKey={activeTab || "1"}
					onChange={onChangeTabHandler}
				>
					<Tabs.TabPane
						className="w-full"
						tab={
							<span className="font-Circular font-medium">
								Personal information
							</span>
						}
						key="1"
					>
						<PersonalInfo />
					</Tabs.TabPane>
					<Tabs.TabPane
						tab={
							<span className="font-Circular font-medium">
								Health questionnaire
							</span>
						}
						key="2"
					>
						<div className="md:w-3/6">
							<QuestionnaireForm
								ref={form}
								data={data?.patientHealthHistory?.history}
								onFinishSuccess={onFinishHealthQuestionnarySuccess}
							/>

							<div className="flex items-center justify-end">
								<Button
									loading={fetching}
									disabled={fetching}
									className="ant-btn ant-btn-primary ant-btn mb-0"
									type="primary"
									onClick={() => form?.current?.submit()}
								>
									Update
								</Button>
							</div>
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane
						tab={
							<span className="font-Circular font-medium">Payment methods</span>
						}
						key="3"
					>
						<PaymentMethods />
					</Tabs.TabPane>
					<Tabs.TabPane
						tab={
							<span className="font-Circular font-medium">
								Transaction history
							</span>
						}
						key="4"
					>
						<TransactionHistory data={transactions as Transaction[]} />
					</Tabs.TabPane>
					<Tabs.TabPane
						tab={
							<span className="font-Circular font-medium">
								Email notification
							</span>
						}
						key="5"
					>
						<div className="lg:max-w-[60%]">
							<EmailNotificationPage />
						</div>
					</Tabs.TabPane>
				</Tabs>
			</div>
		</div>
	);
}

export default AccountTabs;
