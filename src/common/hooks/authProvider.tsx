import { UserDataInLocalStorage } from "common/types/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PageLoader } from "../components/PageLoader/PageLoader";
import { getRole, getUserData } from "../utils/userData";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //styles of nprogress

NProgress.configure({ showSpinner: false });

function AuthProvider({ children }: any) {
  const router = useRouter();
  const [user, setUser] = useState<UserDataInLocalStorage>();
  const [authorized, setAuthorized] = useState(false);

  function firstRouteChange() {
    setAuthorized(false);
  }

  function firstRouteChangeComplete(url: string) {
    authCheck(url);
    removeFirstEventHandlers();
    router.events.on("routeChangeStart", subsequentRouteChange);
    router.events.on("routeChangeComplete", subsequentRouteChangeCompleted);
  }
  function removeFirstEventHandlers() {
    router.events.off("routeChangeStart", firstRouteChange);
    router.events.off("routeChangeComplete", firstRouteChangeComplete);
  }

  function subsequentRouteChange(url: string) {
    NProgress.start();
  }

  function subsequentRouteChangeCompleted(url: string) {
    authCheck(url);
    NProgress.done();
  }
  function removeSubsequentEventHandlers() {
    router.events.off("routeChangeStart", subsequentRouteChange);
    router.events.off("routeChangeComplete", subsequentRouteChangeCompleted);
  }
  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    router.events.on("routeChangeStart", firstRouteChange);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", firstRouteChangeComplete);

    return () => {
      removeSubsequentEventHandlers();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: any) {
    let userData = getUserData();
    setUser(userData);
    const publicPaths = [
      "/login",
      "/signup",
      "/forgotPassword",
      "/user/confirm",
      "/user/resetPassword",
      "/admin/physicians/setPassword",
      "/successScreen",
    ];
    const path = url.split("?")[0];
    if (!userData?.access_token && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
      });
      return true;
    } else {
      setAuthorized(true);
    }
  }
  const role = getRole();
  if (
    router.pathname.startsWith("/physician") &&
    role === "Doctor" &&
    authorized
  ) {
    return children;
  } else if (
    router.pathname.startsWith("/patient") &&
    role === "User" &&
    authorized
  ) {
    return children;
  } else if (
    router.pathname.startsWith("/admin") &&
    role === "Admin" &&
    authorized
  ) {
    return children;
  }

  if (
    router.pathname.startsWith("/login") ||
    router.pathname.startsWith("/signup") ||
    router.pathname.startsWith("/forgot")
  ) {
    return children;
  }
  if (router.pathname === "/user/confirm") {
    return children;
  } else if (router.pathname === "/user/resetPassword") {
    return children;
  } else if (router.pathname === "/successScreen") {
    return children;
  } else {
    if (authorized) {
      return children;
    }
    return PageLoader;
  }
}

export default AuthProvider;
