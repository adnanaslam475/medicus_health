import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";
import { NextIntlProvider } from "next-intl";
import AuthProvider from "common/hooks/authProvider";
import { getToken, getUserData } from "common/utils/userData";
import config from "./../config";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "./../styles/global.scss";
import "./../styles/cutomized-antd.css";
import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

const client = createClient({
  url: config.baseURL || "",
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    };
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const { user } = getUserData();
  const loginTime =
    typeof window !== "undefined" && localStorage?.getItem("loginTime");

  useEffect(() => {
    const loginTime =
      typeof window !== "undefined" && localStorage?.getItem("loginTime");
    let expireTime = Number(loginTime) + Number(86400000);

    setTimeout(() => {
      Router.push("/login");
      localStorage.clear();
    }, expireTime - Date.now());
  }, [loginTime]);
  return (
    <>
      <Head>
        <title>Medicus</title>
        <meta name="description" content="Patient Physicians and Admins" />
        {/* <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        /> */}
        <link rel="icon" type="image/ico" href="./../public/favicon.ico" />
        {/* <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" /> */}
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <NextIntlProvider messages={pageProps.messages}>
        <AuthProvider>
          <Provider value={client}>
            <Component {...pageProps} />
          </Provider>
        </AuthProvider>
      </NextIntlProvider>
    </>
  );
}

export default MyApp;
