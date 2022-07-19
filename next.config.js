/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

module.exports = withTM(
  withBundleAnalyzer({
    reactStrictMode: true,
    i18n: {
      locales: ["en", "es"],
      defaultLocale: "en",
    },
    images: {
      // domains: ["medicus-dev2.s3-us-east-2.amazonaws.com", "www.google.com"],
      domains: [
        "medicus-dev2.s3-us-east-2.amazonaws.com",
        "medicus-dev.agencypartner.com",
      ],
      // minimumCacheTTL: 60,
      // added for images and 502 Error Fix R&D
      // disableStaticImages: true, // added for images and 502 Error Fix R&D
      dangerouslyAllowSVG: true, // added for images and 502 Error Fix R&D
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // added for images and 502 Error Fix R&D
    },
    headers: async () => [
      {
        // list more extensions here if needed; these are all the resources in the `public` folder including the subfolders
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
    ],
  })
);
