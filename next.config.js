module.exports = {
  serverRuntimeConfig: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    BASE_IMAGE_URL: process.env.BASE_IMAGE_URL,
  },
  images: {
    domains: [process.env.DOMAIN],
  }
}