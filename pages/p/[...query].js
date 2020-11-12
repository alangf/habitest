import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { getProductImage, getProductVariants, getProductVariantById } from '../../lib/product'
import { getProduct, getTaxon } from '../../lib/api'

import useProduct from '../../hooks/useProduct'

import ProductView from '../../components/ProductView'

export default function ProductPage({ product: ssrProduct, isError, query, variant, taxon}) {
  const router = useRouter();

  // Check product cache.
  const { product } = useProduct(query, ssrProduct);

  const [selectedVariant, setSelectedVariant] = useState(getProductVariantById(product, variant));

  useEffect(() => {
    setSelectedVariant(getProductVariantById(product, variant));
  }, [variant]);

  useEffect(() => {
    if (isError === true) {
      router.replace('/p/notfound');
    }
  }, [isError]);

  const selectVariant= id => {
    setSelectedVariant(getProductVariantById(product, id));

    // Keep url updated, variants have their own url.
    router.push(`/p/${query}/${id}`, `/p/${query}/${id}`, { shallow: true });
  }

  /**
   * Render ProductView component when product is loaded.
   */
  const renderProductView = () => {
    if (selectedVariant && product && product.data) {
      const {
        attributes: {
          name,
          description,
          display_price,
          purchasable,
          in_stock,
          backorderable,
          slug,
        }
      } = selectedVariant;
      const {
        data: {
          attributes: {
            brand,
            meta_description,
            meta_keywords,
          }
        } 
      } = product;

      // Select first image from product.
      let productFirstImage = null;
      if (selectedVariant?.relationships?.images?.data) {
        productFirstImage = getProductImage(product, selectedVariant.relationships.images.data[0].id);
      }
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
          image={productFirstImage}
          variants={getProductVariants(product)}
          variant={selectedVariant}
          onVariantChange={id => selectVariant(id)}
          taxon={taxon}
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
    query: '',
    variant: '',
    taxon: null
  }

  // We need product ID or slug.
  if (!query) {
    props.isError = true;
    return { props }
  }

  props.query = query[0];

  try {
    const res = await getProduct(query[0]);
    if (res.error) {
      props.isError = true;
    } else {
      props.product = res;

      // Set selected variant from url (if valid) or use default.
      props.variant = query.length === 2 && getProductVariantById(props.product, query[1]) !== null
        ? query[1]
        : props.product.data.relationships.default_variant.data.id;

      if (props.product?.data.relationships.taxons?.data?.length) {
        // Get product taxonomy.
        const taxon = await getTaxon(props.product.data.relationships.taxons?.data[0].id);
        props.taxon = taxon?.data?.attributes?.pretty_name;
      }
    }
  }
  catch (error) {
    console.log(error);
    props.isError = true;
  }
  finally {
    return { props }
  }
}

