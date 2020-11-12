

import getConfig from 'next/config'

import { fetcher } from './utils'

const { API_URL } = getConfig().publicRuntimeConfig;

/**
 * Fetch product using id or slug.
 *
 * @param {string} query ID or slug.
 */
export const getProduct = async (query) => fetcher(`${API_URL}/products/${query}`);

/**
 * Fetch taxonomy using id or slug.
 *
 * @param {string} query ID or slug.
 */
export const getTaxon = async (query) => fetcher(`${API_URL}/taxons/${query}`);