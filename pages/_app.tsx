/* eslint-disable @next/next/next-script-for-ga */
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
import {
  UserDataProvider,
  useUserData,
} from "common/components/Context/UserContext";
import Script from "next/script";
// import favicon from "../public/favicon.ico";

const client = createClient({
  url: config.baseURL || "",
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    };
  },
});
function MyApp({ Component, pageProps }: AppProps | any) {
  const { user } = getUserData();
  const loginTime =
    typeof window !== "undefined" && localStorage?.getItem("loginTime");

  useEffect(() => {
    const loginTime =
      typeof window !== "undefined" && localStorage?.getItem("loginTime");
    let expireTime = Number(loginTime) + Number(86400000);
    if (loginTime) {
      setTimeout(() => {
        Router.push("/login");
        localStorage.removeItem("loggedInUserData");
      }, expireTime - Date.now());
    }
  }, [loginTime]);

  return (
    <>
      <Head>
        <title>Medicus</title>
        {process.env.NEXT_PUBLIC_PRODUCTION === "true" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TT8JQHF');`,
            }}
          />
        )}
      </Head>
      <UserDataProvider>
        <NextIntlProvider messages={pageProps.messages}>
          <AuthProvider>
            <Provider value={client}>
              <Script
                src="https://polyfill.io/v3/polyfill.min.js?features=Intl%2CIntl.DateTimeFormat%2CIntl.RelativeTimeFormat%2CIntl.DateTimeFormat.%7EtimeZone.all%2CIntl.PluralRules%2CIntl.Locale%2CIntl.NumberFormat"
                strategy="beforeInteractive"
              />
              <Component {...pageProps} />
            </Provider>
          </AuthProvider>
        </NextIntlProvider>
      </UserDataProvider>
    </>
  );
}

export default MyApp;
