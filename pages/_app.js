import { SWRConfig } from 'swr'
import Head from 'next/head'

import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
          fetcher: (...args) => fetch(...args).then(res => res.json())
      }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
