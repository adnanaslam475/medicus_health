import React from "react";
import EmailNotification from "../../../common/components/EmailNotification/EmailNotification";
import ThinLine from "../../../../common/components/ThinLine/ThinLine";
import {
  TogglePreference,
  UserEmailPreferencesResponse,
  useUserEmailPreferencesQuery,
} from "generated/graphql";
import { patientEmailPreferencesData } from "utils/helper";

function EmailNotificationPage() {
  const [{ data }, executeUserEmailPreferencesQuery] =
    useUserEmailPreferencesQuery();
  const { userEmailPreferences } = data || {};

  // below function will be used for mutation call
  async function ChangeHandler(value: string, valStatus: boolean) {}
  return (
    <div>
      <div className="flex md:flex-row gap-0 max-w-[60%]">
        <div className=" w-full border py-0 rounded-lg border-gray-7">
          {userEmailPreferences &&
            patientEmailPreferencesData?.map((item) => {
              return (
                <>
                  <EmailNotification
                    title={item.value}
                    key={item.key}
                    onChange={(e: boolean) => ChangeHandler(item.key, e)}
                    checked={
                      !!userEmailPreferences[
                        item?.key as keyof TogglePreference
                      ]
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
