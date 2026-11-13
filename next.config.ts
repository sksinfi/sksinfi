import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/sksinfin",
        destination: "/#why-sks-infi",
        permanent: true,
      },
      {
        source: "/sksinfin.php",
        destination: "/#why-sks-infi",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/index.php", destination: "/" },
      { source: "/about.php", destination: "/about" },
      { source: "/contact.php", destination: "/contact" },
      { source: "/partner-with-us.php", destination: "/partner-with-us" },
      { source: "/partner_with_us.php", destination: "/partner-with-us" },
      { source: "/enquirynow.php", destination: "/contact" },
      { source: "/apply-now.php", destination: "/contact" },
      { source: "/admin/contact-t.php", destination: "/admin" },
      { source: "/admin/partner-t.php", destination: "/admin" },
      { source: "/admin/lonenq-t.php", destination: "/admin" },
      { source: "/admin/banner-t.php", destination: "/admin" },
      // Any other .php page rewrites to its slug dynamically
      { source: "/:slug.php", destination: "/:slug" },
    ];
  },
};

export default nextConfig;
