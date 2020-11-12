import getConfig from 'next/config'

const { BASE_IMAGE_URL } = getConfig().publicRuntimeConfig;

/**
 * Get last image from images array.
 */
export const getProductImage = product => {
  try {
    const images = product.included[0].attributes.styles;
    const lastImage = images[images.length - 1];
    return {
      ...lastImage,
      url: `${BASE_IMAGE_URL}${lastImage.url}`
    }
  }
  catch (err) {
    return null;
  }
}