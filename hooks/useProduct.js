import getConfig from 'next/config'
import useSWR from 'swr'

const { API_URL } = getConfig().publicRuntimeConfig;

/**
 * Fetch a product using it's slug or ID.
 * 
 * @param {string} query Product ID or slug.
 */
export default function useProduct(query, initialData) {
  const { data, error } = useSWR(`${API_URL}/products/${query}`, { initialData })
  return {
    product: data,
    isLoading: !error && !data,
    isError: error
  }
}

