import AppLayout from "common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import React from "react";
import StaffListing from "./StaffListing";

function StaffListingPage() {
	const router = useRouter();
	return (
		<AppLayout>
			<StaffListing />
		</AppLayout>
	);
}

export default StaffListingPage;
