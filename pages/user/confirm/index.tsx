import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useUserVerifyEmailMutation } from "../../../src/generated/graphql";
import Container from "../../../src/common/components/Container/Container";
import Image from "next/image";

export default function EmailVerification() {
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const { token } = router.query;
  const [, userVerifyEmail] = useUserVerifyEmailMutation();

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);
  async function verifyToken() {
    try {
      const res = await userVerifyEmail({
        input: token as string,
      });
      if (res?.error) {
        setErrorMsg(res.error.graphQLErrors[0].message);
      } else {
        Router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container className="login-bg w-full">
      <div className="flex items-center justify-center min-h-screen w-h-100 py-16">
        <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/2 px-0">
          <div className="card p-4 shadow-lg drop-shadow-2xl rounded-lg bg-white pt-24 pb-12 px-6">
            <div className="flex flex-col justify-center mb-6">
              <Image
                alt=""
                className="main-logo mx-auto"
                height={34}
                width={216}
                src="/assets/images/logo-medi.svg"
              />
              <div className="flex justify-center mt-10">
                {!errorMsg ? (
                  <Image
                    alt=""
                    className="success-icon mx-auto mt-10"
                    height={84}
                    width={84}
                    src="/assets/icon/success-big.svg"
                  />
                ) : (
                  <Image
                    alt=""
                    className="success-icon mx-auto mt-10"
                    height={84}
                    width={84}
                    src="/assets/icon/failed-big.png"
                  />
                )}
              </div>
            </div>
            <h2 className="text-center text-secondary mb-3 px-10 leading-8">
              {!errorMsg ? "Verifying..." : errorMsg}
            </h2>
          </div>
        </div>
      </div>
    </Container>
  );
}
