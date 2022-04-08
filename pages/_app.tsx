import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";
import config from "./../config";
import "./../styles/global.scss";
import "./../styles/cutomized-antd.css";
import AuthProvider from "../src/common/hooks/authProvider";
import { getToken } from "../src/common/utils/userData";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

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
  return (
    <AuthProvider>
      <Provider value={client}>
        <Component {...pageProps} key />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
