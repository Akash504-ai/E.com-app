import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Cart = () => {
  const {
    products,
    cartItems,
    removeFromCart,
    getCartAmount,
    currency
  } = useContext(ShopContext)

  // Check if cart is empty
  const isCartEmpty = Object.keys(cartItems).length === 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] my-12">

      <Title text1={'YOUR'} text2={'CART'} />

      {isCartEmpty ? (
        <p className="text-center text-gray-500 mt-12">
          Your cart is empty.
        </p>
      ) : (
        <div className="mt-10">

          {/* Cart Items */}
          <div className="space-y-6">
            {Object.entries(cartItems).map(([itemId, sizes]) => {
              const product = products.find(p => p._id === itemId)
              if (!product) return null

              return Object.entries(sizes).map(([size, quantity]) => (
                <div
                  key={`${itemId}-${size}`}
                  className="flex items-center gap-6 border-b pb-6"
                >
                  {/* Image */}
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-24 h-24 object-contain border rounded"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Size: {size}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {quantity}
                    </p>
                    <p className="text-pink-600 font-medium mt-1">
                      {currency}{product.price * quantity}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(itemId, size)}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))
            })}
          </div>

          {/* Cart Summary */}
          <div className="mt-10 flex justify-end">
            <div className="w-full sm:w-96 border rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">
                Cart Summary
              </h3>

              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>{currency}{getCartAmount()}</span>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between font-semibold text-lg border-t pt-4">
                <span>Total</span>
                <span>{currency}{getCartAmount()}</span>
              </div>

              <button className="mt-6 w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Cart
