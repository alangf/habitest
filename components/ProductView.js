import Image from 'next/image'
import PropTypes from 'prop-types'

import Button from './Button'
import Dropdown from './Dropdown'
import ProductGallery from './ProductGallery'

function ProductView({
  name,
  brand,
  description,
  display_price,
  purchasable,
  in_stock,
  backorderable,
  image,
  variant,
  variants,
  onVariantChange,
  taxon,
  gallery
}) {
  return (
    <section className="product-view p-4 m-4 md:mx-auto overflow-hidden bg-white shadow-lg border-1 border-gray-400 rounded-lg md:max-w-2xl lg:max-w-3xl">
      <div className="md:flex content-center justify-center">
        <div className="md:w-1/2 mx-auto">
          {gallery && (
            <ProductGallery images={gallery} />
          )}
        </div>
        <div className="md:w-1/2 w-full lg:pl-5 lg:py-6 mt-6 lg:mt-0">
          <div className="text-xs inline-block text-gray-500 mb-1 title-font">
            {taxon}
          </div>
          <h1 className="text-3xl title-font font-medium">{name}</h1>
          <h2 className="text-md title-font text-gray-500 tracking-widest mb-3">{brand}</h2>
          <p className="leading-relaxed mb-3">
            {description}
          </p>
          {variants && variants.length && (
            <div className="product-variants mb-3">
              <Dropdown
                selected={{
                  text: variant.attributes.options_text,
                  value: variant.id
                }}
                options={variants.map(v => ({
                  text: v.attributes.options_text,
                  value: v.id
                }))}
                onChange={id => onVariantChange(id)}
                />
            </div>
          )}
          <div className="mb-5">
            <span className="title-font font-medium text-2xl">{display_price}</span>
          </div>
          <div>
            {purchasable && in_stock && (
              <Button>Comprar</Button>
              )}
            {!purchasable && !in_stock && backorderable && (
              <Button>Pre ordenar</Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
};

ProductView.propTypes = {
  name: PropTypes.string,
  brand: PropTypes.string,
  description: PropTypes.string,
  display_price: PropTypes.string,
  purchasable: PropTypes.bool,
  in_stock: PropTypes.bool,
  backorderable: PropTypes.bool,
  image: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  variant: PropTypes.shape(),
  variants: PropTypes.array,
  onVariantChange: PropTypes.func,
  taxon: PropTypes.string,
  gallery: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }))
}

ProductView.defaultProps = {
  name: '',
  brand: '',
  description: '',
  display_price: '',
  purchasable: '',
  in_stock: '',
  backorderable: '',
  image: null,
  variant: {
    id: ''
  },
  variants: [],
  onVariantChange: () => {},
  taxon: null,
  gallery: []
}

  export default ProductView;