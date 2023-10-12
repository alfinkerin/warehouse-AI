/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/screen/auth/login",
        permanent: true,
      },
    ];
  },
};
