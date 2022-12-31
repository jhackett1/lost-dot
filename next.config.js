// next.config.js
module.exports = {
  // ... rest of the configuration.
  output: "standalone",

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
