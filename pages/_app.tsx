import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";
import config from "./../config";
import "./../styles/global.scss";
import "./../styles/cutomized-antd.css";
import AuthProvider from "../src/common/hooks/authProvider";

const client = createClient({
  url: config.baseURL || "",
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Provider value={client}>
        <Component {...pageProps} key />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
