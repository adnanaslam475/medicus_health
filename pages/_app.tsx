/* eslint-disable @next/next/next-script-for-ga */
import type { AppProps } from "next/app";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from "@urql/core";
import { CombinedError, Provider } from "urql";
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
import { authExchange } from "@urql/exchange-auth";

const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("loggedInUserData");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("appointmentsAlertData");
    Router.push("/login");
  }
};
const client = createClient({
  url: config.baseURL || "",
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth: async ({ authState, mutate }) => {
        if (typeof window !== "undefined") {
          // for initial launch, fetch the auth state from storage (local storage, async storage etc)
        //   if (!authState) {
        //     const token = localStorage.getItem("token");
        //     const refreshToken = localStorage.getItem("refreshToken");
        //     if (token && refreshToken) {
        //       return { token, refreshToken };
        //     }
        //     return null;
        //   }

        //   /**
        //    * the following code gets executed when an auth error has occurred
        //    * we should refresh the token if possible and return a new auth state
        //    * If refresh fails, we should log out
        //    **/

        //   // if your refresh logic is in graphQL, you must use this mutate function to call it
        //   // if your refresh logic is a separate RESTful endpoint, use fetch or similar
        //   // @ts-ignore
        //   const result = await mutate(refreshMutation, {
        //     // @ts-ignore

        //     token: authState?.refreshToken,
        //   });

        //   if (result.data?.refreshLogin) {
        //     // save the new tokens in storage for next restart
        //     localStorage.setItem("token", result.data.refreshLogin.token);
        //     localStorage.setItem(
        //       "refreshToken",
        //       result.data.refreshLogin.refreshToken
        //     );

        //     // return the new tokens
        //     return {
        //       token: result.data.refreshLogin.token,
        //       refreshToken: result.data.refreshLogin.refreshToken,
        //     };
        //   }

        //   // otherwise, if refresh fails, log clear storage and log out
        //   localStorage.clear();
        // }
        // // your app logout logic should trigger here
        // logout();
        }
        return null;
      },
      // @ts-ignore
      didAuthError: (error: CombinedError, authState: unknown) => {
        console.log(error)
        return error.graphQLErrors.some(
          (e: any) => e.extensions?.code === "FORBIDDEN"
        );
      },
    }),
    fetchExchange,
  ],
  // exchanges: [
  //   mapExchange({
  //     onError(error, _operation) {
  //       const isAuthError = error.graphQLErrors.some((e: { extensions: { code: string; }; })  => e.extensions?.code === 'FORBIDDEN');
  //       if (isAuthError) {
  //         logout();
  //       }
  //     },
  //   }),
  //   authExchange({
  //       /* config */
  //     }),
  //   ]
  fetchOptions: () => {
    const token = getToken();

    return {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    };
  },
});
// "Could not log-in with the provided credentials"

// client.
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
          <>
            <meta
              name="facebook-domain-verification"
              content="r51vngnom3ax1hwbgplshzyhhqwe7s"
            />
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-234906660-1"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', 'UA-234906660-1');`,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-TT8JQHF');`,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '608825574034155');
                fbq('track', 'PageView');`,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<img height="1" width="1" style="display:none"
                  src="https://www.facebook.com/tr?id=608825574034155&ev=PageView&noscript=1"
                />`,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '546238460339249');
                fbq('track', 'PageView');`,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<img height="1" width="1" style="display:none"
                  src="https://www.facebook.com/tr?id=546238460339249&ev=PageView&noscript=1"
                />`,
              }}
            />
          </>
        )}
      </Head>
      <UserDataProvider>
        <NextIntlProvider messages={pageProps.messages}>
          <AuthProvider>
            {/* @ts-ignore */}
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
