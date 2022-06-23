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
    let expireTime = Number(loginTime) - Number(86400000);

    setTimeout(() => {
      let expireTime = Number(loginTime) - Number(86400000);
      if (Number(loginTime) > expireTime || new Date().getTime() > expireTime) {
        // Router.push("/login");
        // localStorage.clear();
      }
    }, expireTime);
  }, [loginTime]);
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <AuthProvider>
        <Provider value={client}>
          <Component {...pageProps} />
        </Provider>
      </AuthProvider>
    </NextIntlProvider>
  );
}

export default MyApp;
