/**
 * Wrapper for next's fetch polyfill.
 * @param  {...any} args 
 */
export const fetcher = async (url, options) => {
  const args = options || {};
  const response = await fetch(url, {
    ...args,
    headers: {
      ...args.headers,
      Accept: "application/json; charset=UTF-8"
    }
  });
  return response.json();
}