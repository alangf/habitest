import getConfig from 'next/config'

const { BASE_IMAGE_URL } = getConfig().publicRuntimeConfig;

/**
 * Returns an image from the product with the specified id.
 *
 * @param {object} product Product
 * @param {string} id Id of the product image
 */
export const getProductImage = (product, id) => {
  try {
    const images = product.included.find(inc => Number(inc.id) === Number(id) && inc.type === 'image').attributes.styles;
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
 * Returns an image array from the product with the specified id.
 *
 * @param {object} product Product
 * @param {string} id Id of the product image
 */
export const getProductImages = (product, id) => {
  try {
    return product.included.find(inc => Number(inc.id) === Number(id) && inc.type === 'image').attributes.styles
      .map(image => ({
        ...image,
        url: `${BASE_IMAGE_URL}${image.url}`
      }));
  }
  catch {
    return null;
  }
}

/**
 * Returns all images from a product variant.
 *
 * @param {object} product Product
 * @param {string} product Variant id
 */
export const getProductVariantImages = (product, variantId) => {
  try {
    const variant = getProductVariantById(product, variantId);
    const imageList = variant?.relationships?.images?.data;
    if (imageList && imageList.length) {
      return imageList.map(entry => getProductImages(product, entry.id))
    }
    return [];
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