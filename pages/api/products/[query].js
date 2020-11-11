import getConfig from 'next/config'

import { fetcher } from '../../../utils'

const { BACKEND_API_URL } = getConfig().serverRuntimeConfig;

export default async function handler (req, res) {
  try {
    return res.json(await fetcher(`${BACKEND_API_URL}/products/${req.query.query || ''}?include=images`));
  }
  catch (err) {
    console.error('Error fetching product: ', err);
    return res.status(404).send();
  }
}