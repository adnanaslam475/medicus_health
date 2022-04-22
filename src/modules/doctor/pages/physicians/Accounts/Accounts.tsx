import React from 'react'
import AppLayout from '../../../../../common/components/AppLayout/AppLayout'
import AccountsDetail from './AccountsDetail'
function Accounts() {
  return (
    <AppLayout>
    <div className="w-full">
        <h2 className="mb-4">{("title")}</h2>
        <div className="w-full">
            <AccountsDetail/>
        </div>
    </div>
</AppLayout>
  )
}

export default Accounts