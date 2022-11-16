/* eslint-disable @next/next/next-script-for-ga */
import { translationJson } from "common/locales/translationJson";
import Head from "next/head";
import SuccessScreen from "../src/modules/common/pages/auth/SuccessScreen/SuccessScreen";

function successScreen() {
  return (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_PRODUCTION === "true" && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=AW-10931507833"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());   gtag('config', 'AW-10931507833');`,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `gtag('event', 'conversion', {'send_to': 'AW-10931507833/7aS5CN3vn4IYEPmkxtwo'});`,
              }}
            />
          </>
        )}
      </Head>
      <SuccessScreen />
    </>
  );
}

export default successScreen;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
