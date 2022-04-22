import React,{useState} from 'react'
import EditProfile from '../EditProfile/EditProfile'
import ViewProfile from '../ViewProfile/ViewProfile'

function AccountsProfile() {
    const [isEdit, setIsEdit] = useState(false);
  return (
    <div>  {isEdit ? (
        <EditProfile
        //   doctorId={query?.id}
        //   doctorData={doctorProfile}
        //   edit={editData}
          setIsEdit={setIsEdit}
        />
      ) : (
        <ViewProfile
        //   doctorId={query?.id}
        //   doctorData={doctorProfile}
          setIsEdit={setIsEdit}
        />
      )}</div>
  )
}

export default AccountsProfile