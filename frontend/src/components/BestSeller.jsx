import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { Link } from 'react-router-dom'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter(item => item.bestseller)
      setBestSellers(filtered.slice(0, 5))
    }
  }, [products])

  return (
    <div className="my-12">

      {/* Title */}
      <div className="text-center mb-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="text-gray-600 max-w-xl mx-auto text-sm">
          Our most loved products, trusted by customers and trending right now.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bestSellers.map(item => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="group bg-white border rounded-xl overflow-hidden
                       hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="overflow-hidden aspect-[4/5] bg-gray-50">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-full h-full object-cover
                           group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-3 text-center">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {item.name}
              </p>
              <p className="text-sm font-medium text-gray-500 mt-1">
                ₹{item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default BestSeller
