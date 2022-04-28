import React from "react";
import AdminAccountTabs from "../../../../../common/components/AdminAccountTabs/AdminAccountTabs";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";

function AdminAccountDetail() {
    return (
        <AppLayout>
            <div className="w-full">
                {/* <h2 className="mb-4">Admin Account Tabs</h2> */}
                <div className="w-full">
                    <AdminAccountTabs />
                </div>
            </div>
        </AppLayout>
    );
}
export default AdminAccountDetail;
