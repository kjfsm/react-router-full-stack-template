/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  future: {
    // v3に向けての将来フラグ
    // https://remix.run/docs/en/main/start/future-flags
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true, 
    v3_throwAbortReason: true,
    v3_singleFetch: true,
    v3_lazyRouteDiscovery: true,
  },
};
