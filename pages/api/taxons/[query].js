import getConfig from 'next/config'

import { fetcher } from '../../../lib/utils'

const { BACKEND_API_URL } = getConfig().serverRuntimeConfig;

export default async function handler(req, res) {
  try {
    return res.json(await fetcher(`${BACKEND_API_URL}/taxons/${req.query.query || ''}`));
  }
  catch (err) {
    console.error('Error fetching taxonomy: ', err);
    return res.status(404).send();
  }
}