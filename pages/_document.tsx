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
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TT8JQHF" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}
        {process.env.NEXT_PUBLIC_PRODUCTION === "true" && (
          <footer
            dangerouslySetInnerHTML={{
              __html: `<script type="text/javascript">
              _linkedin_partner_id = "4253452";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              </script><script type="text/javascript">
              (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
              </script><noscript><img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=4253452&fmt=gif" /></noscript>`,
            }}
          />
        )}
      </body>
    </Html>
  );
}
