import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto pt-4">
      <Head>
        <title>Habitest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl mb-4">Habitest</h1>
        <Link href="/p/resurrection-conditioner">
          Sample product
        </Link>
        <br/>
        <Link href="/p/x">
          Non existant product
        </Link>
      </main>
    </div>
  )
}
