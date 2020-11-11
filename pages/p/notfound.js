import Image from 'next/image'

export default function NotFound() {
  return (
    <main className="min-h-screen md:flex flex-col justify-center content-center">
      <section className="product-view p-4 m-4 md:mx-auto overflow-hidden bg-white shadow-lg border-1 border-gray-400 rounded-lg md:max-w-2xl">
        <div className="md:flex content-center justify-center p-3">
          <div className="w-1/2 md:w-1/2 mx-auto max-w-5xl p-4  md:flex align-center">
            <img src="/images/empty.svg" alt="No encontrado" />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center md:pl-3">
            <h1 className="text-3xl text-center md:text-left ">Lo sentimos</h1>
            <p>No encontramos este producto.</p>
          </div>
        </div>
      </section>
    </main>
  )

}