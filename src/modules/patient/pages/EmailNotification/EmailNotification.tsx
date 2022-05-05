import React from "react";
import EmailNotification from "../../../common/components/EmailNotification/EmailNotification";
import ThinLine from "../../../../common/components/ThinLine/ThinLine";
import { useUserEmailPreferencesQuery } from "generated/graphql";
import { patientEmailPreferencesData } from "utils/helper";

interface userPreferencesType {
  admin_appointment_create_update: Boolean;
  appointment_accepted_by_doctor: Boolean;
  appointment_reminder: Boolean;
  appointment_rescheduled_by_doctor: Boolean;
  new_message_received: Boolean;
  patient_registration_update: Boolean;
  physician_registration_update: Boolean;
  __typename?: string;
}
function EmailNotificationPage() {
  const [userEmailPreferences, executeUserEmailPreferencesQuery] =
    useUserEmailPreferencesQuery();

  const userPreferences: userPreferencesType | undefined =
    userEmailPreferences?.data?.userEmailPreferences;

  // below function will be used for mutation call
  async function ChangeHandler(value: string, valStatus: boolean) {}
  return (
    <div>
      <div className="flex md:flex-row gap-0 max-w-[60%]">
        <div className=" w-full border py-0 rounded-lg border-gray-7">
          {userPreferences &&
            patientEmailPreferencesData?.map((item) => {
              return (
                <>
                  <EmailNotification
                    title={item.value}
                    key={item.key}
                    onChange={(e: boolean) => ChangeHandler(item.key, e)}
                    checked={
                      !!userPreferences[item?.key as keyof userPreferencesType]
                    }
                  />
                  <ThinLine />
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default EmailNotificationPage;
