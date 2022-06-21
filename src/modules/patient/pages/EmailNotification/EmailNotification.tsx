import React, { useEffect, useState } from "react";
import EmailNotification from "../../../common/components/EmailNotification/EmailNotification";
import ThinLine from "common/components/ThinLine/ThinLine";
import {
  TogglePreference,
  UserEmailPreferencesResponse,
  useToggleEmailPreferencesMutation,
  useUserEmailPreferencesQuery,
} from "generated/graphql";
import { patientEmailPreferencesData } from "utils/helper";

function EmailNotificationPage() {
  const [{ data }, executeUserEmailPreferencesQuery] =
    useUserEmailPreferencesQuery({ requestPolicy: "network-only" });
  const { userEmailPreferences } = data || {};
  const [notificationState, setNotificationState] = useState<
    UserEmailPreferencesResponse | undefined
  >(userEmailPreferences);

  const [
    toggleEmailPreferencesMutation,
    executeToggleEmailPreferencesMutation,
  ] = useToggleEmailPreferencesMutation();

  useEffect(() => {
    executeUserEmailPreferencesQuery({ requestPolicy: "network-only" });
    setNotificationState(userEmailPreferences);
  }, [userEmailPreferences?.__typename]);

  async function ChangeHandler(value: string, valStatus: boolean) {
    const variables = {
      toggleEmailPreferencesInput: { [value]: valStatus },
    };

    setNotificationState((prev) => ({
      ...(prev || {}),
      [value]: valStatus,
    }));
    await executeToggleEmailPreferencesMutation(variables);
  }

  return (
    <div>
      <div className="flex md:flex-row gap-0 md:max-w-[60%]">
        <div className=" w-full border py-0 rounded-lg border-gray-7">
          {patientEmailPreferencesData?.map((item) => {
            return (
              <>
                <EmailNotification
                  title={item.value}
                  key={item.key}
                  onChange={(e: boolean) => ChangeHandler(item.key, e)}
                  disabled={!userEmailPreferences}
                  checked={
                    userEmailPreferences &&
                    (notificationState || userEmailPreferences)[
                      //@ts-ignore
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
