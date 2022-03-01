import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";
import "./../styles/global.scss";
import "./../styles/cutomized-antd.css";

const client = createClient({
  url: "https://medicus-api-dev.agencypartner.com/graphql",
  // fetchOptions: {
  //   mode: "cors",
  //   credentials: "same-origin",
  // },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
