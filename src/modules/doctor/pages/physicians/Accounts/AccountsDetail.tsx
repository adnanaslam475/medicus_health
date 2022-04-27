import React from "react";
import { Tabs } from "antd";
import AccountsProfile from "./AccountsProfile/AccountsProfile";
import BankInfo from "./BankInfo/BankInfo";

// scss
import _classes from "./Account.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../../../../config";

function Accounts() {
  return (
    <div>
      <div className={`${_classes["mobile-tabs"]} profile-tabs card-container`}>
        <Tabs type="card">
          <Tabs.TabPane
            className="w-full"
            tab={
              <span className="font-Circular font-medium flex">Profile</span>
            }
            key="1"
          >
            <AccountsProfile />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium flex">Bank Info</span>
            }
            key="2"
          >
            <div className="w-2/6">
              <Elements stripe={loadStripe(config.stripeKey || "")}>
                <BankInfo />
              </Elements>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="font-Circular font-medium">Questionnaire</span>
            }
            key="3"
          >
            {/* <PaymentMethods /> */}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Accounts;
