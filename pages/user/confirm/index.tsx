import React from "react";
import { useRouter } from "next/router";

export default function EmailVerification() {
  const router = useRouter();
  const { token } = router.query;

  return <div>Email verification</div>;
}
