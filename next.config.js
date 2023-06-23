/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
  return {
    env: {
      NEXTAUTH_URL: 'http://localhost.3000'
    },
  };
}

return {
  env: {

  },
};
};

module.exports = nextConfig
