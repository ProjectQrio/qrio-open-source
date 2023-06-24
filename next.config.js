/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
  return {
    env: {
      NEXTAUTH_URL: 'http://localhost.3000',
      NEXTAUTH_SECRET: AeeDgGTNO5SSMnxWobis0LgUIVt7KuXMYtbL8Wj5Xq4
    },
  };
}

return {
  env: {

  },
};
};

module.exports = nextConfig