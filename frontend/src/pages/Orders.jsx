import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { products, currency } = useContext(ShopContext)

  // Mock orders using products (temporary)
  const orders = products.slice(1, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] my-12">

      <Title text1="MY" text2="ORDERS" />

      <div className="mt-10 space-y-6">
        {orders.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 flex flex-col sm:flex-row gap-6"
          >
            {/* Image */}
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-28 h-28 object-contain border rounded"
            />

            {/* Order Info */}
            <div className="flex-1">
              <p className="font-medium text-gray-800">
                {item.name}
              </p>

              <div className="flex gap-6 text-sm text-gray-500 mt-2">
                <p>{currency}{item.price}</p>
                <p>Quantity: 1</p>
                <p>Size: M</p>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                Date: <span className="text-gray-700">12 Sep 2024</span>
              </p>
            </div>

            {/* Status */}
            <div className="flex flex-col justify-between items-start sm:items-end">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-green-600">Ready to ship</p>
              </div>

              <button className="mt-4 sm:mt-0 border px-4 py-2 rounded text-sm hover:bg-gray-100 transition">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Orders
