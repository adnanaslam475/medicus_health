import { ViewProfile } from "common/components/ViewProfile/ViewProfile";
import React, { useState } from "react";
import EditProfile from "../EditProfile/EditProfile";

function AccountsProfile() {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      {" "}
      {isEdit ? (
        <EditProfile
          //   doctorId={query?.id}
          //   doctorData={doctorProfile}
          //   edit={editData}
          setIsEdit={setIsEdit}
        />
      ) : (
        <ViewProfile setIsEdit={setIsEdit} loginInfo />
      )}
    </div>
  );
}

export default AccountsProfile;
