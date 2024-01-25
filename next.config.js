/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  // other Next.js configuration options...

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // resolve.alias configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      // Define your custom alias here
      EmployeeDataHandler$: process.env.NEXT_PUBLIC_EMPLOYEE_DATA_HANDLER_PATH,
    };

    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
