/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  future: {
    // v3.2対応のための将来フラグ
    // https://remix.run/docs/en/2.13.1/start/future-flags
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true, 
    v3_throwAbortReason: true,
    v3_singleFetch: true,
    v3_lazyRouteDiscovery: true,
  },
};
