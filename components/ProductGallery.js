import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

function ProductGallery({images}) {
  const [selected, setSelected] = useState(null)

  /**
   * Pick full image or thumb.
   * 
   * @param {object} entry Image entry
   * @param {boolean} full Full size or thumb if false
   */
  const getImage = (entry, full) => full === true
    ? entry[entry.length - 1]
    : entry.find(e => e.width === '100')

  // Select first image when getting new images.
  useEffect(() => {
    if (images && images.length && selected === null) setSelected(images[0]);
  }, [images]);

  const fullImage = selected ? getImage(selected, true) : null;

  return (
    <div className="product-gallery">
      <div className="current-image w-1/2 md:w-auto mx-auto">
        {fullImage && (
          <Image
            className="max-w-full object-cover object-center border border-gray-200"
            key={fullImage.url}
            src={fullImage.url}
            width={fullImage.width}
            height={fullImage.height}
          />
        )}
      </div>
      {images && (
        <ul className="thumbnails flex flex-wrap justify-start">
          {images.map(image => {
            const img = getImage(image, false);
            return (
              <li className="w-16 border border-gray-400 cursor-pointer opacity-75 hover:opacity-100"
                onClick={() => setSelected(image)}>
                <Image
                  src={img.url}
                  width={img.width}
                  height={img.height}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }))
}

ProductGallery.defaultProps = {
  images: []
}

export default ProductGallery;

