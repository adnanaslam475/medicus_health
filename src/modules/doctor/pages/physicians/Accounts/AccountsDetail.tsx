import { Badge, Button, Tabs } from "antd";
import Image from "next/image";
import React from "react";
import AccountsProfile from "./AccountsProfile/AccountsProfile";
import profile from "./../../../../../../public/assets/icon/profile.svg";
import { ProfileIcon } from "../../../../../common/components/CustomIcon";
import { DollarIcon } from "../../../../../common/components/CustomIcon";

import _classes from "./Account.module.scss";
import BankInfo from "./BankInfo/BankInfo";
function Accounts() {
	const { TabPane } = Tabs;
	return (
		<div>
			<div className="">
				<Tabs>
					<TabPane
						tab={
							<span className="font-Circular font-medium flex">
								<ProfileIcon className={_classes["sidebar-icon-hover"]} />
								<span className="ml-3 text-xs sm:text-base">Profile</span>
							</span>
						}
						key="1"
					>
						<AccountsProfile />
					</TabPane>
					<TabPane
						tab={
							<span className="font-Circular font-medium flex">
                <DollarIcon className={_classes["sidebar-icon-hover"]} />
								<span className="ml-3 text-xs sm:text-base">Bank Info</span>
							</span>
						}
						key="2"
					>
						<div className="w-2/6">
							<BankInfo />
						</div>
					</TabPane>
					<TabPane
						tab={
							<span className="font-Circular font-medium">Questionnaire</span>
						}
						key="3"
					>
						{/* <PaymentMethods /> */}
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
}

export default Accounts;
