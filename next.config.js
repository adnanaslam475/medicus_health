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
      domains: ["medicus-dev2.s3-us-east-2.amazonaws.com", "www.google.com"],
    },
  })
);