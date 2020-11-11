import Image from 'next/image'
import PropTypes from 'prop-types'

import Button from './Button'

function ProductView({
  name,
  brand,
  description,
  display_price,
  purchasable,
  in_stock,
  backorderable,
  image
}) {
  return (
    <section className="product-view p-4 m-4 md:mx-auto overflow-hidden bg-white shadow-lg border-1 border-gray-400 rounded-lg md:max-w-2xl lg:max-w-3xl">
      <div className="md:flex content-center justify-center">
        <div className="w-1/2 sm:w-1/3 md:w-1/2 mx-auto">
          <Image 
            alt={`Imagen para ${name}`}
            className="max-w-full object-cover object-center rounded border border-gray-200"
            src={image.url}
            width={image.width}
            height={image.height}
            />
        </div>
        <div className="md:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">{brand}</h2>
          <h1 className="text-3xl title-font font-medium mb-2">{name}</h1>
          <p className="leading-relaxed mb-3">
            {description}
          </p>
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
  })
}

ProductView.defaultProps = {
  name: '',
  brand: '',
  description: '',
  display_price: '',
  purchasable: '',
  in_stock: '',
  backorderable: '',
  image: PropTypes.shape({
    url: '',
    width: '',
    height: '',
  })
}

  export default ProductView;