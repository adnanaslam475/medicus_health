import type { AppProps } from "next/app";
import config from "./../config";
import { createClient, Provider } from "urql";
import "./../styles/global.scss";
import "./../styles/cutomized-antd.css";

const client = createClient({
  url: config.baseURL || "",
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} key />
    </Provider>
  );
}

export default MyApp;
