/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: '/CarMenuPage',
        destination: '/',
        permanent: false,
      },
      {
        source: '/DestinationMapPage',
        destination: '/',
        permanent: false,
      },
      {
        source: '/ExistsRoutePage',
        destination: '/',
        permanent: false,
      },
      {
        source: '/AddRoutePage',
        destination: '/',
        permanent: false,
      },
      {
        source: '/CarWatchPage',
        destination: '/',
        permanent: false,
      },
      {
        source: '/EndPage',
        destination: '/',
        permanent: false,
      },
      {
        source: '/RouteSave',
        destination: '/',
        permanent: false,
      },
      {
        source: '/WelcomePage',
        destination: '/',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
