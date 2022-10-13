import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        {process.env.NEXT_PUBLIC_PRODUCTION === "true" && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TT8JQHF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
            }}
          />
        )}
      </body>
    </Html>
  );
}
