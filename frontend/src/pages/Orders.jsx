import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const { products, currency, backendUrl, token } = useContext(ShopContext)
  const [orders, setOrders] = useState([])

  // ---------------- FETCH USER ORDERS ----------------
  const fetchOrders = async () => {
  if (!token) return

  try {
    const res = await axios.post(
      `${backendUrl}/api/order/userorders`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (res.data.success) {
      setOrders(res.data.orders)
    } else {
      toast.error('Failed to load orders')
    }
  } catch (error) {
    console.error(error)
    toast.error('Failed to load orders')
  }
}

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] my-12">

      <Title text1="MY" text2="ORDERS" />

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="mt-10 space-y-6">
          {[...new Map(
            orders.map(order => [order._id, order])
          ).values()].flatMap((order) =>
            order.items.map((item, index) => {
              const product = products.find(
                (p) => p._id === item.productId
              )
              if (!product) return null

              return (
                <div
                  key={`${order._id}-${item.productId}-${index}`}
                  className="border rounded-xl p-6 flex flex-col sm:flex-row gap-6"
                >
                  {/* Image */}
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-28 h-28 object-contain border rounded"
                  />

                  {/* Order Info */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {product.name}
                    </p>

                    <div className="flex gap-6 text-sm text-gray-500 mt-2">
                      <p>{currency}{product.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Date:{' '}
                      <span className="text-gray-700">
                        {new Date(order.date).toDateString()}
                      </span>
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col justify-between items-start sm:items-end">
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      ></span>
                      <p className="text-gray-700">{order.status}</p>
                    </div>

                    <button className="mt-4 sm:mt-0 border px-4 py-2 rounded text-sm hover:bg-gray-100 transition">
                      Track Order
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default Orders
