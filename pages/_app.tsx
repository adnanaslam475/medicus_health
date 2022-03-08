import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import config from "./../config";
import { createClient, Provider } from "urql";
import "./../styles/global.scss";
import "./../styles/cutomized-antd.css";
import { useRouter } from "next/router";

const client = createClient({
  url: config.baseURL || "",
});
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: any) {
    let userData: any;
    if (
      typeof window !== "undefined" &&
      localStorage?.getItem("loggedInUserData")
    ) {
      userData = JSON.parse(localStorage?.getItem("loggedInUserData") || "");
    }
    setUser(userData);
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    if (!userData?.access_token && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
      });
    } else {
      setAuthorized(true);
    }
  }
  return (
    <Provider value={client}>
      {authorized && <Component {...pageProps} key />}
    </Provider>
  );
}

export default MyApp;
