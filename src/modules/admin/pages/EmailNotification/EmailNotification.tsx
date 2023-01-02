import React from "react";
import Image from "next/image";
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
      <div className="w-full mb-10 flex gap-8 items-center">
        <Avatar
          size={{ xs: 70, sm: 70, md: 70, lg: 130, xl: 130, xxl: 130 }}
          src={
            <Image
              priority={true}
              alt=""
              src={yourImage}
              width={228}
              height={228}
              className="border rounded border-gray-2"
            />
          }
        />
        <div>
          <span>PY-123</span>
          <h2 className="mb-0  sm:text-base text-lg">Maxime bauwents</h2>
          <span className="block">usama@gmail.com</span>
        </div>
      </div>
      <div className="flex md:flex-row gap-0 md:max-w-[100%]">
        <div className=" w-full border py-0 rounded-lg border-gray-7">
          <EmailNotification
            title="Patient registration update"
            defaultChecked={0}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
          <ThinLine />
          <EmailNotification
            title="Patient registration update"
            defaultChecked={0}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
          <ThinLine />
          <EmailNotification
            title="Patient registration update"
            defaultChecked={1}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
          <ThinLine />
          <EmailNotification
            title="Patient registration update"
            defaultChecked={0}
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
