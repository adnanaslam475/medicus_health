import type { AppProps } from 'next/app'
import { createClient, Provider } from 'urql';
import "./../styles/global.scss"
import "./../styles/cutomized-antd.css";

const client = createClient({
  url: 'http://stark-thicket-56377.herokuapp.com/',
});

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider value={client}><Component {...pageProps} /></Provider>
}

export default MyApp
