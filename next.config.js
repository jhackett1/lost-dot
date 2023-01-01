module.exports = {
  output: "standalone",
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/admin/applications/export",
        headers: [
          {
            key: "Content-Type",
            value: "text/csv",
          },
        ],
      },
      {
        source: "/api/admin/users/export",
        headers: [
          {
            key: "Content-Type",
            value: "text/csv",
          },
        ],
      },
    ]
  },
}
