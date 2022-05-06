import React from "react";
import EmailNotification from "../../../common/components/EmailNotification/EmailNotification";
import ThinLine from "../../../../common/components/ThinLine/ThinLine";
import {
  TogglePreference,
  useToggleEmailPreferencesMutation,
  useUserEmailPreferencesQuery,
} from "generated/graphql";
import { patientEmailPreferencesData } from "utils/helper";

function EmailNotificationPage() {
  const [{ data }, executeUserEmailPreferencesQuery] =
    useUserEmailPreferencesQuery();
  const { userEmailPreferences } = data || {};

  const [
    toggleEmailPreferencesMutation,
    executeToggleEmailPreferencesMutation,
  ] = useToggleEmailPreferencesMutation();

  async function ChangeHandler(value: string, valStatus: boolean) {
    const variables = {
      toggleEmailPreferencesInput: { [value]: valStatus },
    };
    await executeToggleEmailPreferencesMutation(variables);
    await executeUserEmailPreferencesQuery({ requestPolicy: "network-only" });
  }
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
