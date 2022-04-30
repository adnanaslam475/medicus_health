import React from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import yourImage from "../../../../../public/assets/images/your_photo.png";
import { Avatar } from "antd";
import EmailNotification from "../../../common/components/EmailNotification/EmailNotification";
import ThinLine from "../../../../common/components/ThinLine/ThinLine";

function EmailNotificationPage() {
  // const onPreferenceChange = async (checked, setChecked, id) => {
  //   try {
  //      const res = await updateEmailPreferences(id, { status: `${Number(checked)}` });
  //     setChecked(Number(0));
  //   } catch (error) {
  //      notification.error({
  //       message: error?.message || "Something went wrong",
  //      });
  //   }
  // };
  return (
    <div>
      <div className="flex md:flex-row gap-0 max-w-[60%]">
        <div className=" w-full border py-0 rounded-lg border-gray-7">
          <EmailNotification
            title="Appointment Accepted by Doctor"
            defaultChecked={1}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
          <ThinLine />
          <EmailNotification
            title="Appointment rescheduled by Doctor"
            defaultChecked={1}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
          <ThinLine />
          <EmailNotification
            title="Appointment Reminder (24 hours before the appointment)"
            defaultChecked={1}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
          <ThinLine />
          <EmailNotification
            title="Admin Creates/Update Appointment"
            defaultChecked={1}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
             <ThinLine />
          <EmailNotification
            title="The Patient/Physician/Administrator receives a chat message"
            defaultChecked={1}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default EmailNotificationPage;
