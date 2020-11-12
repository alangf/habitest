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
  catch {
    return null;
  }
}

/**
 * Returns all product variants.
 * 
 * @param {object} product Product
 */
export const getProductVariants = product => {
  try {
    return product.data.relationships.variants.data.map(variant => product.included.find(inc => Number(inc.id) === Number(variant.id)));
  }
  catch {
    return [];
  }
}

/**
 * Returns the variant of the product with the specified id.
 * 
 * @param {object} product Product
 * @param {string} id Id of the product variant.
 */
export const getProductVariantById = (product, id) => {
  try {
    return product.included.find(inc => Number(inc.id) === Number(id) && inc.type === 'variant') || null;
  }
  catch {
    return null;
  }
}