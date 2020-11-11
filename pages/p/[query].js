import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import getConfig from 'next/config'

import useProduct, { getProduct } from '../../hooks/useProduct'

import ProductView from '../../components/ProductView'

const { BASE_IMAGE_URL } = getConfig().publicRuntimeConfig;

export default function ProductPage({ product: ssrProduct, isLoading, isError, query}) {
  const router = useRouter();

  // Check product cache.
  const { product } = useProduct(query, ssrProduct);

  useEffect(() => {
    if (isError === true) {
      router.replace('/p/notfound');
    }
  }, [isError]);

  /**
   * Get last image from images array.
   */
  const getProductImage = () => {
    try {
      const images = product.included[0].attributes.styles;
      const lastImage = images[images.length - 1];
      return {
          ...lastImage,
          url: `${BASE_IMAGE_URL}${lastImage.url}`
        }
    }
    catch (err) {
      return null;
    }
  }

  /**
   * Render ProductView component when product is loaded.
   */
  const renderProductView = () => {
    if (product && product.data && product.data.attributes) {
      const {
        data: {
          attributes: {
            name,
            brand,
            description,
            display_price,
            meta_description,
            meta_keywords,
            purchasable,
            in_stock,
            backorderable,
            slug,
          }
        }
      } = product;
      return (
        <ProductView
          name={name}
          brand={brand}
          description={description}
          display_price={display_price}
          meta_description={meta_description}
          meta_keywords={meta_keywords}
          purchasable={purchasable}
          in_stock={in_stock}
          backorderable={backorderable}
          slug={slug}
          image={getProductImage()}
        />)
    }
    return null;
  }

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {product?.data && (
          <Fragment>
            <title>{product.data.attributes.name}</title>
            <meta name="description" content={product.data.attributes.meta_description} />
            <meta name="keywords" content={product.data.attributes.meta_keywords} />
          </Fragment>
        )}
        {

        }
      </Head>

      <main className="min-h-screen md:flex flex-col justify-center content-center">
        {renderProductView()}
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const { query } = params;
  const props = {
    product: null,
    isError: false,
    isLoading: false,
    query
  }

  // We need product ID or slug.
  if (!query) {
    props.isError = true;
    return { props }
  }

  try {
    const res = await getProduct(query);
    if (res.error) {
      props.isError = true
    } else {
      props.product = res
    }
  }
  catch (error) {
    console.error(error);
    props.isError = true;
  }
  finally {
    return { props }
  }
}

