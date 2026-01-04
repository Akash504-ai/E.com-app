import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { Link } from 'react-router-dom'

const RelatedProduct = ({ category, subCategory, productID }) => {

  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()

      productsCopy = productsCopy.filter(
        item => item.category === category
      )

      productsCopy = productsCopy.filter(
        item => item.subCategory === subCategory && item._id !== productID
      )

      setRelated(productsCopy.slice(0, 5))
    }
  }, [products, category, subCategory, productID])

  if (related.length === 0) return null

  return (
    <div className="mt-24">

      {/* Title */}
      <div className="text-center mb-8">
        <Title text1="RELATED" text2="PRODUCTS" />
        <p className="text-sm text-gray-600">
          You might also like these similar styles
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {related.map(item => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="group bg-white border rounded-xl overflow-hidden
                       hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-[4/5] overflow-hidden bg-gray-50">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-full h-full object-cover
                           group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-3 text-center">
              <p className="text-sm font-semibold truncate">
                {item.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ₹{item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default RelatedProduct
